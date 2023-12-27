'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roles', [
      {
        value: 'USER',
        description: 'Regular user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        value: 'ADMIN',
        description: 'Administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
