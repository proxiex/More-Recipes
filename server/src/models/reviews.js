export default (sequelize, DataTypes) => {
  const reviews = sequelize.define('reviews', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  reviews.associate = (models) => {
    reviews.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    reviews.belongsTo(models.recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
  };
  return reviews;
};
