const Sequelize = require('sequelize');

const sequelize = require('../db.js');

const User = sequelize.define('user', {
  // id: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  //   primaryKey: true,
  // },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;
