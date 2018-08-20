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

  async saveMessage (data) {
    await this.MessageService.saveMessage(data);
  }

  async findRoom (user, data) {
    const response = await this.MessageService.findRoom(user, data);
    return responseHelpers.success(response, 'Room successfully returned');
  }

  async createRoom (data) {
    await this.MessageService.createRoom(data);
  }
}

module.exports = MessageController;
