module.exports = (sequelize, dataType) => {
  const OfferedProduct = sequelize.define('tb_offeredProducts', {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_offer: {
      type: dataType.INTEGER,
      allowNull: false
    },
    id_product: {
      type: dataType.INTEGER,
      allowNull: false
    }
  },
  {
    timestap: true,
    paranoid: true
  });

  OfferedProduct.associate = (models) => {
    OfferedProduct.belongsTo(models.tb_products, { as: 'offer_product', foreignKey: 'id_product' });
    OfferedProduct.belongsTo(models.tb_offers, { as: 'offer', foreignKey: 'id_offer' });
  }

  return OfferedProduct;
}
