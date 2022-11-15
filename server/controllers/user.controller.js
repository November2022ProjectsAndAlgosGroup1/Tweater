const { Tweat, Like, User, Reply } = require("../models/all.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY;

module.exports = {
  //adds user to database
  registerUser: async (req, res) => {
    try {
      //Create New User
      const newUser = await User.create(req.body);
      // create a JWT using our secret key
      const userToken = jwt.sign(
        {
          _id: newUser._id,
          email: newUser.email,
        },
        SECRET
      );
      // return a response(JWT) to the user as a cookie
      res
        .status(201)
        .cookie("userToken", userToken, {
          httpOnly: true,
          expires: new Date(Date.now() + 90000),
        })
        .json({
          successMessage: "congratulation you logged in",
          user: newUser,
        });
      console.log("success");
    } catch (error) {
      res.status(400).json(error);
    }
  },

  //finds a single user in the database
  findUser: (req, res) => {
    User.findOne({ _id: req.params.id })
      .populate("tweats") //extends the user object to include the actual tweat objects
      .populate("replies") //extends the user object to include the actual reply objects
      .populate("likes") //extends the user object to include the actual like objects
      .then((oneUser) => res.json(oneUser))
      .catch((error) => res.status(400).json(error));
  },

  //finds all users in the database
  findAllUsers: (req, res) => {
    User.find()
      .then((allUsers) => {
        console.log(allUsers);
        res.json(allUsers);
      })
      .catch((error) => {
        console.log("failed to find all users");
        res.status(400).json(error);
      });
  },

  //updates a single user in the database
  updateUser: (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updatedUser) => res.json(updatedUser))
      .catch((error) => res.status(400).json(error));
  },

  //deletes a single user and all of the user's tweats, likes, and replies from the db
  deleteUser: async (req, res) => {
    const userID = req.params.id;
    try {
      //delete all user tweats
      const userTweats = await Tweat.deleteMany({ userID: userID });
      //delete all user likes
      const userLikes = await Like.deleteMany({ userID: userID });
      //delete all user replies
      const userReplies = await Reply.deleteMany({ userID: userID });
      //delete the user
      await User.findByIdAndDelete(userID);
      res.json({ successMessage: "User deleted", deletedUserID: userID });
    } catch (err) {
      console.log(error);
      res.status(400).json(error);
    }
  },

  //Logs user in using cookies
  loginUser: async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({ error: "Invalid email/password" });
    }
    try {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      console.log(isPasswordValid);
      if (!isPasswordValid) {
        res.status(400).json({ error: "Invalid email/password" });
      } else {
        const userToken = jwt.sign(
          { _id: user._id, email: user.email },
          SECRET
        );
        res
          .status(201)
          .cookie("userToken", userToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 90000),
          })
          .json({ successMessage: "User logged in", user: user });
      }
    } catch (error) {
      res.status(400).json({ error: "Invalid email/password" });
    }
  },

  //Logs user out by clearing cookies
  logoutUser: (req, res) => {
    res.clearCookie("userToken");
    res.json({ success: "User logged out" });
  },
};
