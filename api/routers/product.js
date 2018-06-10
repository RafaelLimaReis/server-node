require('express-async-errors');
const auth = require('../configs/auth')();
const ProductController = require('../controllers/productController');
const upload = require('../configs/storage').product();

module.exports = (app) => {
  let product = new ProductController(app);

  app.route('/products')
    .get(auth.authenticate(), async (req, res, next) => {
      try {
        let products = await product.all();
        res.status(200).json({ data: products, message: 'Products successfully returned' });
      } catch (e) {
        throw e.message;
      }
    })
    .post(auth.authenticate(), async (req, res) => {
      try {
        let prod = await product.create(req.body);
        res.status(201).json({ data: prod, message: 'Product successfully created' });
      } catch (e) {
        throw e;
      }
    });

  app.route('/products/:id')
    .get(auth.authenticate(), async (req, res) => {
      try {
        let prod = await product.find(req.params);
        res.status(200).json({ data: prod, message: 'Product successfully returned' });
      } catch (e) {
        throw e;
      }
    })
    .put(auth.authenticate(), async (req, res) => {
      try {
        let prod = await product.updated(req);
        if (prod[0] === 1) res.status(200).json({ message: `Product ${req.params.id} successfully updated` });
        else res.status(412).json({ message: `Product ${req.params.id} not found` });
      } catch (e) {
        throw e;
      }
    })
    .delete(auth.authenticate(), async (req, res) => {
      try {
        let prod = await product.destroy(req.params);
        if (prod === 1) res.status(200).json({ message: `Product ${req.params.id} successfully destroyed` });
        else res.status(412).json({ message: `Product ${req.params.id} not found` });
      } catch (e) {
        throw e;
      }
    });

  app.route('/products/images/:id')
    .post(auth.authenticate(), upload.array('images', 5), async (req, res) => {
      try {
        await product.insertImages(req);
        res.status(200).json({ message: `Images of product ${req.params.id} successfully created` });
      } catch (e) {
        throw e;
      }
    });
}
