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
    password: {
      type: dataType.STRING(30),
      allowNull: false
    },
    image: {
      type: dataType.STRING,
      allowNull: false
    },
    token: {
      type: dataType.STRING,
      allowNull: false
    }
  },
  {
    timestamp: true,
    paranoid: true
  }
  );

  User.associate = (models) => {
    User.hasMany(models.tb_product, { foreignKey: 'id_user' });
  };

  return User;
}
