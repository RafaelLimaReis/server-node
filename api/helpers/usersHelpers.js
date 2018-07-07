const download = require('image-downloader');
const crypto = require('crypto');
const path = require('path');
const jwt = require('jwt-simple');

const createObjectUser = (data, oldUser = null) => {
  let dataUser = {};
  if (data) {
    dataUser.firstName = 'first_name' in data ? data.first_name : oldUser.firstName;
    dataUser.lastName = 'last_name' in data ? data.last_name : oldUser.lastName;
    dataUser.email = 'email' in data ? data.email : oldUser.email;
  } else {
    dataUser.firstName = oldUser.firstName;
    dataUser.lastName = oldUser.lastName;
    dataUser.email = oldUser.email;
  }

  return dataUser;
}

const createObjectLocal = (data, image, oldUser = null) => {
  let dataUser = createObjectUser(data, oldUser);

  if (data) {
    dataUser.userName = 'userName' in data ? data.userName : oldUser.userName;
    dataUser.password = 'password' in data ? data.password : oldUser.password;
  } else {
    dataUser.userName = oldUser.userName;
    dataUser.password = oldUser.password;
    dataUser.id = oldUser.id;
  }
  dataUser.loginType = 'LOCAL';
  dataUser.id_login = null;
  dataUser.image = image ? image.filename : oldUser.image;

  return dataUser;
}

const createObjectfacebook = async (data, oldUser = null) => {
  let dataUser = createObjectUser(data, oldUser);

  dataUser.userName = data ? data.first_name + data.last_name : oldUser.userName;
  dataUser.loginType = 'FACE';
  dataUser.id_login = data ? data.id : oldUser.id_login;
  dataUser.password = 'P4$w0rd';
  if (data) {
    try {
      dataUser.image = await copyImage(data, crypto.randomBytes(20).toString('hex') + '.jpg');
    } catch (e) {
      throw e;
    }
  } else {
    dataUser.image = oldUser.image;
  }

  return dataUser;
}

const generateToken = (user) => {
  const payload = { id: user.id, email: user.email };
  const token = jwt.encode(payload, process.env.jwtSecret);

  return token;
}

const copyImage = async (data, name) => {
  try {
    await download.image({
      url: `http://graph.facebook.com/${data.id}/picture?type=large`,
      dest: `${path.join(__dirname, '../../')}public/storage/users/${name}`
    });

    return name;
  } catch (e) {
    throw e;
  }
}

module.exports = { createObjectLocal, createObjectfacebook, generateToken };
