module.exports = (sequelize, dataType) => {
  const Product = sequelize.define('tb_product', {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: dataType.STRING(30)
    },
    id_user: {
      type: dataType.INTEGER
    }
  },
  {
    timestamp: true,
    paranoid: true
  }
  );

  Product.associate = function (models) {
    Product.belongsTo(models.tb_user, {as: 'tb_product', foreignKey: 'id_user'});
  };

  return Product;
}
