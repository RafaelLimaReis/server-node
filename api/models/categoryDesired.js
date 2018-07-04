module.exports = (sequelize, dataType) => {
  const categoryDesired = sequelize.define('tb_categoryDesired', {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_product: {
      type: dataType.INTEGER,
      allowNull: false
    },
    categoryDesired: {
      type: dataType.STRING(30),
      allowNull: false
    }
  },
  {
    timestamp: true,
    paranoid: true
  }
  );

  categoryDesired.associate = (models) => {
    categoryDesired.belongsTo(models.tb_products, { as: 'products', foreignKey: 'id_product' });
  }

  return categoryDesired;
}
