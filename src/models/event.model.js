module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("event", {
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

    return Event;
};