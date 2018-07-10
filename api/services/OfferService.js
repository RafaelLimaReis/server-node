const Op = require('sequelize').Op;

class OfferService {
  constructor (models) {
    this.offers = models.tb_offers;
    this.offeredProduct = models.tb_offeredProducts;
    this.user = models.tb_users;
    this.product = models.tb_products;
  }

  async findAll (user) {
    const offers = await this.offers.findAll({
      where: {
        [Op.or]: [{
          id_firstUser: user.id
        },
        {
          id_lastUser: user.id
        }]
      },
      include: [{
        model: this.user,
        as: 'offer_first',
        attributes: ['username']
      },
      {
        model: this.user,
        as: 'offer_last',
        attributes: ['username']
      }]
    });

    return offers;
  }

  async findOffers (id) {
    let idOffer = parseInt(id);

    const offers = await this.offers.findOne({
      where: {
        id: idOffer
      },
      include: [
        {
          model: this.user,
          as: 'offer_first',
          attributes: ['id', 'username']
        },
        {
          model: this.user,
          as: 'offer_last',
          attributes: ['id', 'username']
        },
        {
          model: this.offeredProduct,
          as: 'products',
          include: {
            model: this.product,
            as: 'offer_product'
          }
        }
      ]
    });

    return offers;
  }

  async create (id, data) {
    let products = data.products;
    delete data.products;
    data.id_firstUser = id;

    const offer = await this.offers.create(data);

    products.forEach(async (product) => {
      product.id_offer = offer.id;
      await this.offeredProduct.create(product);
    });

    let productsOffer = await this.offers.findById(offer.id);

    return productsOffer;
  }

  async updateStatus (id, status, idOffer) {
    idOffer = parseInt(idOffer);
    let response = await this.offers.update({ status: status }, {where: { id: idOffer }});

    return response;
  }
}

module.exports = OfferService;
