'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('tutorials', 'img');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('tutorials', 'img', Sequelize.STRING);
  }
};
