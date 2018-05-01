const cors = require('cors');
const bodyParser = require('body-parser');
const timeout = require('express-timeout-handler');
const express = require('express');

const options = {
  timeout: 3000,
  onTimeout: function (req, res) {
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
  app.use((req, res, next) => {
    next();
  });
  app.use(express.static('public'));

  return app;
}
