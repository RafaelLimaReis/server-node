'use strict';

const ServiceImages = require('../services/ServiceImages');

/**
 * Class de produtos
 */
class productController {
  /**
   * Construct class
   * @param {*} app
   */
  constructor (app) {
    this.serviceImages = new ServiceImages();
    this.product = app.configs.db.models.tb_product;
    this.image = app.configs.db.models.tb_image;
  }

  /**
   * Função de retorno de todas os produtos
   */
  async all () {
    try {
      const prod = await this.product.findAll({
        include: {
          model: this.image,
          as: 'images'
        }
      });
      return prod;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Função para criar um produto
   * @param {array} product
   */
  async create (product) {
    try {
      await this.product.create(product)
    } catch (e) {
      throw e;
    }
  }

  /**
   * Buscar um produto
   * @param {int} id
   */
  async find (id) {
    try {
      let prod = await this.product.findOne({
        where: id,
        include: {
          model: this.image,
          as: 'images'
        }
      });
      return prod;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Atualizar produto
   * @param {array} data
   */
  async updated (data) {
    try {
      let number = await this.product.update(data.body, { where: data.params });
      return number;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Deletar um produto
   * @param {int} id
   */
  async destroy (id) {
    try {
      let number = this.product.destroy({ where: id });
      return number;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Inserir imagens do produto
   * @param {array} data
   */
  async insertImages (data) {
    let id = data.params.id;
    let images = data.files;
    let _data = await this.serviceImages.insertImages(images, id);
    _data.map(async data => {
      try {
        await this.image.create(data);
      } catch (e) {
        throw e;
      }
    });
    return data;
  }
}

module.exports = productController;
