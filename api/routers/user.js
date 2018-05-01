const userController = require('../controllers/userController');

module.exports = (app) => {
  const user = userController(app);

  app.route('/users')
    .get((req, res) => {
      user.all()
        .then(result => res.status(200).json({ data: result, message: 'users successfully returned' }))
        .catch(error => res.status(500).json({ message: error.message }));
    })
}
