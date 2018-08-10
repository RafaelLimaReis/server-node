'use strict';

const usersHelpers = require('../helpers/usersHelpers');
const Facebook = require('facebookgraph');

class UserService {
  constructor (user) {
    this.user = user;
  }

  async findAll () {
    try {
      const user = await this.user.findAll();
      return user;
    } catch (e) {
      throw e;
    }
  }

  async create (data, files) {
    const objectUser = await usersHelpers.createObjectLocal(data, files);
    try {
      const findOne = await this.user.findOne({
        where: {
          email: objectUser.email,
          userName: objectUser.userName
        }
      });
      if (!findOne) {
        try {
          let user = await this.user.create(objectUser);
          return user;
        } catch (e) {
          throw e;
        }
      }
      return null;
    } catch (e) {
      throw e;
    }
  }

  async createFacebook (object) {
    try {
      const graph = new Facebook(object.get('access_token'));
      const userFacebook = await graph.request('/me?fields=id,first_name,last_name,email');
      const objectUser = await usersHelpers.createObjectfacebook(userFacebook.data);
      const verifyUser = await this.user.findOne({ where: { id_login: userFacebook.id_login } });
      let user;
      if (verifyUser) {
        user = await this.user.update(objectUser, { where: { id_login: userFacebook.id_login } });
      } else {
        user = await this.user.create(objectUser);
      }
      let response = await usersHelpers.createObjectfacebook(null, user);
      response.token = await usersHelpers.generateToken(user);
      return response;
    } catch (e) {
      throw e;
    }
  }

  async login (data) {
    try {
      let user = await this.user.findOne({where: {
        userName: data.userName
      }});
      if (user) {
        let userLogged = this.user.prototype.auth(data.password, user);
        if (userLogged) {
          let response = await usersHelpers.createObjectLocal(null, null, userLogged);
          response.token = await usersHelpers.generateToken(response);
          return response;
        }
      }
      return null;
    } catch (e) {
      throw e;
    }
  }

  async update (data, files) {
    try {
      let id = parseInt(data.params.id);
      let oldUser = await this.user.findOne({ where: { id: id } });
      if (oldUser) {
        let newUser = await usersHelpers.createObjectLocal(data.body, files, oldUser);
        await this.user.update(newUser, { where: { id: data.params.id } });
        let updated = await this.user.findOne({ where: { id: id } });
        return updated;
      }
    } catch (e) {
      throw e;
    }
  }

  async destroy (user) {
    let response = await this.user.destroy({ where: {id: user.id} });
    if (response === 1) return true;
    else return false;
  }
}

module.exports = UserService;
