const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const homeRouter = require('./routes/home')
require('./routes/user.routes')(app)

app.use(homeRouter)

const db = require('./models')
db.sequelize.sync()

app.listen(port)

console.log('Boom boom kdo API')