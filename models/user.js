module.exports = (sequelize, dataType) => {
  const User = sequelize.define('tb_user', {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: dataType.STRING(30),
      allowNull: false
    },
    sobrenome: {
      type: dataType.STRING(30),
      allowNull: false
    },
    image: {
      type: dataType.STRING,
      allowNull: false
    },
    cpf: {
      type: dataType.INTEGER,
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
