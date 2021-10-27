module.exports = (router, bodyParser) => {
    const event = require("../../controllers/event.controllers");
    const jsonParser = bodyParser.json()

    // Create a new Event
    router.post("/event", jsonParser, event.create);

    // Retrieve all Events
    router.get("/events", event.findAll);

    // Retrieve a single Event with id
    router.get("/event/:id", event.findOneById);

    // Update a Event with id
    router.put("/event/:id", jsonParser, event.update);

    // Delete an Event
    //router.delete("/event/:id", event.deleteOne);
};