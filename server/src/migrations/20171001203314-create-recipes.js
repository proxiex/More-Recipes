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
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
          as: 'userId'
        }
      },
      recipeImage: {
        type: Sequelize.STRING,
        allowNull: false
      },
      recipeName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mealType: {
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
        allowNull: false,
        defaultValue: 0
      },
      downVotes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      views: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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