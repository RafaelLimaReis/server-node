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
      const user = await this.product.findAll({
        include: {
          model: this.image,
          as: 'images'
        }
      });
      return user;
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
  find (id) {
    return new Promise((resolve, reject) => {
      this.product.findOne({
        where: id,
        include: {
          model: this.image,
          as: 'images'
        }
      })
        .then(result => resolve(result))
        .catch(error => reject(error))
    });
  }

  /**
   * Atualizar produto
   * @param {array} data
   */
  updated (data) {
    return new Promise((resolve, reject) => {
      this.product.update(data.body, { where: data.params })
        .then(result => resolve(result))
        .catch(error => reject(error))
    });
  }

  /**
   * Deletar um produto
   * @param {int} id
   */
  destroy (id) {
    return new Promise((resolve, reject) => {
      this.product.destroy({ where: id })
        .then(result => resolve(result))
        .catch(error => reject(error))
    });
  }

  /**
   * Inserir imagens do produto
   * @param {array} data
   */
  insertImages (data) {
    let id = data.params.id;
    let images = data.files;
    let _data = this.serviceImages.insertImages(images, id);
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
