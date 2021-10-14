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
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'ROLE_USER',
            validate: {
                isIn: [securityConfig.roles],
            }
        },
        is_active: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                isInt: true,
                min: 0,
                max: 1
            }
        },
        allowed_to_choose: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                isInt: true,
                min: 0,
                max: 1
            }
        },
        last_connect: {
            type: Sequelize.DATE,
            allowNull: true
        },
    });

    return User;
};