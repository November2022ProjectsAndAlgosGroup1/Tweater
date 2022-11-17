const UserController = require("../controllers/user.controller");
const {
    deleteUser,
    findUser,
    findAllUsers,
    registerUser,
    updateUser,
    loginUser,
    getLoggedUser,
    logoutUser,
} = UserController;
// TODO: where are we using the authentication function?
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
//user routes
app.get("/api/users/getLoggedUser", getLoggedUser); //get a user by id
app.post("/api/users/register", registerUser); //register a user
app.post("/api/users/login", loginUser); //logs a user in
app.get("/api/users/logout", logoutUser); //logs a user out
app.get("/api/users/", findAllUsers); //finds all users
app.get("/api/users/:id", findUser); //finds a single user
app.put("/api/users/:id", updateUser); //updates a single user
app.delete("/api/users/:id", deleteUser); //updates a single user
}