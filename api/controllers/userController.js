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
    updateOrCreate: (data) => {
      data.password = '1012313131';
      data.cpf = 123456;
      data.image = 'asdasdasd.jpg';
      data.name = data.first_name;
      data.lastName = data.last_name;
      delete data.id;
      User.findOne({ where: { id: data.id } }).then((item) => {
        if (!item) {
          User.create(data).then(res => res);
        } else {
          User.update(data, { where: { id: data.id } }).then(res => res);
        }
      })

    }
  }
}
