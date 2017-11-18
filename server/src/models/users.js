export default (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    avatar: {
      type: DataTypes.STRING
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Invalid Email Address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    inAppNotice: {
      type: DataTypes.INTEGER
    },
    emailNotice: {
      type: DataTypes.INTEGER
    }

  });  

  users.associate = (models) => {
    users.hasMany(models.reviews, {
      foreignKey: 'userId'
    });
  };

  users.associate = (models) => {
    users.hasMany(models.votes, {
      foreignKey: 'userId'
    });
  };
 
  users.associate = (models) => {
    users.hasMany(models.favorites, {
      foreignKey: 'userId'
    });
  };

  users.associate = (models) => {
    users.hasMany(models.views, {
      foreignKey: 'userId'
    });
  };
 
  users.associate = (models) => {
    users.hasMany(models.recipes, {
      foreignKey: 'userId'
    });
  };
  return users;
};