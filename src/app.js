const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const homeRouter = require('./routes/home')

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(homeRouter)

const db = require('./models')
db.sequelize.sync()

app.listen(port)

console.log('Boom boom kdo API')