module.exports = (app) => {
  app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello, welcome to server node'});
  });

  return app;
}

/**
 * Ajuda para configurar rotas
 * https://expressjs.com/en/guide/routing.html
 */
