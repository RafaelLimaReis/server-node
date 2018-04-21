const cors = require('cors');
const bodyParser = require('body-parser');

module.exports = (app) => {
  app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  }));
  app.use(bodyParser.json());
}
