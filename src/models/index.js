require('dotenv').config()
const sequelizeConfig = require('../config/sequelize.config')
const securityConfig = require('../config/security.config')
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    securityConfig.database.name,
    securityConfig.database.user,
    securityConfig.database.password, {
        host: securityConfig.database.host  ,
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