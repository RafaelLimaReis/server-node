const cors = require('cors');
const bodyParser = require('body-parser');
const timeout = require('express-timeout-handler');

const express = require('express');

const options = {
  timeout: 9000,
  onTimeout: (req, res) => {
    res.status(503).json({ message: 'Service unavailable.' });
  }
};

module.exports = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(timeout.handler(options));
  app.use(express.static('public'));
}
