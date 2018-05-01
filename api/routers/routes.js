module.exports = (app) => {
  app.get('/', (req, res) => {
    res.status(200).json({message: 'Olá, bem vindo a API do troca de usados'});
  });

  return app;
}

/**
 * Ajuda para configurar rotas
 * https://expressjs.com/en/guide/routing.html
 */
