const cors = require('cors');
const bodyParser = require('body-parser');
const timeout = require('express-timeout-handler');
const logger = require('../configs/log');
const options = {
  timeout: 3000,
  onTimeout: (req, res) => {
    res.status(503).json({ message: 'Service unavailable.' });
  }
};

module.exports = (app) => {
  app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  }));
  app.use(bodyParser.json());
  app.use(timeout.handler(options));
  app.use((error, req, res, next) => {
    if (error) {
      logger.error(error);
      res.status(500).json({ error: error });
    } else next();
  });

  return app;
}
