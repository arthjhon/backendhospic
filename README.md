# Backend Site Hospic
Servidor para consultar informações no banco de dados postgresql do site do hospic.


Passo a passo para configurar:

1  Faça o download dos aquivos
2  Baixe e instale o nodejs
3  Baixe as dependencias a seguir:

"body-parser": "^1.20.3",
"cors": "^2.8.5",
"dotenv": "^16.4.7",
"express": "^4.21.2",
"fs": "^0.0.1-security",
"mongoose": "^8.9.3",
"multer": "^1.4.5-lts.1",
"pg": "^8.13.1"

3 Configure um .env com as informações de login do banco de dados 

DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=

4  Inicie o servidor com o comando "npm start"
