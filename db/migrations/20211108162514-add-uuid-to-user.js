'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Users', // name of Source model
        'uuid', // name of the key we're adding
        {
          type: Sequelize.UUID,
          unique: true
        })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'Users', // name of Source model
        'uuid' // key we want to remove
    )
  }
};
