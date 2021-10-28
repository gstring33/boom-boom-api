const CryptoJS = require('crypto-js')
const secret = require('../config/cryptojs.config').secret

exports.match = (password1, password2) => {
    return password1 === password2
}

exports.encrypt = (password) => {
    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), secret).toString();
}

exports.decrypt = (password) => {
    const bytes  = CryptoJS.AES.decrypt(password, secret);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8)).toString();
}
