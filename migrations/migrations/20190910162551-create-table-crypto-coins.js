'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('crypto_coins', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      coin_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      coin_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      source: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      updated_at: Sequelize.DATE,
      created_at: Sequelize.DATE
    }),
  down: queryInterface => queryInterface.dropTable('crypto_coins')
};
