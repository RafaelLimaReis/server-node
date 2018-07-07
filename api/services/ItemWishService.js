class ItemWishService {
  constructor (models) {
    this.itemWish = models.tb_wishes;
    this.product = models.tb_products;
    this.user = models.tb_users;
  }

  async findAll (user) {
    const items = await this.user.findAll({
      include: {
        model: this.product,
        as: 'itemsWished',
        through: { attributes: [] }
      }
    });

    return items;
  }

  async create (data, user) {
    data.id_user = user.id;
    const item = await this.itemWish.create(data);

    return item;
  }

  async remove (param, user) {
    let id = parseInt(param);
    const response = await this.itemWish.destroy({ where: {
      id_user: user.id,
      id: id
    }});

    return response;
  }
}

module.exports = ItemWishService;
