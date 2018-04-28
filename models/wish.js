module.exports = (sequelize, dataType) => {
  const Desejo = sequelize.define('tb_wish', {
    id_product: {
      type: dataType.INTEGER,
      allowNull: false
    },
    id_item_wanted: {
      type: dataType.INTEGER,
      allowNull: false
    },
    approved: {
      type: dataType.BOOLEAN
    }
  },
  {
    timestamp: true,
    paranoid: true
  }
  );

  return Desejo;
}
