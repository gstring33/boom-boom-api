require('dotenv').config()
const sequelizeConfig = require('../config/sequelize.config')
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
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

db.user = require("./user.model.js")(sequelize, Sequelize);

module.exports = db;