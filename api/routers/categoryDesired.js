const auth = require('../configs/auth')();
const CategoryDesired = require('../controllers/CategoryDesiredController');

module.exports = (app) => {
  const CategoryDesiredController = new CategoryDesired(app.configs.db.models);

  app.route('/:product/categoriesDesired')
    .get(auth.authenticate(), async (req, res, next) => {
      try {
        res.locals = await CategoryDesiredController.getAll(req.user, req.params);
        next();
      } catch (e) {
        throw e;
      }
    })
    .post(auth.authenticate(), async (req, res, next) => {
      try {
        res.locals = await CategoryDesiredController.create(req.body, req.params);
        next();
      } catch (e) {
        throw e;
      }
    });
  app.route('/:product/categoriesDesired/:id')
    .delete(auth.authenticate(), async (req, res, next) => {
      try {
        res.locals = await CategoryDesiredController.remove(req.user, req.params);
        next();
      } catch (e) {
        throw e;
      }
    })
}
