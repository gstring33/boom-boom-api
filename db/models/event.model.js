module.exports = (sequelize, Sequelize) => {
    return sequelize.define("event", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
};