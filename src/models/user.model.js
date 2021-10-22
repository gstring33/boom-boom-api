module.exports = (sequelize, Sequelize) => {
    const securityConfig = require('../config/security.config')

    const User = sequelize.define("user", {
        firstname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [5,100]
            }
        },
        roles: {
            type: Sequelize.JSON,
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
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 0,
                max: 1
            }
        },
        isChoiceAllowed: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                min: 0,
                max: 1
            }
        },
        lastConnectionAt: {
            type: Sequelize.DATE,
            allowNull: true
        },
    });

    return User;
};