const Sequelize = require("sequelize");
const sequelize = new Sequelize('rajender', 'rajender', 'rajender',{
  dialect: 'mysql',
  host: 'db4free.net',
});

module.exports = sequelize;
