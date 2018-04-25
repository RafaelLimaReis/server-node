const Sequelize = require('sequelize');
let sequelize = null;
module.exports = () => {
  if (!sequelize) {
    sequelize = new Sequelize(
      process.env.DATABASE,
      process.env.DATABASE_USERNAME,
      process.env.DATABASE_PASSWORD,
      {
        dialect: process.env.DATABASE_TYPE,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT
      }
    );
  };

  return sequelize;
};
