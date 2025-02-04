const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-application', 'root', 'Ilia615!', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
