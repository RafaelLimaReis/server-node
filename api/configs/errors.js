const logger = require('../../configs/log');

module.exports = (app) => {
  app.use((error, req, res, next) => {
    if (error) {
      logger.error(error);
      res.status(500).json({ error: error });
    } else next();
  });
}
