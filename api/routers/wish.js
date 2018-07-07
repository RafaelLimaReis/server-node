const auth = require('../configs/auth')();
const ItemWishController = require('../controllers/ItemWishController');

module.exports = (app) => {
  let itemWishController = new ItemWishController(app.configs.db.models);

  app.route('/wishes')
    .get(auth.authenticate(), async (req, res, next) => {
      try {
        res.locals = await itemWishController.findAll(req.user);
        next();
      } catch (e) {
        throw e;
      }
    })
    .post(auth.authenticate(), async (req, res, next) => {
      try {
        res.locals = await itemWishController.create(req.body, req.user);
        next();
      } catch (e) {
        throw e;
      }
    });
  app.route('/wishes/:id')
    .delete(auth.authenticate(), async (req, res, next) => {
      try {
        res.locals = await itemWishController.remove(req.params, req.user);
        next();
      } catch (e) {
        throw e;
      }
    })
}