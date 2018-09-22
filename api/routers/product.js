require('express-async-errors');
const auth = require('../configs/auth');
const ProductController = require('../controllers/productController');
const upload = require('../configs/storage').product();

module.exports = (app) => {
  let product = new ProductController(app.configs.db.models);

  app.route('/products')
    .get(auth.authenticate, async (req, res, next) => {
      try {
        res.locals = await product.all(req.user);
        next();
      } catch (e) {
        throw e.message;
      }
    })
    .post(auth.authenticate, async (req, res, next) => {
      try {
        res.locals = await product.create(req.body, req.user);
        next();
      } catch (e) {
        throw e;
      }
    });

  app.route('/images/product')
    .post(upload.single('image'), async (req, res, next) => {
      try {
        res.locals = await product.createImages(req.body, req.file, req.user);
        next();
      } catch (error) {
        throw error;
      }
    });

  app.route('/me/products')
    .get(auth.authenticate, async (req, res, next) => {
      try {
        res.locals = await product.allMe(req.user);
        next();
      } catch (e) {
        throw e.message;
      }
    })
  app.route('/me/products/list')
    .get(auth.authenticate, async (req, res, next) => {
      try {
        res.locals = await product.listMe(req.user);
        next();
      } catch (e) {
        throw e.message;
      }
    })

  app.route('/other/:id/products')
    .get(auth.authenticate, async (req, res, next) => {
      try {
        res.locals = await product.allForOffer(req.params.id);
        next();
      } catch (e) {
        throw e.message;
      }
    })
  app.route('/products/:id')
    .get(auth.authenticate, async (req, res, next) => {
      try {
        res.locals = await product.find(req.params.id, req.user);
        next();
      } catch (e) {
        throw e;
      }
    })
    .put(auth.authenticate, async (req, res, next) => {
      try {
        res.locals = await product.update(req, req.files, req.user);
        next();
      } catch (e) {
        throw e;
      }
    })
    .delete(auth.authenticate, async (req, res, next) => {
      try {
        res.locals = await product.destroy(req.params.id, req.user);
        next();
      } catch (e) {
        throw e;
      }
    });
}
