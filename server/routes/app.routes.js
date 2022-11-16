const LikeController = require("../controllers/like.controller");
const { addLike, removeLike } = LikeController; //findAllLikes, findLike,

const ReplyController = require("../controllers/reply.controller");
const { findAllReplies, findReply, addReply, updateReply, deleteReply } =
  ReplyController;

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

const YelpController = require("../controllers/yelp.controller");
const { getNearbyRestaurants } = YelpController;

module.exports = (app) => {
  //like routes
  // app.get('/api/likes/', findAllLikes) //finds all likes
  // app.get('/api/likes/:id', findLike) //finds a single Like
  app.post("/api/likes/", addLike); //adds a Like to database
  app.delete("/api/likes/:id", removeLike); //removes a single Like

  //reply routes
  app.get("/api/replies/", findAllReplies); //finds all Replies
  app.get("/api/replies/:id", findReply); //finds a single Reply
  app.post("/api/replies/", addReply); //adds a Reply to database
  app.put("/api/replies/:id", updateReply); //updates a single Reply
  app.delete("/api/replies/:id", deleteReply); //updates a single Reply

  //yelp routes
  app.post("/api/yelp/", getNearbyRestaurants); //finds nearby restaurants
};
