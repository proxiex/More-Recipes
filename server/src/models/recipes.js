export default (sequelize, DataTypes) =>  {
  const recipes = sequelize.define('recipes', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    recipeImage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    upVotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    downVotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
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
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return recipes;
};