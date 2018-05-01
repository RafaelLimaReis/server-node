module.exports = (app) => {
  const User = app.configs.db.models.tb_user;

  return {
    all: () => {
      return new Promise((resolve, reject) => {
        User.findAll({})
          .then(res => resolve(res))
          .catch(error => reject(error));
      });
    }
  }
}
