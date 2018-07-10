const OfferService = require('../services/OfferService');
const responseHelpers = require('../helpers/responseHelpers');

class OfferController {
  constructor (models) {
    this.offerService = new OfferService(models);
  }

  async findAll (user) {
    const response = await this.offerService.findAll(user);
    return responseHelpers.success(response, 'Offers returned successfully');
  }

  async findOffers (id) {
    const response = await this.offerService.findOffers(id);
    return responseHelpers.success(response, 'Offers returned successfully');
  }

  async create (user, data) {
    const response = await this.offerService.create(user.id, data);
    if (response) return responseHelpers.success(response, 'Offer created successfully');
    else return responseHelpers.error('Error in create offer');
  }

  async updateStatus (user, data, idOffer) {
    const response = await this.offerService.updateStatus(user.id, data.status, idOffer);
    if (response[0] === 1) return responseHelpers.success([], 'Updated successfully');
    else return responseHelpers.error('Error in update offer');
  }
}

module.exports = OfferController;
