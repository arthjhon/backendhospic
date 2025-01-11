# Backend Site Hospic

Este repositório contém o servidor backend para consultar informações no banco de dados PostgreSQL do site Hospic.

## Tecnologias e Dependências

Este projeto utiliza as seguintes dependências para o servidor:

- **body-parser**: "^1.20.3" – Middleware para manipulação do corpo das requisições HTTP.
- **cors**: "^2.8.5" – Middleware para permitir requisições cross-origin (CORS).
- **dotenv**: "^16.4.7" – Carrega variáveis de ambiente a partir de um arquivo `.env`.
- **express**: "^4.21.2" – Framework minimalista para criação de servidores web.
- **fs**: "^0.0.1-security" – Módulo para interação com o sistema de arquivos.
- **mongoose**: "^8.9.3" – Biblioteca para modelar dados e interagir com MongoDB (caso esteja usando MongoDB).
- **multer**: "^1.4.5-lts.1" – Middleware para lidar com uploads de arquivos.
- **pg**: "^8.13.1" – Cliente PostgreSQL para Node.js, utilizado para interagir com o banco de dados PostgreSQL.

## Passo a Passo para Configuração

Siga os passos abaixo para configurar o servidor localmente.

### 1. Clonar o Repositório

Clone este repositório para sua máquina local. Abra o terminal e execute o seguinte comando:

```bash
git clone https://github.com/arthjhon/backendhospic.git
```
## 2. Baixar e Instalar o Node.js
Certifique-se de ter o [Node.js](https://nodejs.org/pt) instalado em sua máquina. Caso não tenha, baixe a versão mais recente do Node.js e instale.

## 3. Instalar Dependências
Dentro da pasta do repositório, execute o comando abaixo para instalar todas as dependências listadas acima:
```bash
npm install
```
## 4. Configurar o Arquivo .env
Crie um arquivo .env na raiz do seu projeto e insira as variáveis de ambiente com as informações de login do banco de dados PostgreSQL: 
```bash
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
DB_PORT=5432
```

## 5. Iniciar o Servidor
Com as dependências instaladas e o arquivo .env configurado, inicie o servidor com o seguinte comando:
```bash
npm start
```
