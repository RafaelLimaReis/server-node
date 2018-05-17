module.exports = (app) => {
  const User = app.configs.db.models.tb_user;

  return {
    all: () => {
      return new Promise((resolve, reject) => {
        User.findAll({})
          .then(res => resolve(res))
          .catch(error => reject(error));
      });
    },

    updateOrCreate: async (data) => {
      let user = await User.findOne({ where: { id_login: data.id_login } });
      if (!user) {
        user = await User.create(data);
      } else {
        user = await User.update(data, { where: { id_login: data.id_login } });
      }
      return user;
    }
  }
}
