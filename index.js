// variaveis de ambiente
require('dotenv-safe').config();

// dependencias do servidor
const load = require('consign');
const app = require('express')();

/**
 * configurar consign para carregar todos os modulos
 * na doc https://www.npmjs.com/package/consign
 *
 */
load()
  .include('./configs/db.js')
  .then('./api/configs/middleware.js')
  .then('./api/routers')
  .then('./api/configs/info.js')
  .into(app)

// start server
const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`Server start in port ${process.env.PORT}`);
});

// dependencias socket
const io = require('socket.io').listen(server);

// carregando modulos
load()
  .include('socket')
  .into(io)
