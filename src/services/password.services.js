const CryptoJS = require('crypto-js')
const secret = require('../config/security.config').crypto.secret

exports.validate = (password1, password2) => {
    return password1 === password2
}

exports.encrypt = (password) => {
    return CryptoJS.AES.encrypt(password, secret).toString();
}

exports.decrypt = (password) => {
    const bytes  = CryptoJS.AES.decrypt(password, secret);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8)).toString();
}
