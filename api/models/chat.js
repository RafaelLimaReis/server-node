module.exports = (sequelize, dataType) => {
  const Chat = sequelize.define('tb_chats', {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_firstUser: {
      type: dataType.INTEGER,
      allowNull: false
    },
    id_lastUser: {
      type: dataType.INTEGER,
      allowNull: false
    },
    roomName: {
      type: dataType.STRING(30),
      allowNull: false
    }
  },
  {
    timestap: true,
    paranoid: true
  });

  Chat.associate = (models) => {
    Chat.belongsTo(models.tb_users, { as: 'chat_first', foreignKey: 'id_firstUser' });
    Chat.belongsTo(models.tb_users, { as: 'chat_last', foreignKey: 'id_lastUser' });
    Chat.hasMany(models.tb_messages, { as: 'messages', foreignKey: 'id_chat' });
  }

  return Chat;
}
