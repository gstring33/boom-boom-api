const security = require("../../src/controllers/security.controllers");

module.exports = router => {
    router.get('/register', security.register)

    router.get('/login', security.login)

    router.get('/logout', security.logout)
}