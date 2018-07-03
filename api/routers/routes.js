module.exports = (app) => {
  /**
   * @api {get} / Status da API
   * @apiVerison 0.1
   * @apiGroup Status
   * @apiSuccess {String} message Mensagem de status da API
   * @apiSuccessExample {json} Sucesso
   *  HTTP/1.1 200 OK
   *  {"message": "Olá bem vindo a API do troca de usados"}
   */
  app.get('/', (req, res, next) => {
    next('Olá, bem vindo a API do troca de usados');
  });
}

/**
 * Ajuda para configurar rotas
 * https://expressjs.com/en/guide/routing.html
 */
