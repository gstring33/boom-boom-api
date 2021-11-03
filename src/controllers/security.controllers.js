const securityConfig = require("../../config/security.config");
const jwtConfig = require("../../config/jwt.config");
const db = require("../../db/models");
const User = db.User;
const jwt = require('jsonwebtoken')

// Register new User
// Method:POST, Endpoint:/register
exports.register = async (req, res) => {
    // Our register logic starts here
    try {
        // Get user input
        const { firstname, lastname, email, password } = req.body;

        // Validate user input
        if (!(email && password && firstname && lastname)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const currentUser = await User.findOne({
            where: { email: email }
        });

        if (currentUser) {
            return res.status(409).send("Problem with registration");
        }

        //Encrypt user password
        const passwordService = require('../services/password.services')
        const encryptedPassword = await passwordService.encrypt(password);

        // Create user in our database
        const user = { firstname, lastname, isActive: 0, isChoiceAllowed: 0, email, password: encryptedPassword, roles: securityConfig.defaultRole }
        await User.create(user)
            .then(user => {
                // Create token
                user.token = jwt.sign(
                    { user_id: user.id, email },
                    jwtConfig.tokenSecretKey,
                    {
                        expiresIn: jwtConfig.expiresIn,
                    }
                );
                // save user token
                user.save()

                // return new user
                res.status(201).send(user);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred during the registration."
                });
            });

    } catch (err) {
        console.log(err);
    }
}

exports.login = (req, res) => {

}

exports.logout = (req, res) => {

}