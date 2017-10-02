'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
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
      allowNull: false,
    /*   validate: {
        len: []
      } */
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