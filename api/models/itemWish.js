module.exports = (sequelize, dataType) => {
  const itemWish = sequelize.define('tb_wishes', {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_product: {
      type: dataType.INTEGER,
      unique: false,
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

  return itemWish;
}
