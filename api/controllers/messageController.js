'use strict';

class messageController {
  constructor (app) {
    this.message = app.configs.db.models.tb_message;
    this.chat = app.configs.db.models.tb_chat;
  }

  async createRoom (data) {
    try {
      const chat = {
        id_user_1: data.users[0],
        id_user_2: data.users[1],
        room_name: data.room
      }
      await this.chat.create(chat);
    } catch (e) {
      throw e;
    }
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
