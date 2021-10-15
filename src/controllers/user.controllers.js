const db = require("../models");
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
    if (!passwordService.validate(req.body.password, req.body.password2)) {
        res.status(400).send({
            message: "Password do not match",
        });
        return;
    }

    //TODO:
    // hash password,
    // format roles to json,
    // use camelcase for is_active and last_connect + adjust it into user model

    // Create a User
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
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
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {

};

// Find a single User with an id
exports.findOneById = (req, res) => {

};

// Update a User by the id in the request
exports.update = (req, res) => {

};

// Delete a User with the specified id in the request
exports.deleteOne = (req, res) => {

};