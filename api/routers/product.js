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
  /**
   * @api {get} /products Listar todos os produtos
   * @apiGroup Products
   * @apiVerison 0.1
   * @apiHeader {String} Content-Type=application/json Tipo da request
   * @apiSuccess (200) {Array} data Array contendo todos os dados de retorno
   * @apiSuccess (200) {string} message Mensagem de confirmação de sucesso
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *
    "data": [
      {
        "id": 1,
        "nome": "teste api",
        "id_user": 1,
        "createdAt": "2018-05-02T00:46:16.195Z",
        "updatedAt": "2018-05-02T00:46:16.195Z",
        "deletedAt": null,
        "images": [
          {
            "id": 2,
            "id_product": 1,
            "hash_name": "ca85085fdab98ba5a3cf7b0aba1007e0.png",
            "createdAt": "2018-05-02T00:46:26.362Z",
            "updatedAt": "2018-05-02T00:46:26.362Z",
            "deletedAt": null
          },
          {
            "id": 1,
            "id_product": 1,
            "hash_name": "9f7e9c299e4290dbb7d361f4e303f69d.jpeg",
            "createdAt": "2018-05-02T00:46:26.360Z",
            "updatedAt": "2018-05-02T00:46:26.360Z",
            "deletedAt": null
          }
        ]
      }
    ],
    "message": "Products successfully returned"
   *
   */
    .get((req, res) => {
      product.all()
        .then(result => res.status(200).json({ data: result, message: 'Products successfully returned' }))
        .catch(error => res.status(500).json({ message: error.message }));
    })
  /**
   * @api {post} /products Criar produto
   * @apiGroup Products
   * @apiHeader {String} Content-Type=application/json Tipo da request
   * @apiParam {Number} id_user Id do usuario dono do produto
   * @apiParam {String} name Nome do produto
   * @apiExamplo {json} Examplo usage:
   *   {
   *    "id_user":2,
   *    "name":"teste API"
   *   }
   * @apiSuccess (200) {Array} data Array contendo todos os dados de retorno
   * @apiSuccess (200) {string} message Mensagem de confirmação de sucesso
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *
    "data": [
      {
        "id": 1,
        "nome": "teste api",
        "id_user": 1,
        "createdAt": "2018-05-02T00:46:16.195Z",
        "updatedAt": "2018-05-02T00:46:16.195Z",
        "deletedAt": null,
      }
    ],
    "message": "Products successfully created"
   *
   */
    .post((req, res) => {
      product.create(req.body)
        .then(result => res.status(201).json({ data: result, message: 'Product successfully created' }))
        .catch(error => res.status(412).json({ errors: error, message: 'Errors in create Product' }));
    });
  app.route('/products/:id')
  /**
   * @api {get} /products/:id Filtrar produto
   * @apiGroup Products
   * @apiHeader {String} Content-Type=application/json Tipo da request
   * @apiParam {Number} id Id do usuario dono do produto
   * @apiSuccess (200) {Array} data Array contendo todos os dados de retorno
   * @apiSuccess (200) {string} message Mensagem de confirmação de sucesso
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *
    "data": [
      {
        "id": 1,
        "nome": "teste api",
        "id_user": 1,
        "createdAt": "2018-05-02T00:46:16.195Z",
        "updatedAt": "2018-05-02T00:46:16.195Z",
        "deletedAt": null,
        "images": [
          {
            "id": 2,
            "id_product": 1,
            "hash_name": "ca85085fdab98ba5a3cf7b0aba1007e0.png",
            "createdAt": "2018-05-02T00:46:26.362Z",
            "updatedAt": "2018-05-02T00:46:26.362Z",
            "deletedAt": null
          },
          {
            "id": 1,
            "id_product": 1,
            "hash_name": "9f7e9c299e4290dbb7d361f4e303f69d.jpeg",
            "createdAt": "2018-05-02T00:46:26.360Z",
            "updatedAt": "2018-05-02T00:46:26.360Z",
            "deletedAt": null
          }
        ]
      }
    ],
    "message": "Products successfully returned"
   *
   * @apiError (404) {string} data=null Retorno null de dados
   * @apiError (404) {strign} message Mensagem sobre request
   * @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 404 Not Found
   *  {
   *    "data":null,
   *    "message": "Product not found"
   *  }
   *
   */
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
  /**
   * @api {put} /products/:id Atualizar produto
   * @apiGroup Products
   * @apiHeader {String} Content-Type=application/json Tipo da request
   * @apiParam {Number} id Id do usuario dono do produto
   * @apiParam {String} name Nome do produto
   * @apiExample {json} Example usage:
   *   {
   *    "name":"alteração nome produto"
   *   }
   * @apiSuccess (200) {Array} data Array contendo todos os dados de retorno
   * @apiSuccess (200) {string} message Mensagem de confirmação de sucesso
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *
    "data": [
      {
        "id": 1,
        "nome": "teste api",
        "id_user": 1,
        "createdAt": "2018-05-02T00:46:16.195Z",
        "updatedAt": "2018-05-02T00:46:16.195Z",
        "deletedAt": null,
      }
    ],
    "message": "Products successfully updated"
   */
    .put((req, res) => {
      product.updated(req)
        .then(result => res.status(200).json({ message: `Product ${req.params.id} successfully updated` }))
        .catch(error => res.status(412).json({ errors: error, message: 'Errors in updated Product' }));
    })
  /**
   * @api {delete} /products/:id Apagar produto
   * @apiGroup Products
   * @apiHeader {String} Content-Type=application/json Tipo da request
   * @apiParam {Number} id Id do usuario dono do produto
   * @apiSuccess (200) {string} message Mensagem de confirmação de sucesso
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *
    "message": "Products successfully destroyed"
   *
   */
    .delete((req, res) => {
      product.destroy(req.params)
        .then(result => res.status(200).json({ message: `Product ${req.params.id} successfully destroyed` }))
        .catch(error => res.status(412).json({ errors: error, message: 'Errors in destroyed Product' }));
    });
  app.route('/products/images/:id')
  /**
   * @api {post} /products/images/:id Inserir imagens no produto
   * @apiGroup Products
   * @apiHeader {String} Content-Type=multipart/form-data Tipo da request
   * @apiParam {Number} id Id do usuario dono do produto
   * @apiParam {Array} images Array de imagens para cadastrar
   * @apiSuccess (200) {string} message Mensagem de confirmação de sucesso
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *
    "message": "Images of product successfully created"
   */
    .post(upload.array('images', 5), (req, res) => {
      product.insertImages(req)
        .then(result => res.status(200).json({ message: `Images of product ${req.params.id} successfully created` }))
        .catch(error => console.log(error));
    });
}
