import express from 'express';

import http from 'http';

import cors from 'cors';

import dotenv from 'dotenv';

import path from 'path';

import { fileURLToPath } from 'url';

import sequelize from './config/database.js';

import routes from './routes/index.js';

import { initializeSocket } from './config/socket.js';

import './models/Chat.js';


dotenv.config();


// __dirname
const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);


// APP
const app = express();


// SERVER HTTP
const server =
  http.createServer(app);


// SOCKET
initializeSocket(server);


// MIDDLEWARES
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended: true,
}));


// UPLOADS
app.use(
  '/uploads',
  express.static(
    path.join(__dirname, '../uploads')
  )
);


// ROTAS
app.use(routes);


// TESTE API
app.get('/', (req, res) => {

  return res.json({
    message:
      'DOALIZE API ONLINE 🚀',
  });
});


// MYSQL
sequelize
  .authenticate()
  .then(async () => {

    console.log(
      'MySQL conectado'
    );


    // CRIAR TABELAS
    await sequelize.sync({
      alter: true,
    });

    console.log(
      'Tabelas sincronizadas'
    );

  })
  .catch((error) => {

    console.log(
      'Erro MySQL:',
      error
    );
  });


// PORTA
const PORT =
  process.env.PORT || 3333;


// START SERVER
server.listen(PORT, () => {

  console.log(
    `Servidor rodando na porta ${PORT}`
  );
});