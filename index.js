require('dotenv-safe').config();
// const load = require('consign');
const logger = require('./configs/log');
const app = require('express')();
/* const server = require('http').createServer(app);
const io = require('socket.io').listen(server); */

/**
 * configurar consign para carregar todos os modulos
 * na doc https://www.npmjs.com/package/consign
 *
 */

app.listen(process.env.PORT, () => {
  logger.info(`Server start in port ${process.env.PORT}`);
});
