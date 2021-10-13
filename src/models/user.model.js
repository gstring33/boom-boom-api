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
            type: Sequelize.INT
        },
        allowed_to_choose: {
            type: Sequelize.INT
        },
        last_connect: {
            type: Sequelize.DATETIME
        },
    });

    return User;
};