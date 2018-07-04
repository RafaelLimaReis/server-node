module.exports = (sequelize, dataType) => {
  const Message = sequelize.define('tb_messages', {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_chat: {
      type: dataType.INTEGER,
      allowNull: false
    },
    id_userSend: {
      type: dataType.INTEGER,
      allowNull: false
    },
    message: {
      type: dataType.STRING(30),
      allowNull: false
    }
  },
  {
    timestap: true,
    paranoid: true
  });

  Message.associate = (models) => {
    Message.belongsTo(models.tb_chats, { as: 'messages', foreignKey: 'id_chat' });
  }

  return Message;
}
