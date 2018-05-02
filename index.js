// variaveis de ambiente
require('dotenv-safe').config();

// dependencias do servidor
const load = require('consign');
const logger = require('./configs/log');
const app = require('express')();

/**
 * configurar consign para carregar todos os modulos
 * na doc https://www.npmjs.com/package/consign
 *
 */
load()
  .include('./configs/db.js')
  .then('./configs/middlewares.js')
  .then('api/routers')
  .into(app)

// start server
const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  logger.info(`Server start in port ${process.env.PORT}`);
});

// dependencias socket
const io = require('socket.io').listen(server);

// carregando modulos
load()
  .include('socket')
  .into(io)
