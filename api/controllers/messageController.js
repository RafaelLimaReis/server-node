'use strict';

class messageController {
  constructor (app) {
    this.message = app.configs.db.models.tb_message;
  }

  async createMessage (data) {
    try {
      await this.message.create(data);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = messageController;
