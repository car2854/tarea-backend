const { Sequelize } = require('sequelize');

const { USER, HOST, PASSWORD, DATABASE} = process.env;

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect: 'postgres'
});

module.exports = {sequelize};