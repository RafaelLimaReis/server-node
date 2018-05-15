require('express-async-errors');
const ProductController = require('../controllers/productController');
const multer = require('multer');
const crypto = require('crypto');
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

const upload = multer({storage: _storage});

module.exports = (app) => {
  let product = new ProductController(app);

  app.route('/products')
    .get(async (req, res, next) => {
      try {
        let products = await product.all();
        res.status(200).json({ data: products, message: 'Products successfully returned' });
      } catch (e) {
        throw e;
      }
    })
    .post(async (req, res) => {
      try {
        let prod = await product.create(req.body);
        res.status(201).json({ data: prod, message: 'Product successfully created' });
      } catch (e) {
        throw e;
      }
    });

  app.route('/products/:id')
    .get(async (req, res) => {
      try {
        let prod = await product.find(req.params);
        res.status(200).json({ data: prod, message: 'Product successfully returned' });
      } catch (e) {
        throw e;
      }
    })
    .put(async (req, res) => {
      try {
        let prod = await product.updated(req);
        if (prod[0] === 1) res.status(200).json({ message: `Product ${req.params.id} successfully updated` });
        else res.status(412).json({ message: `Product ${req.params.id} not found` });
      } catch (e) {
        throw e;
      }
    })
    .delete(async (req, res) => {
      try {
        let prod = await product.destroy(req.params);
        if (prod === 1) res.status(200).json({ message: `Product ${req.params.id} successfully destroyed` });
        else res.status(412).json({ message: `Product ${req.params.id} not found` });
      } catch (e) {
        throw e;
      }
    });

  app.route('/products/images/:id')
    .post(upload.array('images', 5), async (req, res) => {
      try {
        await product.insertImages(req);
        res.status(200).json({ message: `Images of product ${req.params.id} successfully created` });
      } catch (e) {
        throw e;
      }
    });
}
