const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = (app) => {
  app.use(cors());
  app.use((error, req, res, next) => {
    if (error) {
      res.status(500).json({ error: error });
    } else next();
  });

  app.use((req, res) => {
    res.status(res.locals.status || 200).json({ data: res.locals.data, message: res.locals.message });
  });

  app.use(bodyParser.json());
}
