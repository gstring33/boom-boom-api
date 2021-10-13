const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

// Create and Save a new User
// Method:POST, Endpoint:/user
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.email,
        roles: req.body.roles,
        is_active: 0,
        allowed_to_choose: 0,
        last_connect: new Date()
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