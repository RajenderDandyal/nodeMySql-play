const Sequelize = require("sequelize");
const sequelize = require('../utils/db');

module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define('cartItem', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        quantity: Sequelize.INTEGER

    })
    return CartItem;
}

