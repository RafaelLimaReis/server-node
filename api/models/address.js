module.exports = (sequelize, dataType) => {
  const Address = sequelize.define('tb_addresses', {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
    }
  }, {
    timestap: true,
    paranoid: true
  });

  Address.associate = (models) => {
    // Address.hasMany(models.tb_users, { as: 'users', foreignKey: 'id_address' })
  }

  return Address;
}
