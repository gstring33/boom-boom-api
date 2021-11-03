const router = require("express").Router();
const bodyParser = require('body-parser');

require('./routes/user.routes')(router, bodyParser)
require('./routes/event.routes')(router, bodyParser)
require('./routes/home.routes')(router)
require('./routes/security.routes')(router, bodyParser)

module.exports = router