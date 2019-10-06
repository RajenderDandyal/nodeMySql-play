const Sequelize = require("sequelize");
const sequelize = require('../utils/db');

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        title: Sequelize.STRING,
        price: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        imageURL: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
    })
    return Product;
}

