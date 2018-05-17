const path = require('path');
require('express-async-errors');
const graph = require('fbgraph');
const crypto = require('crypto');
const download = require('image-downloader');
const userController = require('../controllers/userController');

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
        graph.setAccessToken(token);
        await graph.get('/me?fields=id,first_name,last_name,picture,email', async (req, resFacebook) => {
          if (!resFacebook.error) {
            let data = await organizeUser(resFacebook, token, 'FACE');
            try {
              let response = await user.updateOrCreate(data);
              res.status(200).json({ data: response, message: 'User logged successfully' });
            } catch (e) {
              throw e;
            }
          }
        });
      } catch (error) {
        throw error;
      }
    });
  const organizeUser = async (data, token, type = 'LOCAL') => {
    let dataUser = {};
    dataUser.name = data.first_name;
    dataUser.lastName = data.last_name;
    dataUser.email = data.email;
    dataUser.loginType = type;
    dataUser.id_login = data.id ? data.id : false;
    dataUser.image = crypto.randomBytes(20).toString('hex') + '.jpg';
    dataUser.token = crypto.randomBytes(20).toString('hex');
    try {
      await copyImage(data, dataUser.image);
    } catch (e) {
      throw e;
    }
    return dataUser;
  };

  const copyImage = async (data, name) => {
    try {
      await download.image({
        url: `http://graph.facebook.com/${data.id}/picture?type=large`,
        dest: `${path.join(__dirname, '../../')}storage/users/${name}`
      });
    } catch (e) {
      throw e;
    }
  }
}
