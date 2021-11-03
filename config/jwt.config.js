require('dotenv').config()

module.exports = {
    tokenSecretKey: process.env.TOKEN_SECRET_KEY,
    expiresIn: '2h'
}