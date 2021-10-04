const express = require('express')
const router = express.Router()

router.get('/', async(req, res) => {
    return res.send('Boom boom kdo API')
})

module.exports = router