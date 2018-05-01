module.exports = (sequelize, dataType) => {
  const Product = sequelize.define('tb_product', {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: dataType.STRING(30),
      allowNull: false
    },
    id_user: {
      type: dataType.INTEGER,
      allowNull: false
    }
  },
  {
    timestamp: true,
    paranoid: true
  }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.tb_user, {as: 'tb_product', foreignKey: 'id_user'});
  };

  Product.associate = (models) => {
    Product.hasMany(models.tb_image, { foreignKey: 'id_product' });
  };

  Product.associate = (models) => {
    Product.belongsToMany(models.tb_item_wish, { as: 'tb_product', through: 'tb_wish', foreignKey: 'id_product' });
  };

  return Product;
}
