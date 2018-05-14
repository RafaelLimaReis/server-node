'use strict';

class ServiceImage {
  insertImages (data, id) {
    let _data = [];

    data.forEach(element => {
      _data.push({
        id_product: id,
        hash_name: element.filename
      });
    });

    return _data;
  }
}

module.exports = ServiceImage;
