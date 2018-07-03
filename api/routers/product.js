require('express-async-errors');
const auth = require('../configs/auth')();
const ProductController = require('../controllers/productController');
const upload = require('../configs/storage').product();

module.exports = (app) => {
  let product = new ProductController(app.configs.db.models);

  app.route('/products')
    .get(auth.authenticate(), async (req, res, next) => {
      try {
        res.locals = await product.all(req.user);
        next();
      } catch (e) {
        throw e.message;
      }
    })
    .post(auth.authenticate(), upload.array('images', 5), async (req, res, next) => {
      try {
        res.locals = await product.create(req.body, req.files, req.user);
        next();
      } catch (e) {
        throw e;
      }
    });

  app.route('/products/:id')
    .get(auth.authenticate(), async (req, res, next) => {
      try {
        res.locals = await product.find(req.params.id, req.user);
        next();
      } catch (e) {
        throw e;
      }
    })
    .put(auth.authenticate(), async (req, res, next) => {
      try {
        res.locals = await product.update(req);
        next();
      } catch (e) {
        throw e;
      }
    })
    .delete(auth.authenticate(), async (req, res, next) => {
      try {
        res.locals = await product.destroy(req.params.id, req.user);
        next();
      } catch (e) {
        throw e;
      }
    });
}
