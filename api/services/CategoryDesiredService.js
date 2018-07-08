class CategoryDesiredService {
  constructor (models) {
    this.categoryDesired = models.tb_categoryDesired;
    this.product = models.tb_products;
  }

  async getAll (user, product) {
    let id = parseInt(product);
    let categories = await this.categoryDesired.findAll({
      where: {
        id_product: id
      },
      include: {
        model: this.product,
        as: 'products',
        where: {
          id_user: user.id
        },
        attributes: []
      }
    });

    return categories;
  }

  async create (data, id) {
    data.id_product = parseInt(id);

    let categories = await this.categoryDesired.create(data);
    return categories;
  }

  async remove (user, params) {
    let product = parseInt(params.product);
    let category = parseInt(params.id);

    const response = await this.categoryDesired.destroy({
      where: {
        id_product: product,
        id: category
      },
      include: {
        model: this.product,
        as: 'products',
        where: {
          id_user: user.id
        }
      }
    });

    if (response === 1) return true;
    else return false;
  }
}

module.exports = CategoryDesiredService;
