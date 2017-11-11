export default (sequelize, DataTypes)  => {
  var votes = sequelize.define('votes', {
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'recipes',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    upVotes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    downVotes: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  
  votes.associate = (models) => {
    votes.belongsTo(models.recipes, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    
    votes.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return votes;
};