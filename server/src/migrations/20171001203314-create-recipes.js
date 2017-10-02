'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
          as: 'userId'
        }
      },
      recipeName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      meanType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      method: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      ingredients: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      upVotes: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      downVotes: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),

  down: (queryInterface) => queryInterface.dropTable('recipes')
};