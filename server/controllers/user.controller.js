const { User } = require('../models/all.model')

module.exports = {
    //adds user to database
    registerUser: (req, res) => {
        User.create(req.body)
            .then((result) => res.json(result))
            .catch((error) => res.status(400).json(error))
    },

    //finds a single user in the database
    findUser: async (req, res) => {
        User.findOne({ _id: req.params.id })
            .populate('tweats')
            .populate('replies')
            .populate('likes')
            .then((oneUser) => res.json(oneUser))
            .catch((error) => res.status(400).json(error))
    },

    //finds all users in the database
    findAllUsers: async (req, res) => {
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
    updateUser: async (req, res) => {
        User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then(updatedUser => res.json(updatedUser))
            .catch((error) => res.status(400).json(error))
    },

    //removes a single user from the database
    deleteUser: async (req, res) => {
        User.deleteOne({ _id: req.params.id })
            .then(result => res.json(result))
            .catch((error) => res.status(400).json(error))
    },
}