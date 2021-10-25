const db = require("../models");
const User = db.user;
const Event = db.event;

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
    const { userId, name, location } = req.body
    const event = { userId, name, location };

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