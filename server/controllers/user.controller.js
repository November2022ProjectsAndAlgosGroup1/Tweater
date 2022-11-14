const { User, Tweat, Like, Reply } = require('../models/all.model')

module.exports = {
    //adds user to database
    registerUser: async (req, res) => {
        try {
            //Create New User
            const newUser = await User.create(req.body)
            res.status(200).json({ newUser: newUser })
        } catch (error) {
            res.status(400).json(error)
        }
    },

    //finds a single user in the database
    findUser: (req, res) => {
        User.findOne({ _id: req.params.id })
            .populate('tweats') //extends the user object to include the actual tweat objects
            .populate('replies') //extends the user object to include the actual reply objects
            .populate('likes') //extends the user object to include the actual like objects
            .then((oneUser) => res.json(oneUser))
            .catch((error) => res.status(400).json(error))
    },

    //finds all users in the database
    findAllUsers: (req, res) => {
        User.find()
            .then(allUsers => {
                console.log(allUsers)
                res.json(allUsers)
            })
            .catch((error) => {
                console.log('failed to find all users')
                res.status(400).json(error)
            })
    },

    //updates a single user in the database
    updateUser: (req, res) => {
        User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then(updatedUser => res.json(updatedUser))
            .catch((error) => res.status(400).json(error))
    },

    //deletes a single user and all of the user's tweats, likes, and replies from the db
    deleteUser: async (req, res) => {
        const userID = req.params.id
        try {
            //delete all user tweats
            const userTweats = await Tweat.deleteMany({ userID: userID })
            //delete all user likes
            const userLikes = await Like.deleteMany({ userID: userID })
            //delete all user replies
            const userReplies = await Reply.deleteMany({ userID: userID })
            //delete the user
            await User.findByIdAndDelete(userID)
            res.json({ successMessage: "User deleted", deletedUserID: userID })
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    }
}