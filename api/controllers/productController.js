const ServiceImages = require('../services/ServiceImages')();

module.exports = (app) => {
  const product = app.configs.db.models.tb_product;
  const image = app.configs.db.models.tb_image;
  return {
    all: () => {
      return new Promise((resolve, reject) => {
        product.findAll({
          include: {
            model: image,
            as: 'images'
          }
        })
          .then(res => resolve(res))
          .catch(error => reject(error));
      });
    },
    create: (data) => {
      return new Promise((resolve, reject) => {
        product.create(data)
          .then(result => resolve(result))
          .catch(error => reject(error))
      });
    },
    find: (data) => {
      return new Promise((resolve, reject) => {
        product.findOne({ where: data,
          include: {
            model: image,
            as: 'images'
          }
        })
          .then(result => resolve(result))
          .catch(error => reject(error))
      });
    },
    updated: (data) => {
      return new Promise((resolve, reject) => {
        product.update(data.body, { where: data.params })
          .then(result => resolve(result))
          .catch(error => reject(error))
      });
    },
    destroy: (data) => {
      return new Promise((resolve, reject) => {
        product.destroy({ where: data })
          .then(result => resolve(result))
          .catch(error => reject(error))
      });
    },
    insertImages: (data) => {
      let id = data.params.id;
      let images = data.files;
      let _data = ServiceImages.insertImages(images, id);
      return new Promise((resolve, reject) => {
        _data.map(data => {
          image.create(data)
            .then(result => resolve(result))
            .catch(error => reject(error))
        });
      });
    }
  }
}
