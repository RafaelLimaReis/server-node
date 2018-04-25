const sequelize = require('../configs/db');
const dataTypes = require('sequelize/lib/data-types');

module.exports = () => {
  const User = sequelize.define('db_user', {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: dataTypes.STRING(30)
    },
    sobrenome: {
      type: dataTypes.STRING(30)
    },
    image: {
      type: dataTypes.STRING
    },
    cpf: {
      type: dataTypes.INTEGER
    }
  },
  {
    timestamp: true,
    paranoid: true
  }
  );

  return User;
}
