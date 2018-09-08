const ProductService = require('../services/ProductService');
const ImageService = require('../services/ImageService');
const responseHelpers = require('../helpers/responseHelpers');

/**
 * Class de produtos
 */
class productController {
  /**
   * Construct class
   * @param {*} app
   */
  constructor (models) {
    this.ImageService = new ImageService(models.tb_images);
    this.ProductService = new ProductService(models);
  }

  /**
   * Função de retorno de todas os produtos
   */
  async all (user) {
    try {
      const response = await this.ProductService.findAll(user);
      return responseHelpers.success(response, 'Products successfully returned');
    } catch (e) {
      throw e;
    }
  }

  async allMe (user) {
    try {
      const response = await this.ProductService.findAllMe(user);
      return responseHelpers.success(response, 'Products successfully returned');
    } catch (e) {
      throw e;
    }
  }
  async allForOffer (id) {
    try {
      const response = await this.ProductService.findAllForOffer(id);
      return responseHelpers.success(response, 'Products successfully returned');
    } catch (e) {
      throw e;
    }
  }

  /**
   * Função para criar um produto
   * @param {array} product
   */
  async create (product, files, user) {
    try {
      let response = await this.ProductService.create(product, user);
      await this._insertImages(files, response.id);
      return responseHelpers.success(response, 'Products successfully created', 201);
    } catch (e) {
      throw e;
    }
  }

  /**
   * Buscar um produto
   * @param {int} id
   */
  async find (id, user) {
    try {
      const response = await this.ProductService.find(id, user);
      return responseHelpers.success(response, 'Product successfully returned');
    } catch (e) {
      throw e;
    }
  }

  /**
   * Atualizar produto
   * @param {array} data
   */
  async update (product, files, user) {
    try {
      let newProduct = await this.ProductService.update(product, user);
      if (files) await this.ImageService.deleteImages(newProduct.id);
      await this._insertImages(files, newProduct.id);
      if (newProduct) return responseHelpers.success(newProduct, 'Product successfully updated');
      else return responseHelpers.notFound('Product not Found');
    } catch (e) {
      throw e;
    }
  }

  /**
   * Deletar um produto
   * @param {int} id
   */
  async destroy (id, user) {
    try {
      let response = await this.ProductService.destroy(id, user);

      if (response) return responseHelpers.success([], 'Product successfully destroyed');
      else return responseHelpers.notFound('Product not found');
    } catch (e) {
      throw e;
    }
  }

  /**
   * Inserir imagens do produto
   * @param {array} data
   */
  async _insertImages (files, id) {
    let _data = await this.ImageService.insertImages(files, id);
    return _data;
  }
}

module.exports = productController;
