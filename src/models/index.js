require('dotenv').config()
const sequelizeConfig = require('../config/sequelize.config')
const databaseConfig = require('../config/database.config')
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    databaseConfig.name,
    databaseConfig.user,
    databaseConfig.password, {
        host: databaseConfig.host  ,
        dialect: sequelizeConfig.dialect,
        operatorsAliases: sequelizeConfig.operatorsAliases,
        pool: {
            max: sequelizeConfig.pool.max,
            min: sequelizeConfig.pool.min,
            acquire: sequelizeConfig.pool.acquire,
            idle: sequelizeConfig.pool.idle
        }
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const user = require("./user.model.js")(sequelize, Sequelize)
const event = require("./event.model.js")(sequelize, Sequelize)

user.hasMany(event)
event.belongsTo(user)

db.user = user;
db.event = event;

module.exports = db;