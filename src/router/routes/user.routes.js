module.exports = (router, bodyParser) => {
    const user = require("../../controllers/user.controllers");
    const jsonParser = bodyParser.json()

    // Create a new User
    router.post("/user", jsonParser, user.create);

    // Retrieve all Users
    router.get("/users", user.findAll);

    // Retrieve a single User with id
    router.get("/user/:id", user.findOneById);

    // Update a User with id
    router.put("/user/:id", jsonParser, user.update);

    // Delete a user
    router.delete("/user/:id", user.deleteOne);
};