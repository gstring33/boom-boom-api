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

        // Encrypt user password
        const passwordService = require('../services/password.services')
        const encryptedPassword = await passwordService.encrypt(password);

        // Create user in our database
        const user = { firstname, lastname, isActive: 0, isChoiceAllowed: 0, email, password: encryptedPassword, roles: securityConfig.defaultRole }
        User.create(user)
            .then(async user => {
                // Create token
                user.token = jwt.sign(
                    { id: user.id, email, roles: user.roles },
                    jwtConfig.tokenSecretKey,
                    {
                        expiresIn: jwtConfig.expiresIn,
                    }
                );
                // save user token
                await user.save()

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

// Login
// Method:POST, Endpoint:/login
exports.login = async (req, res) => {
    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        await User.findOne({
            where: { email: email }
        }).then(async user => {
            // Encrypt user password
            const passwordService = require('../services/password.services')
            const decryptedPassword = await passwordService.decrypt(user.password);
            console.log(decryptedPassword)

            if (user && (decryptedPassword == password)) {
                // Create token
                user.token = jwt.sign(
                    { id: user.id, email, roles: user.roles },
                    jwtConfig.tokenSecretKey,
                    {
                        expiresIn: jwtConfig.expiresIn,
                    }
                );

                // save user token
                user.lastConnectionAt = Date.now()
                await user.save()

                // user
                res.status(200).send({
                    login: true,
                    token: user.token
                });

                return;
            }

            res.status(400).send({message: "Invalid credentials"});
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred during the login"
            });
        });
    } catch (err) {
        console.log(err);
    }
}

exports.logout = (req, res) => {

}