const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

let database = null;

const importModels = (sequelize) => {
  const dir = path.join(__dirname, '../api/models');
  let models = [];

  fs.readdirSync(dir).forEach(file => {
    const modelDir = path.join(dir, file);
    const model = sequelize.import(modelDir);

    models[model.name] = model;
  });

  Object.keys(models).forEach(modelName => {
    if ('associate' in models[modelName]) {
      models[modelName].associate(models);
    }
  });

  return models;
};

module.exports = (app) => {
  if (!database) {
    const sequelize = new Sequelize(
      process.env.DATABASE,
      process.env.DATABASE_USERNAME,
      process.env.DATABASE_PASSWORD,
      {
        dialect: process.env.DATABASE_TYPE,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT
      }
    );

    database = {
      sequelize,
      Sequelize,
      models: []
    };

    database.models = importModels(sequelize);

    sequelize.sync().done(() => {
      return database;
    });
  };
  return database;
}
