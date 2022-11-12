const { User, Tweat, Like, Reply } = require('../models/all.model')

module.exports = {
    //adds user to database
    registerUser: (req, res) => {
        User.create(req.body)
            .then((result) => res.json(result))
            .catch((error) => res.status(400).json(error))
    },

    //finds a single user in the database
    findUser: (req, res) => {
        User.findOne({ _id: req.params.id })
            .populate('tweats')
            .populate('replies')
            .populate('likes')
            .then((oneUser) => res.json(oneUser))
            .catch((error) => res.status(400).json(error))
    },

    //finds all users in the database
    findAllUsers: (req, res) => {
        User.find()
            // .populate('tweat', 'reply', 'like') //is this needed in this function?
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

    //TODO: This method will not remove the subdocuments associated with the parent from the db
    // removes a single user from the database
    // deleteUser: (req, res) => {
    //     User.deleteOne({ _id: req.params.id })
    //         .then(result => res.json(result))
    //         .catch((error) => res.status(400).json(error))
    // },

    //TODO: Test this method
    //deletes a single user and all of the user's tweats, likes, and replies from the db
    deleteUser : async (req, res) => {
        const userID = req.params.id
        try {
            //delete all user tweats
            const userTweats = await Tweat.deleteMany({userID: userID})
            //delete all user likes
            const userLikes = await Like.deleteMany({userID: userID})
            //delete all user replies
            const userReplies = await Reply.deleteMany({userID: userID})
            //delete the user
            await User.findByIdAndDelete(userID)
            res.json({successMessage: "User deleted", deletedUserID: userID})
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    }
}