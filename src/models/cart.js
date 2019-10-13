const Sequelize = require("sequelize");
const sequelize = require('../utils/db');

module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('cart', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },

    })
    return Cart;
}

