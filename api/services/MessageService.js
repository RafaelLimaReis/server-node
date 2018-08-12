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
}

module.exports = MessageService;
