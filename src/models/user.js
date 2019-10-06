const Sequelize = require("sequelize");
const sequelize = require('../utils/db');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: Sequelize.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.BIGINT,
        imageURL: {
            type: Sequelize.STRING,
            allowNull: false
        },
    })
    return User;
}

