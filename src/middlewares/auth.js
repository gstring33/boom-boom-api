const jwt = require("jsonwebtoken");
const jwtConfig = require('../../config/jwt.config')

const verifyToken = (req, res, next) => {
    const {token} = req.body
    if (!token) {
        return res.status(403).send({ message: "A token is required for authentication"})
    }

    try {
        const decoded = jwt.verify(token, jwtConfig.tokenSecretKey);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;