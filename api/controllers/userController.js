'use strict';

const UserService = require('../services/UserService');
const responseHelpers = require('../helpers/responseHelpers');

/**
 * Class de usuarios
 */
class userController {
  /**
   * Construct class
   * @param {*} app
   */
  constructor (models) {
    this.user = models.tb_user; // a tirar
    this.userService = new UserService(models.tb_users, models.tb_adresses);
  }

  /**
   * Função de retorno de usuarios
   */
  async all (user) {
    try {
      const response = await this.userService.findAll(user);
      return responseHelpers.success(response, 'users successfully returned');
    } catch (e) {
      throw e;
    }
  }

  /**
   * Função de atualização ou criação de usuario (facebook)
   */
  async createFacebook (data) {
    try {
      const response = await this.userService.createFacebook(data);
      return responseHelpers.success(response, 'User logged successfully');
    } catch (e) {
      throw e;
    }
  }
  /**
   * Função para criar um novo usuario
   */
  async create (data, files) {
    try {
      const response = await this.userService.create(data, files);
      if (response) return responseHelpers.success(response, 'User create successfully');
      else return responseHelpers.exists('User exists');
    } catch (e) {
      throw e;
    }
  }

  /**
   * Função de atualização de usuario
   */
  async update (data, files = null) {
    try {
      const response = await this.userService.update(data, files);
      if (response) return responseHelpers.success(response, 'User updated successfully');
      else return responseHelpers.notFound('User notfound');
    } catch (e) {
      throw e;
    }
  }

  /**
   * Função para fazer login
   */
  async login (data) {
    try {
      const response = await this.userService.login(data);
      if (response) return responseHelpers.success(response, 'User logged successfully');
      else return responseHelpers.notFound('Email or/and password incorrect');
    } catch (e) {
      throw e;
    }
  }

  /**
   * Função para apagar usuario
   */
  async destroy (user) {
    try {
      const response = await this.userService.destroy(user);
      if (response) return responseHelpers.success([], 'User successfully destroyed');
      else return responseHelpers.notFound('User not found');
    } catch (e) {
      throw e;
    }
  }
}

module.exports = userController;
