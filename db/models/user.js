'use strict';
const {
  Model
} = require('sequelize');
const securityConfig = require('../../config/security.config')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Events)
    }
  };
  User.init({
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5,100]
      }
    },
    roles: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: JSON.parse('["ROLE_USER"]'),
      validate: {
        areRolesValid(value) {
          const isValidRole = (currentValue) => {
            return securityConfig.roles.find((element) => element === currentValue)

          }
          if (!value.every(isValidRole)) {
            throw new Error("Roles can not be stored")
          }
        },
      }
    },
    isActive: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0,
        max: 1
      }
    },
    isChoiceAllowed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0,
        max: 1
      }
    },
    lastConnectionAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};