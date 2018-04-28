module.exports = (sequelize, dataType) => {
  const Image = sequelize.define('tb_image', {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_product: {
      type: dataType.INTEGER,
      allowNull: false
    },
    hash_name: {
      type: dataType.STRING,
      allowNull: false
    }
  },
  {
    timestamp: true,
    paranoid: true
  }
  );

  Image.associate = (models) => {
    Image.belongsTo(models.tb_product, { as: 'tb_image', foreignKey: 'id_product' });
  };

  return Image;
}
