const cors = require('cors');
const bodyParser = require('body-parser');
const timeout = require('express-timeout-handler');
const auth = require('./auth')();

const options = {
  timeout: 9000,
  onTimeout: (req, res) => {
    res.status(503).json({ message: 'Service unavailable.' });
  }
};

module.exports = (app) => {
  app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  }));
  app.use(auth.initialize());
  app.use(bodyParser.json());
  app.use(timeout.handler(options));
}
