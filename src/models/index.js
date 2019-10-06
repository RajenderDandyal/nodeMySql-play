"use strict";
const Sequelize = require("sequelize");
const sequelize = require('../utils/db');

const models = {
  Product: sequelize.import("./product"),// kindly import the model created in the same folder in this manner and import more models name been created
  User: sequelize.import("./user") // kindly import the model created in the same folder in this manner and import more models name been created
};

Object.keys(models).forEach(modelName => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;
module.exports = models;