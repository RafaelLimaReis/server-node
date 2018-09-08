const Op = require('sequelize').Op;
const offerHelpers = require('../helpers/offersHelpers');

class OfferService {
  constructor (models) {
    this.offers = models.tb_offers;
    this.offeredProduct = models.tb_offeredProducts;
    this.user = models.tb_users;
    this.images = models.tb_images;
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
        }],
        status: {
          [Op.not]: 'PROPOSTA'
        }
      },
      order: [['id_offerStart', 'asc'], ['createdAt', 'desc']],
      include: [{
        model: this.user,
        as: 'offer_first',
        attributes: ['username']
      },
      {
        model: this.offers,
        as: 'start',
        include: [{
          model: this.user,
          as: 'offer_first',
          attributes: ['username']
        }]
      },
      {
        model: this.user,
        as: 'offer_last',
        attributes: ['username']
      },
      {
        model: this.offeredProduct,
        as: 'products',
        include: [{
          model: this.product,
          as: 'offer_product',
          include: [{
            model: this.images,
            as: 'images'
          }, {
            model: this.user
          }]
        }]
      }]
    });

    return offerHelpers.organizeOffers(offers, user);
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

    /** Verificar se o id_offerStart é diferente de 0 e buscar o produto raiz da oferta */
    if (offer.id_offerStart !== 0) {
      let fatherOffer = await this.offers.find({
        where: {
          id: offer.id_offerStart
        }
      });

      let product = await this.offeredProduct.find({
        where: {
          id_offer: fatherOffer.id
        },
        include: [{
          model: this.product,
          as: 'offer_product',
          where: {
            id_user: fatherOffer.id_lastUser
          }
        }]
      });

      products.push({ id_product: product.id_product });
      await this.offers.update({ status: 'PROPOSTA' }, {
        where: {
          id: {
            [Op.ne]: offer.id
          },
          [Op.or]: [{ id_offerStart: fatherOffer.id }, { id: fatherOffer.id }],
          [Op.and]: [{ status: 'AGUARDANDO' }]
        }
      });
    }

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
