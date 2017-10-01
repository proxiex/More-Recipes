'use strict';
module.exports = (sequelize, DataTypes) =>  {
  const recipes = sequelize.define('recipes', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    meanType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    method: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    upVotes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    downVotes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });

  recipes.associate = (models) => {
    recipes.hasMany(models.reviews, {
      foreignKey: 'recipeId'
    });
  };

  recipes.associate = (models) => {
    recipes.hasMany(models.favorites, {
      foreignKey: 'recipeId'
    });
  };

  recipes.associate = (models) => {
    recipes.hasMany(models.views, {
      foreignKey: 'recipeId'
    });
  };

  recipes.associate = (models) => {
    recipes.belongsTo(models.users, {
      foreignKey: 'userId'
    });
  };

  return recipes;
};