module.exports = (sequelize, Sequelize) => {
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
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        roles: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'ROLE_USER'
        },
        is_active: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        allowed_to_choose: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        last_connect: {
            type: Sequelize.DATE,
            allowNull: true
        },
    });

    return User;
};