module.exports = (router, bodyParser) => {
    const user = require("../../src/controllers/user.controllers");
    const auth = require("../../src/middlewares/auth")
    const jsonParser = bodyParser.json()

    // Create a new User
    router.use("/user", jsonParser, auth)
    router.post("/user", jsonParser, user.create);

    // Retrieve all Users
    router.use("/users", jsonParser, auth)
    router.get("/users", user.findAll);

    // Retrieve a single User with id
    router.use("/user/:id", jsonParser, auth)
    router.get("/user/:id", user.findOneById);

    // Update a User with id
    router.put("/user/:id", jsonParser, user.update);

    // Delete a user
    router.delete("/user/:id", user.deleteOne);
};