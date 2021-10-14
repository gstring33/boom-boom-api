const express = require('express')
const app = express()

const db = require('./models')
db.sequelize.sync()

const router = require('./router')
app.use('/api', router)

const port = process.env.PORT || 3000
app.listen(port)

console.log('Boom boom kdo API')