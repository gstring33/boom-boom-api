require('dotenv').config()

module.exports = {
    secret: process.env.ENCRYPT_SECRET_KEY,
    algorithm: 'sha256'
}