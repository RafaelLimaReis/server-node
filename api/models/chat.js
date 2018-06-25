module.exports = (sequelize, dataType) => {
  const Chat = sequelize.define('tb_chat', {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_user_1: {
      type: dataType.INTEGER,
      allowNull: false
    },
    id_user_2: {
      type: dataType.INTEGER,
      allowNull: false
    },
    room_name: {
      type: dataType.STRING(60),
      allowNull: false
    }
  }, {
    timestamp: true,
    paranoid: true
  });

  return Chat
}
