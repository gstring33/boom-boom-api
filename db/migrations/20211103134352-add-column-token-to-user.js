'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Users', // name of Source model
        'token', // name of the key we're adding
        {
          type: Sequelize.STRING
        })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'Users', // name of Source model
        'token' // key we want to remove
    )
  }
};
