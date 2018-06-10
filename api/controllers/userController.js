'use strict';

/**
 * Class de usuarios
 */
class userController {
  /**
   * Construct class
   * @param {*} app
   */
  constructor (app) {
    this.user = app.configs.db.models.tb_user;
  }

  /**
   * Função de retorno de usuarios
   */
  async all () {
    try {
      const user = await this.user.findAll({});
      return user
    } catch (e) {
      throw e;
    }
  }

  /**
   * Função de atualização ou criação de usuario (facebook)
   */
  async updateOrCreate (data) {
    try {
      let user = await this.user.findOne({ where: { id_login: data.id_login } });
      if (!user) {
        user = await this.user.create(data);
      } else {
        user = await this.user.update(data, { where: { id_login: data.id_login } });
      }
      return user;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Função de atualização de usuario
   */
  async update (data) {
    try {
      let user = await this.user.findOne({ where: { email: data.email } });
      user = await this.user.update(data, { where: { id: user.id } });
      return user;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Função para criar um novo usuario
   */
  async create (data) {
    try {
      var findOne = await this.user.findOne({
        where: {
          email: data.email
        }})
    } catch (e) {
      throw e;
    }
    if (!findOne) {
      try {
        let user = await this.user.create({
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          image: data.image,
          loginType: data.loginType,
          token: data.token
        });
        return user;
      } catch (e) {
        throw e;
      }
    }
    return null;
  }

  /**
   * Função para fazer login
   */
  async login (data) {
    try {
      let user = await this.user.findOne({where: {
        email: data.email
      }});
      if (user) user = this.user.prototype.auth(data.password, user);
      return user;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Função para apagar usuario
   */
  async destroy (id) {
    try {
      let number = this.user.destroy({ where: id });
      return number;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = userController;
