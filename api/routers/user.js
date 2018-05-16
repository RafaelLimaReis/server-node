require('express-async-errors');
const userController = require('../controllers/userController');
const graph = require('fbgraph');

module.exports = (app) => {
  const user = userController(app);

  app.route('/users')
    .get(async (req, res) => {
      try {
        const response = await user.all();
        res.status(200).json({ data: response, message: 'users successfully returned' });
      } catch (e) {
        throw e;
      }
    });

  app.route('/users/login/facebook/')
    .post(async (req, res) => {
      let token = req.get('access_token');
      try {
        let response = await facebook(token, user).then(res => console.log(res));
        console.log(response);
        res.status(200).json({ data: response, message: 'User logged successfully' });
      } catch (error) {
        throw error;
      }
    })

  async function facebook (token, user) {
    await graph.setAccessToken(token);
    await graph.get('/me?fields=id,first_name,last_name,picture,email', async (req, res) => {
      let data = await organizeUser(res, token, 'FACE');
      try {
        let response = await user.updateOrCreate(data);
        return response;
      } catch (e) {
        throw e;
      }
    });
  }
}

function organizeUser (data, token, type = 'LOCAL') {
  let dataUser = {};
  dataUser.name = data.first_name;
  dataUser.password = '12345646464';
  dataUser.lastName = data.last_name;
  dataUser.email = data.email;
  dataUser.loginType = type;
  dataUser.id_login = data.id ? data.id : false;
  dataUser.image = 'teste.png'; // data.picture.data.url
  dataUser.token = token;
  return dataUser;
};
