const bycrypt = require('bcrypt');

module.exports = (sequelize, dataType) => {
  const User = sequelize.define('tb_user', {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataType.STRING(30),
      allowNull: false
    },
    lastName: {
      type: dataType.STRING(30)
    },
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
    User.hasMany(models.tb_product, { foreignKey: 'id_user' });
  };

  return User;
}
