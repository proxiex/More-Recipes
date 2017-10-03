'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorites = sequelize.define('favorites', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  favorites.associate = (models) => {
    favorites.belongsTo(models.recipes, {
      foreignKey: 'recipeId'
    });

    favorites.belongsTo(models.users, {
      foreignKey: 'userId'
    });
  };


  return favorites;
};

//favorites