const db = require("../models");
const sequelizeConfig = require('../config/sequelize.config')
const User = db.user;
const Op = db.Sequelize.Op;

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

    const passwordService = require('../services/password.services')
    if (!passwordService.match(req.body.password, req.body.password2)) {
        res.status(400).send({
            message: "Password do not match",
        });
        return;
    }

    const encryptedPassword = passwordService.encrypt(req.body.password)

    // Create a User
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: encryptedPassword,
        roles: req.body.roles,
    };

    // Save User in the database
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
        attributes: sequelizeConfig.models.user.attributes
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while getting all the User."
        });
    });
};

// Retrieve one user from id
// Method:GET, Endpoint:/user/:id
exports.findOneById = (req, res) => {
    User.findOne({
        where: { id: req.params.id },
        attributes: sequelizeConfig.models.user.attributes
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
// Method:PUT, Endpoint:/user/:id
exports.update = (req, res) => {
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        isActive: req.body.isActive,
        email: req.body.email,
        roles: req.body.roles
    };

    User.update(
        user,
        {returning: true, where: { id: req.params.id }}
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
// Method:DELETE, Endpoint:/user/:id
exports.deleteOne = (req, res) => {
    User.destroy({
        where: {id: req.params.id}
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while deleting the User."
        });
    });
};