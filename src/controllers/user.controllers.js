const db = require("../../db/models");
const sequelizeConfig = require('../../config/sequelize.config')
const User = db.User;
const { v4 } = require('uuid')

// Create and Save a new User
// Method:POST, Endpoint:/user
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty",
        });
        return;
    }
    const { firstname, lastname, password, password2, email, roles } = req.body

    const passwordService = require('../services/password.services')
    if (!passwordService.match(password, password2)) {
        res.status(400).send({
            message: "Password do not match",
        });
        return;
    }
    const encryptedPassword = passwordService.encrypt(password)

    // Save User in the database
    const uuid = v4()
    console.log(uuid)
    const user = { uuid: uuid, firstname, lastname, isActive: 0, isChoiceAllowed: 0, email, password: encryptedPassword, roles }

    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

// Retrieve all users
// Method:GET, Endpoint:/users
exports.findAll = (req, res) => {
    User.findAll({
        attributes: sequelizeConfig.attributes.user
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while getting all the User."
        });
    });
};

// Retrieve one user from uuid
// Method:GET, Endpoint:/user/:uuid
exports.findOneById = (req, res) => {
    User.findOne({
        where: { uuid: req.params.id },
        attributes: sequelizeConfig.attributes.user
    }).then(data => {
        res.send(data);
    }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while getting User with id."
            });
        });
};

// Update a User by the id in the request
// Method:PUT, Endpoint:/user/:uuid
exports.update = (req, res) => {
    const { firstname, lastname, isActive, email, roles } = req.body
    const user = { firstname, lastname, isActive, email, roles }

    User.update(
        user,
        {returning: true, where: { uuid: req.params.id }}
    ).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while updating the User."
        });
    });
};

// Delete a User with the specified id in the request
// Method:DELETE, Endpoint:/user/:uuid
exports.deleteOne = (req, res) => {
    User.destroy({
        where: {uuid: req.params.id}
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while deleting the User."
        });
    });
};