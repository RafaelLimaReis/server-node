module.exports = (sequelize, dataType) => {
  const User = sequelize.define('tb_user', {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: dataType.STRING(30)
    },
    sobrenome: {
      type: dataType.STRING(30)
    },
    image: {
      type: dataType.STRING
    },
    cpf: {
      type: dataType.INTEGER
    }
  },
  {
    timestamp: true,
    paranoid: true
  }
  );

  User.associate = function (models) {
    User.hasMany(models.tb_product, { foreignKey: 'id_user' });
  };

  return User;
}
