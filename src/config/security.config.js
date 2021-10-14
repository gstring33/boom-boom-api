require('dotenv').config()

module.exports = {
    roles: ['ROLE_ADMIN', 'ROLE_USER'],
    crypto: {
        secret: process.env.SECRET_KEY,
        algorithm: 'sha256'
    }
}