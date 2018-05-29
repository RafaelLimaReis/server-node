const path = require('path');
require('express-async-errors');
const graph = require('fbgraph');
const crypto = require('crypto');
const download = require('image-downloader');
const UserController = require('../controllers/userController');
const multer = require('multer');
const _storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './storage/images/');
  },
  filename: (req, file, cb) => {
    let name = crypto.createHash('md5').update(file.originalname).digest('hex');
    name += '.' + file.mimetype.slice(6);
    cb(null, name);
  }
});

const upload = multer({ storage: _storage });

module.exports = (app) => {
  const user = new UserController(app);

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
            let data = await organizeUser(resFacebook, null, token, 'FACE');
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
        if (data) res.status(200).json({ data: data, message: 'User return successfully' });
        else res.status(401).json({ data: data, message: 'Email or/and password incorrect' });
      } catch (e) {
        throw e;
      }
    })
}

const organizeUser = async (data, image = null, token, type = 'LOCAL') => {
  let dataUser = {};
  dataUser.name = data.first_name;
  dataUser.lastName = data.last_name;
  dataUser.email = data.email;
  dataUser.loginType = type;
  dataUser.id_login = data.id ? data.id : false;
  dataUser.password = data.password ? data.password : false;
  dataUser.image = image != null ? image : crypto.randomBytes(20).toString('hex') + '.jpg';
  dataUser.token = crypto.randomBytes(20).toString('hex');
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
