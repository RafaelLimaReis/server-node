'use strict';
const Op = require('sequelize').Op;

class ProductService {
  constructor (models) {
    this.product = models.tb_products;
    this.image = models.tb_images;
    this.user = models.tb_users;
  }

  async findAll (user) {
    try {
      const prod = await this.product.findAll({
        where: {id_user: {
          [Op.ne]: user.id
        }},
        include: [{
          model: this.image,
          as: 'images'
        }, {
          model: this.user
        }]
      });

      return prod;
    } catch (e) {
      throw e;
    }
  }

  async create (product, user) {
    product.id_user = user.id;
    try {
      const prod = await this.product.create(product);
      return prod;
    } catch (e) {
      throw e;
    }
  }

  async find (_id, user) {
    _id = parseInt(_id);
    try {
      const prod = await this.product.findOne({
        where: {
          id_user: user.id,
          id: _id
        },
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

  async update (data, user) {
    let product = await this.find(data.params.id, user);
    try {
      if (product) {
        await this.product.update(
          data.body,
          {
            where: {
              id: data.params.id
            }
          });
        let newProduct = await this.find(data.params.id, data.user);
        return newProduct;
      } else {
        return null;
      }
    } catch (e) {
      throw e;
    }
  }

  async destroy (id, user) {
    id = parseInt(id);
    try {
      let response = await this.product.destroy({
        where: {
          id_user: user.id,
          id: id
        }
      });
      if (response === 1) return true;
      else return false;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = ProductService;
