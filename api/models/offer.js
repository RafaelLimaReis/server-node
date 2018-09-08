module.exports = (sequelize, dataType) => {
  const Offer = sequelize.define('tb_offers', {
    id: {
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_firstUser: {
      type: dataType.INTEGER,
      allowNull: false
    },
    id_lastUser: {
      type: dataType.INTEGER,
      allowNull: false
    },
    id_offerStart: {
      type: dataType.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    status: {
      type: dataType.ENUM('APROVADO', 'RECUSADO', 'AGUARDANDO'),
      defaultValue: 'AGUARDANDO',
      allowNull: false
    }
  },
  {
    timestap: true,
    paranoid: true
  });

  Offer.associate = (models) => {
    Offer.belongsTo(models.tb_offers, { as: 'start', foreignKey: 'id_offerStart', targetKey: 'id' });
    Offer.belongsTo(models.tb_users, { as: 'offer_first', foreignKey: 'id_firstUser' });
    Offer.belongsTo(models.tb_users, { as: 'offer_last', foreignKey: 'id_lastUser' });
    Offer.hasMany(models.tb_offeredProducts, { as: 'products', foreignKey: 'id_offer' });
  }

  return Offer;
}
