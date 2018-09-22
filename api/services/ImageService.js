'use strict';

class ImageService {
  constructor (images) {
    this.images = images;
  }

  async insertImages (data, id) {
    let _data = [];

    _data.push({
      id_product: id,
      hash_name: data.filename
    });

    await this._saveImage(_data);

    return _data;
  }

  async _saveImage (_data) {
    _data.map(async data => {
      try {
        await this.images.create(data);
      } catch (e) {
        throw e;
      }
    });
  }

  async deleteImages (id) {
    await this.images.destroy({ where: { id_product: id } });
  }
}

module.exports = ImageService;
