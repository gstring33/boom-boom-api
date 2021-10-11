const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const homeRouter = require('./routes/home')
const mysql = require('mysql');
const migration = require('mysql-migrations');
require('dotenv').config()

const connection = mysql.createPool({
    connectionLimit : 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

migration.init(connection, __dirname + '/migrations', function() {
    console.log("finished running migrations");
});

app.use(express.json())
app.use(homeRouter)

app.listen(port)

console.log('Boom boom kdo API')