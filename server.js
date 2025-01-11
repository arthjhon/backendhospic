const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const fs = require('fs')

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

require('dotenv').config();


// Configurar o PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, // Porta padrão do PostgreSQL
});




// Rota para obter membros por CARGO {FUNCIONA}
app.get('/members/:cargo', async (req, res) => {
    const { cargo } = req.params; // Obtém o cargo da URL
    try {
        console.log(`Recebendo requisição em /members/${cargo}`);
        const result = await pool.query('SELECT * FROM members WHERE cargo = $1', [cargo]);
        console.log('Dados retornados do banco:', result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar membros:', error);
        res.status(500).json({ error: 'Erro ao buscar membros' });
    }
});


 // Rota para obter membros por ID {FUNCIONA}
app.get('/members/id/:id', async (req, res) => {
    const { id } = req.params; //Obtem o ID da URL
    try {
        console.log(`Recebendo requisicao em /members/id/${id}`);
        const result = await pool.query('SELECT * FROM members WHERE id = $1', [id])
        console.log('Dados retornados do banco:', result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar membros:', error);
        res.status(500).json({error: 'Erro ao buscar membros'});
    }
});


// Rota para obter membros por NICK {FUNCIONA}

app.get('/members/nick/:nick', async (req, res) => {
    const { nick } = req.params;
    try {
        console.log(`Recebendo requisicão em /members/nick/${nick}`);
        const result = await pool.query('SELECT * FROM members WHERE nick = $1', [nick]);
        if (result.rows.length > 0) {
            res.json(result.rows);
        } else {
            res.status(404).json({ error: 'Membro não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar membro por nick:', error);
        res.status(500).json({ error: 'Erro ao buscar membro' });
    }
  });


// Configuração básica do Multer
const upload = multer({ dest: 'uploads/' });


// Cadastrar novo membro no banco

app.post('/members', upload.single('imagem'), async (req, res) => {
    const { nome, sobrenome, cargo, descricao, steam_link, instagram_link, twitch_link, nick, imagem } = req.body;

    try {
        // Verificando se todos os dados necessários foram passados
        if (!nome || !sobrenome || !cargo || !descricao || !nick) {
            return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
        }

        let imagemBuffer = null;
        if (req.file) {
            imagemBuffer = fs.readFileSync(req.file.path);
            // Remove o arquivo temporário do diretório
            fs.unlinkSync(req.file.path);
        }

        // Inserindo os dados no banco de dados
        const result = await pool.query(
            'INSERT INTO members (nome, sobrenome, cargo, descricao, steam_link, instagram_link, twitch_link, nick, imagem) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
            [nome, sobrenome, cargo, descricao, steam_link, instagram_link, twitch_link, nick, imagemBuffer]
        );

        console.log('Membro adicionado:', result.rows[0]);
        res.status(201).json(result.rows[0]); // Respondendo com o membro adicionado
    } catch (error) {
        console.error('Erro ao adicionar membro:', error.message); // Logando o erro específico
        res.status(500).json({ error: 'Erro ao adicionar membro.', details: error.message });
    }
});



// Atualizar membro pelo id {FUNCIONA}
app.put('/members/id/:id', async (req, res) => {
    const { nome, sobrenome, cargo, descricao, steam_link, instagram_link, twitch_link, nick } = req.body;
    const { id } = req.params;

    try {
        const result = await pool.query(
            'UPDATE members SET nome = $1, sobrenome = $2, cargo = $3, descricao = $4, steam_link = $5, instagram_link = $6, twitch_link = $7, nick = $8 WHERE id = $9 RETURNING *',
            [nome, sobrenome, cargo, descricao, steam_link, instagram_link, twitch_link, nick, id] // Aqui, a vírgula estava faltando
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Membro nao encontrado' });
        }
        res.status(200).json(result.rows[0]); // Devolvendo o membro atualizado
    } catch (error) {
        console.error('Erro ao atualizar o membro:', error);
        res.status(500).json({ error: 'Erro ao atualizar membro.' });
    }
});

// Rota para obter a imagem de um membro por ID {FUNCIONA}
app.get('/members/:id/imagem', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT imagem FROM members WHERE id = $1', [id]);
        if (result.rows.length > 0 && result.rows[0].imagem) {
            const imagemBuffer = result.rows[0].imagem;

            // Enviar a imagem como um tipo de conteúdo binário
            res.setHeader('Content-Type', 'image/jpeg'); // Ou 'image/png', dependendo do tipo de imagem
            res.send(imagemBuffer);
        } else {
            res.status(404).json({ error: 'Imagem não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao buscar imagem:', error);
        res.status(500).json({ error: 'Erro ao buscar imagem' });
    }
});

  


// Rota para excluir membro por ID {testar}
app.delete('/members/id/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM members WHERE id = $1 RETURNING *', [id]);
      if (result.rows.length > 0) {
        res.json({ message: 'Membro excluído com sucesso' });
      } else {
        res.status(404).json({ error: 'Membro não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao excluir membro:', error);
      res.status(500).json({ error: 'Erro ao excluir membro' });
    }
  });
  

  
// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


