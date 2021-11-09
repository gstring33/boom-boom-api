const db = require("../../db/models");
const User = db.User;
const Event = db.Events;
const sequelizeConfig = require('../../config/sequelize.config')
const { parse, stringify } = require('uuid')

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
    const uuid = stringify(parse(userId))

    User.findOne({
        where: { uuid: uuid },
    }).then(user => {
        if (user == null) {
            res.status(400).send({
                message: "Content invalid"
            })

            return;
        }
        const event = { name, location, eventAt, userId: user.id };

        Event.create(event)
            .then(event => {
                const eventData = {
                    name: event.name,
                    location: event.location,
                    eventAt: event.eventAt,
                }
                res.send(eventData);
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
            as: 'createdBy',
            attributes: ["uuid","firstname", "lastname"]
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
            as: 'createdBy',
            attributes: ["uuid", "firstname", "lastname"]
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
    if (!req.isAdmin) {
        res.status(403).send({
            message: "Forbidden",
        });
        return;
    }

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