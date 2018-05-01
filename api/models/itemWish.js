module.exports = (sequelize, dataType) => {
  const itemDesejo = sequelize.define('tb_item_wish', {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataType.STRING,
      allowNull: false
    }
  },
  {
    timestamp: true,
    paranoid: true
  }
  );

  itemDesejo.associate = (models) => {
    itemDesejo.belongsToMany(models.tb_product, { as: 'tb_item_wish', through: 'tb_wish', foreignKey: 'id_item_wanted' });
  };

  return itemDesejo;
}
