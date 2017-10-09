export default (sequelize, DataTypes) => {
  const views = sequelize.define('views', {
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  views.associate = (models) => {
    views.belongsTo(models.recipes, {
      foreignKey: 'recipeId'
    });
  };
  return views;
};