require('express-async-errors');
const auth = require('../configs/auth')();
const UserController = require('../controllers/userController');
const upload = require('../configs/storage').profile();

module.exports = (app) => {
  const user = new UserController(app.configs.db.models);

  app.route('/users')
    .get(auth.authenticate(), async (req, res, next) => {
      try {
        res.locals = await user.all();
        next();
      } catch (e) {
        throw e;
      }
    })
    .delete(auth.authenticate(), async (req, res, next) => {
      try {
        res.locals = await user.destroy(req.user);
        next();
      } catch (e) {
        throw e;
      }
    })
  app.route('/users/:id')
    .put(auth.authenticate(), upload.single('image'), async (req, res, next) => {
      try {
        res.locals = await user.update(req, req.file ? req.file : null);
        next();
      } catch (e) {
        throw e;
      }
    })

  app.route('/users/login/facebook/')
    .post(async (req, res, next) => {
      try {
        res.locals = await user.createFacebook(req);
        next();
      } catch (e) {
        throw e;
      }
    });

  app.route('/users/register')
    .post(upload.single('image'), async (req, res, next) => {
      try {
        res.locals = await user.create(req.body, req.file);
        next();
      } catch (e) {
        throw e;
      }
    });

  app.route('/users/login')
    .post(async (req, res, next) => {
      try {
        res.locals = await user.login(req.body);
        next();
      } catch (e) {
        throw e;
      }
    })
}
