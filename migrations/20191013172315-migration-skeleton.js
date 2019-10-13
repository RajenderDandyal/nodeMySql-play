'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('users', 'fathersName', {
          type: Sequelize.STRING
        }, { transaction: t }),
        queryInterface.addColumn('users', 'mothersName', {
          type: Sequelize.STRING,
        }, { transaction: t })
      ])
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('users', 'fathersName', { transaction: t }),
        queryInterface.removeColumn('users', 'mothersName', { transaction: t })
      ])
    })
  }
};
