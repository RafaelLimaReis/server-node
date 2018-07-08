const CategoryDesiredService = require('../services/CategoryDesiredService');
const responseHelpers = require('../helpers/responseHelpers');

class CategoryDesiredController {
  constructor (models) {
    this.categoryDesiredService = new CategoryDesiredService(models);
  }

  async getAll (user, params) {
    const response = await this.categoryDesiredService.getAll(user, params.product);
    return responseHelpers.success(response, 'Categories desired successfully returned');
  }

  async create (data, params) {
    const response = await this.categoryDesiredService.create(data, params.product);
    if (response) return responseHelpers.success(response, 'Category desired successfully');
    else return responseHelpers.error('Error or create category desired');
  }

  async remove (user, params) {
    const response = await this.categoryDesiredService.remove(user, params);
    if (response) return responseHelpers.success([], 'Category desired deleted successfully');
    else return responseHelpers.notFound('Category desired not found');
  }
}

module.exports = CategoryDesiredController;
