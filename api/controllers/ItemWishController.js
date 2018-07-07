const ItemWishService = require('../services/ItemWishService');
const responseHelpers = require('../helpers/responseHelpers');

class ItemWishController {
  constructor (models) {
    this.itemWishService = new ItemWishService(models);
  }

  async findAll (user) {
    const response = await this.itemWishService.findAll(user);
    return responseHelpers.success(response, 'Items desired returned successfully');
  }

  async create (data, user) {
    const response = await this.itemWishService.create(data, user);
    if (response) return responseHelpers.success(response, 'Item Desired created successfully');
    else return responseHelpers.error('Error in create wished');
  }

  async remove (param, user) {
    const response = await this.itemWishService.remove(param.id, user);
    if (response === 1) return responseHelpers.success([], 'Item wish deleted successfully');
    else return responseHelpers.notFound('Item wish not found');
  }
}
module.exports = ItemWishController;
