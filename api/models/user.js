const bycrypt = require('bcrypt');

module.exports = (sequelize, dataType) => {
  const User = sequelize.define('tb_users', {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userName: {
      type: dataType.STRING(30),
      allowNull: false
    },
    firstName: {
      type: dataType.STRING(30),
      allowNull: false
    },
    lastName: {
      type: dataType.STRING(30)
    },
    /* id_address: {
      type: dataType.INTEGER
    }, */
    email: {
      type: dataType.STRING(30),
      allowNull: false
    },
    loginType: {
      type: dataType.ENUM('FACE', 'GMAIL', 'LOCAL'),
      allowNull: false
    },
    id_login: {
      type: dataType.BIGINT
    },
    password: {
      type: dataType.STRING
    },
    image: {
      type: dataType.STRING,
      allowNull: false
    }
  },
  {
    timestamp: true,
    paranoid: true
  });

  User.beforeCreate((user) => {
    const pass = bycrypt.genSaltSync();
    user.password = bycrypt.hashSync(user.password, pass);
  });

  User.prototype.auth = (value, user) => {
    if (bycrypt.compareSync(value, user.password)) {
      return user;
    } else {
      return false;
    }
  };

  User.associate = (models) => {
    User.hasMany(models.tb_products, { foreignKey: 'id_user' });
    // User.belongsTo(models.tb_addresses, { as: 'address', foreignKey: 'id_address' });
    User.hasMany(models.tb_chats, { foreignKey: 'id_firstUser' });
    User.hasMany(models.tb_chats, { foreignKey: 'id_lastUser' });
    User.hasMany(models.tb_offers, { foreignKey: 'id_firstUser' });
    User.hasMany(models.tb_offers, { foreignKey: 'id_lastUser' });
    User.belongsToMany(models.tb_products, { as: 'user', through: 'tb_wishes', foreignKey: 'id_user' });
  };

  return User;
}
