const LikeController = require("../controllers/like.controller")
const { addLike, removeLike } = LikeController //findAllLikes, findLike,

const ReplyController = require("../controllers/reply.controller")
const { findAllReplies, findReply, addReply, updateReply, deleteReply } =
    ReplyController

const TweatController = require("../controllers/tweat.controller")
const {
    addTweat,
    findTweat,
    findAllTweats,
    updateTweat,
    deleteTweat,
    retweat,
} = TweatController

const UserController = require("../controllers/user.controller")
const {
    deleteUser,
    findUser,
    findAllUsers,
    registerUser,
    updateUser,
    loginUser,
    logoutUser,
} = UserController

// TODO: where are we using the authentication function?
const { authenticate } = require("../config/jwt.config")

module.exports = (app) => {
    //like routes
    // app.get('/api/likes/', findAllLikes) //finds all likes
    // app.get('/api/likes/:id', findLike) //finds a single Like
    app.post("/api/likes/", addLike) //adds a Like to database
    app.delete("/api/likes/:id", removeLike) //removes a single Like

    //reply routes
    app.get("/api/replies/", findAllReplies) //finds all Replies
    app.get("/api/replies/:id", findReply) //finds a single Reply
    app.post("/api/replies/", addReply) //adds a Reply to database
    app.put("/api/replies/:id", updateReply) //updates a single Reply
    app.delete("/api/replies/:id", deleteReply) //updates a single Reply

    //tweat routes
    app.post("/api/tweats/", addTweat) //adds a tweat to database
    app.get("/api/tweats/:id", findTweat) //finds a single tweat
    app.get("/api/tweats/", findAllTweats) //finds all tweats
    app.put("/api/tweats/:id", updateTweat) //updates a single tweat
    app.delete("/api/tweats/:id", deleteTweat) //updates a single tweat
    // /*need controller for retweat */ app.post('/api/tweats/:id', retweat)

    //user routes
    app.get("/api/users/", findAllUsers) //finds all users
    app.get("/api/users/:id", findUser) //finds a single user
    // app.post("/api/users/", registerUser); //adds a user to database
    app.put("/api/users/:id", updateUser) //updates a single user
    app.delete("/api/users/:id", deleteUser) //updates a single user
    app.post("/api/users/login", loginUser) //logs a user in
    app.post("/api/users/logout", logoutUser) //logs a user out
    app.post("/api/users/register", registerUser) //register a user
}
