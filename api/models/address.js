module.exports = (sequelize, dataType) => {
  const Address = sequelize.define('tb_adresses', {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cep: {
      type: dataType.INTEGER,
      allowNull: false
    },
    street: {
      type: dataType.STRING(30),
      allowNull: false
    },
    city: {
      type: dataType.STRING(30),
      allowNull: false
    },
    state: {
      type: dataType.STRING(2),
      allowNull: false
    },
    district: {
      type: dataType.STRING(30),
      allowNull: false
    },
    number: {
      type: dataType.INTEGER,
      allowNull: false
    }
  }, {
    timestap: true,
    paranoid: true
  });

  Address.associate = (models) => {
    Address.hasMany(models.tb_users, { as: 'users', foreignKey: 'id_address' })
  }

  return Address;
}
