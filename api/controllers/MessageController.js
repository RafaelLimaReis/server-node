const responseHelpers = require('../helpers/responseHelpers');
const MessageService = require('../services/MessageService');

class MessageController {
  constructor (models) {
    this.MessageService = new MessageService(models);
  }

  async all (user) {
    const response = await this.MessageService.findAll(user);
    return responseHelpers.success(response, 'Messages successfully returned');
  }
}

module.exports = MessageController;
