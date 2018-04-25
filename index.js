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
  .then('models')
  .then('./configs/middlewares.js')
  .then('routers')
  .into(app)

// start server
const server = app.listen(process.env.PORT, () => {
  logger.info(`Server start in port ${process.env.PORT}`);
});

// dependencias socket
const io = require('socket.io').listen(server);

// carregando modulos
load()
  .include('socket')
  .into(io)
