require('dotenv').config()

module.exports = {
    roles: ['ROLE_ADMIN', 'ROLE_USER'],
    database: {
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
    },
    crypto: {
        secret: process.env.SECRET_KEY,
        algorithm: 'sha256'
    }
}