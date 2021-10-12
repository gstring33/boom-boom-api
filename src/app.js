const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const homeRouter = require('./routes/home')

app.use(express.json())
app.use(homeRouter)

app.listen(port)

console.log('Boom boom kdo API')