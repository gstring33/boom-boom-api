module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        roles: {
            type: Sequelize.STRING
        },
        is_active: {
            type: Sequelize.INTEGER
        },
        allowed_to_choose: {
            type: Sequelize.INTEGER
        },
        last_connect: {
            type: Sequelize.DATE
        },
    });

    return User;
};