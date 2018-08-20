const Op = require('sequelize').Op;
const chatHelpers = require('../helpers/chatHelpers');

class MessageService {
  constructor (models) {
    this.chat = models.tb_chats;
    this.message = models.tb_messages;
    this.user = models.tb_users;
  }

  async findAll (auth) {
    let user = parseInt(auth.id);
    const chats = await this.chat.findAll({
      where: {
        [Op.or]: [
          {
            id_firstUser: user
          },
          {
            id_lastUser: user
          }
        ]
      },
      include: [{
        model: this.message,
        as: 'messages'
      },
      {
        model: this.user,
        as: 'chat_first',
        attributes: ['id', 'userName', 'image']
      },
      {
        model: this.user,
        as: 'chat_last',
        attributes: ['id', 'userName', 'image']
      }]
    });

    return chatHelpers.organizeResponse(user, chats);
  }

  async findRoom (user, room) {
    const chats = await this.chat.find({
      where: {
        roomName: room
      },
      include: [{
        model: this.message,
        as: 'messages'
      },
      {
        model: this.user,
        as: 'chat_first',
        attributes: ['id', 'userName', 'image']
      },
      {
        model: this.user,
        as: 'chat_last',
        attributes: ['id', 'userName', 'image']
      }]
    });

    return chats !== null ? chatHelpers.organizeResponse(user, [chats]) : null;
  }

  async saveMessage (data) {
    await this.message.create(data);
  }

  async createRoom (data) {
    let chat = await this.chat.find({
      where: {
        [Op.or]: [
          {
            id_firstUser: data.userStart,
            id_lastUser: data.userRecept
          },
          {
            id_firstUser: data.userRecept,
            id_lastUser: data.userStart
          }
        ]
      }
    });

    if (chat) return chat;
    else {
      chat = await this.chat.create({
        id_firstUser: data.userStart,
        id_lastUser: data.userRecept,
        roomName: data.room
      });
    }

    return chat;
  }
}

module.exports = MessageService;
