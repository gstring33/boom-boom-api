const db = require("../../db/models");
const User = db.User;
const Event = db.Events;
const sequelizeConfig = require('../../config/sequelize.config')

// Create and Save a new Event
// Method:POST, Endpoint:/event
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty",
        });
        return;
    }

    // Save Event in the database
    const { userId, name, location, eventAt } = req.body
    const event = { name, location, eventAt };

    User.findOne({
        where: { id: userId },
    }).then(data => {
        if (data == null) {
            res.status(400).send({
                message: "Content invalid"
            })

            return;
        }
        Event.create(event)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Event."
                });
            });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "The event can not be created"
        });
    });
};

// Retrieve all  Events
// Method: GET, Endpoint:/events
exports.findAll = (req, res) => {
    Event.findAll({
        attributes: sequelizeConfig.attributes.event,
        include: {
            model: User,
            attributes: ["firstname", "lastname", "eventAt"]
        }
    })
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while getting all the User."
            });
    });
}

// Retrieve one Event by ID
// Method: GET, Endpoint::/event/:id
exports.findOneById = (req, res) => {
    Event.findOne({
        where: { id: req.params.id },
        include: {
            model: User,
            attributes: ["firstname", "lastname"]
        },
        attributes: sequelizeConfig.attributes.event
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while getting Event with id."
        });
    });
}

// Update an Event by the id in the request
// Method:PUT, Endpoint:/event/:id
exports.update = (req, res) => {
    const { location, name} = req.body
    const event = { location, name };

    Event.update(
        event,
        {returning: true, where: { id: req.params.id }}
    ).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while updating the Event."
        });
    });
};

// Delete one event
// Method:DELETE, Endpoint:/event/:id
exports.deleteOne = (req, res) => {
    Event.destroy({
        where: {id: req.params.id}
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while deleting the Event."
        });
    });
}