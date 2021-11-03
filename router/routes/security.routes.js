module.exports = (router, bodyParser) => {
    const security = require("../../src/controllers/security.controllers");
    const jsonParser = bodyParser.json()

    router.post('/register', jsonParser, security.register)

    router.post('/login', jsonParser, security.login)

    router.post('/logout', security.logout)
}