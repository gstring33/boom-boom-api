module.exports = (router, bodyParser) => {
    const event = require("../../src/controllers/event.controllers");
    const jsonParser = bodyParser.json()
    const auth = require("../../src/middlewares/auth")

    // Create a new Event
    router.use("/event", jsonParser, auth)
    router.post("/event", jsonParser, event.create);

    // Retrieve all Events
    router.use("/events", jsonParser, auth)
    router.get("/events", event.findAll);

    // Retrieve a single Event with id
    router.use("/event/:id", jsonParser, auth)
    router.get("/event/:id", event.findOneById);

    // Update a Event with id
    router.put("/event/:id", jsonParser, event.update);

    // Delete an Event
    router.delete("/event/:id", event.deleteOne);
};