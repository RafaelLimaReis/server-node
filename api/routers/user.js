const userController = require('../controllers/userController');
const graph = require('fbgraph');

module.exports = (app) => {
  const user = userController(app);

  app.route('/users')
    .get((req, res) => {
      user.all()
        .then(result => res.status(200).json({ data: result, message: 'users successfully returned' }))
        .catch(error => res.status(500).json({ message: error.message }));
    });

  app.route('/users/login/facebook/')
    .post(async (req, res) => {
      let token = req.get('access_token');
      graph.setAccessToken(token);

      await graph.get('/me?fields=id,first_name,last_name,picture,email', async (req, res) => {
        res.token = token;
        try {
          let response = await user.updateOrCreate(res);
        } catch (e) {
          throw e;
        }

      });
    })
}
