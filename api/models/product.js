module.exports = (sequelize, dataType) => {
  const Product = sequelize.define('tb_products', {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataType.STRING(30),
      validate: {
        notEmpty: {
          msg: 'Campo obrigatório'
        }
      }
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
    Product.belongsTo(models.tb_users, {foreignKey: 'id_user'});
    Product.hasMany(models.tb_images, { as: 'images', foreignKey: 'id_product', onDelete: 'cascade' });
    Product.hasMany(models.tb_offeredProducts, { as: 'product', foreignKey: 'id_product' });
    Product.hasMany(models.tb_categoryDesired, { as: 'categorys', foreignKey: 'id_product', onDelete: 'cascade' });
    Product.belongsToMany(models.tb_users, { as: 'productWished', through: 'tb_wishes', foreignKey: 'id_product' });
  };

  return Product;
}
