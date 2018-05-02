const productController = require('../controllers/productController');
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
  let product = productController(app);
  app.route('/products')
    .get((req, res) => {
      product.all()
        .then(result => res.status(200).json({ data: result, message: 'Products successfully returned' }))
        .catch(error => res.status(500).json({ message: error.message }));
    })
    .post((req, res) => {
      product.create(req.body)
        .then(result => res.status(201).json({ data: result, message: 'Product successfully created' }))
        .catch(error => res.status(412).json({ errors: error, message: 'Errors in create Product' }));
    });
  app.route('/products/:id')
    .get((req, res) => {
      product.find(req.params)
        .then(result => {
          if (result != null) {
            res.status(200).json({ data: result, message: 'Product successfully returned' });
          }
          res.status(404).json({ data: result, message: 'Product not found' });
        })
        .catch(error => res.status(500).json({ message: error.message }));
    })
    .put((req, res) => {
      product.updated(req)
        .then(result => res.status(200).json({ message: `Product ${req.params.id} successfully updated` }))
        .catch(error => res.status(412).json({ errors: error, message: 'Errors in updated Product' }));
    })
    .delete((req, res) => {
      product.destroy(req.params)
        .then(result => res.status(200).json({ message: `Product ${req.params.id} successfully destroyed` }))
        .catch(error => res.status(412).json({ errors: error, message: 'Errors in destroyed Product' }));
    });
  app.route('/products/images/:id')
    .post(upload.array('images', 5), (req, res) => {
      product.insertImages(req)
        .then(result => res.status(200).json({ message: `Images of product ${req.params.id} successfully created` }))
        .catch(error => console.log(error));
    });
}
