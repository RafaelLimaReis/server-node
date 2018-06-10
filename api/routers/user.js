const path = require('path');
require('express-async-errors');
const graph = require('fbgraph');
const auth = require('../configs/auth')();
const jwt = require('jwt-simple');
const crypto = require('crypto');
const download = require('image-downloader');
const UserController = require('../controllers/userController');
const upload = require('../configs/storage').profile();

module.exports = (app) => {
  const user = new UserController(app);

  app.route('/users')
    .get(auth.authenticate(), async (req, res) => {
      try {
        const response = await user.all();
        res.status(200).json({ data: response, message: 'users successfully returned' });
      } catch (e) {
        throw e;
      }
    })
    .put(upload.single('image'), async (req, res) => {
      try {
        let data = await organizeUser(req.body, req.file ? req.file.filename : null);
        try {
          let response = await user.update(data);
          if (response[0] === 1) {
            res.status(200).json({ message: 'User update successfully' });
          } else {
            res.status(400).json({ message: 'Error in update user' });
          }
        } catch (e) {
          throw e;
        }
      } catch (e) {
        throw e;
      }
    })
  app.route('/users/:id')
    .delete(async (req, res) => {
      try {
        let response = await user.destroy(req.params);
        if (response === 1) res.status(200).json({ message: `User ${req.params.id} successfully destroyed` });
        else res.status(412).json({ message: `User ${req.params.id} not found` });
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
            let data = await organizeUser(resFacebook, null, token, 'FACE');
            try {
              let response = await user.updateOrCreate(data);
              const payload = { id: response.id, email: response.email };
              const token = jwt.encode(payload, process.env.jwtSecret);
              response['token'] = token;
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

  app.route('/users/register')
    .post(upload.single('image'), async (req, res) => {
      try {
        let data = await organizeUser(req.body, req.file ? req.file.filename : null);
        try {
          let response = await user.create(data);
          if (response) {
            res.status(200).json({ data: response, message: 'User create successfully' });
          } else {
            res.status(400).json({ data: [], message: 'User exists' });
          }
        } catch (e) {
          throw e;
        }
      } catch (e) {
        throw e;
      }
    });

  app.route('/users/login')
    .post(async (req, res) => {
      try {
        let data = await user.login(req.body);
        if (data) {
          const payload = { id: data.id, email: data.email };
          const token = jwt.encode(payload, process.env.jwtSecret);
          data['token'] = token;
          let _data = await organizeUser(data, data.imagem);
          res.status(200).json({ data: _data, message: 'User return successfully' });
        } else res.status(401).json({ data: data, message: 'Email or/and password incorrect' });
      } catch (e) {
        throw e;
      }
    })
}

const organizeUser = async (data, image = null, token = null, type = 'LOCAL') => {
  let dataUser = {};
  dataUser.name = data.first_name ? data.first_name : data.name;
  dataUser.lastName = data.last_name ? data.last_name : data.lastName;
  dataUser.email = data.email;
  dataUser.loginType = type;
  dataUser.id_login = data.id ? data.id : null;
  dataUser.password = data.password ? data.password : 'T0k5n';
  dataUser.image = image != null ? image : crypto.randomBytes(20).toString('hex') + '.jpg';
  dataUser.token = data.token ? data.token : crypto.randomBytes(20).toString('hex');
  /* try {
    await copyImage(data, dataUser.image);
  } catch (e) {
    throw e;
  }  */
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
