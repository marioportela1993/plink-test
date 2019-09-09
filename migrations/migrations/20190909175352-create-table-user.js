'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      preferred_currency: {
        // eslint-disable-next-line new-cap
        type: Sequelize.ENUM(['COP', 'USD', 'EUR']),
        allowNull: false
      },
      updated_at: Sequelize.DATE,
      created_at: Sequelize.DATE
    }),
  down: queryInterface => queryInterface.dropTable('users')
};
