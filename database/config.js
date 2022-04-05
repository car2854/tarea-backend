const { Sequelize } = require('sequelize');

const { USER, HOST, PASSWORD, DATABASE} = process.env;

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect: 'postgres'
});

// const dbConnection = async() => {
//   try {
//     await sequelize.authenticate();
//     console.log('DB Online');
//   } catch (error) {
//     console.log(error);
//     throw new Error('Error a la hora de iniciar la DB ver logs');
//   }
// }

module.exports = {sequelize};