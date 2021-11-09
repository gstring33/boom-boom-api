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

    if (!req.isAdmin) {
        res.status(403).send({
            message: "Forbidden",
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
    if (!req.isAdmin) {
        res.status(403).send({
            message: "Forbidden",
        });
        return;
    }
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
    if (!req.isAdmin) {
        res.status(403).send({
            message: "Forbidden",
        });
        return;
    }
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
exports.update = async (req, res) => {
    const currentUser = await  User.findOne({
        where: { id: req.user.id }
    })

    if (!req.isAdmin && currentUser.uuid !== req.params.id) {
        res.status(403).send({
            message: "Forbidden",
        });
        return;
    }

    const { firstname, lastname, isActive, email, roles } = req.body

    const user = req.isAdmin ?
        { firstname, lastname, isActive, email, roles } :
        { firstname, lastname, email }

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
    if (!req.isAdmin) {
        res.status(403).send({
            message: "Forbidden",
        });
        return;
    }

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