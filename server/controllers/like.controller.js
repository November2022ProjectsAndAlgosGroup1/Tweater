const { Like } = require('../models/like.model')
const { User } = require('../models/user.model')
const { Tweat } = require('../models/tweat.model')

module.exports = {

    //Adds a like to the database and adds the like's ID to the user's like array and tweat's like array
    addLike: async (req, res) => {
        try {
            const newLike = await Like.create(req.body)
            const updatedUserWithLike = await User.findOneAndUpdate(
                { _id: newLike.userID },
                { $push: { likes: newLike._id } },
                { new: true }
            )
            const updatedTweatWithLike = await Tweat.findOneAndUpdate(
                { _id: newLike.tweatID },
                { $push: { likes: newLike._id } },
                { new: true }
            )
            res.status(200).json({ updatedTweatObj: updatedTweatWithLike, updatedUserObj: updatedUserWithLike })
        }
        catch (error) {
            res.status(400).json(error)
        }
    },

    //Deletes the like, removes the like from the associates User's Likes, removes the Like from the associated Tweat   
    removeLike: async (req, res) => {
        try {
            //Delete the like from the Likes collection
            const deletedLike = await Like.findOneAndRemove({ _id: req.params.id })
            //Update the User to remove the like
            const updatedUser = await User.findOneAndUpdate(
                { _id: deletedLike.userID },
                { $pull: { likes: deletedLike._id } }
            )
            //Update the associated Tweat to remove the like
            const updatedTweat = await Tweat.findOneAndUpdate(
                { _id: deletedLike.tweatID },
                { $pull: { likes: deletedLike._id } }
            )
            res.status(200).json({ deletedLike: deletedLike, updatedTweat: updatedTweat, updatedUser: updatedUser })
        }
        catch (error) {
            res.status(400).json(error)
        }
    },

    //I don't think this method is necessary - JG
    //Agreed, commented it out just in case we decide we need it - SC
    // findLike: (req, res) => {
    //     Like.findOne({ _id: req.params.id })
    //         .then(oneLike => res.json(oneLike))
    //         .catch((error) => res.status(400).json(error))
    // },

    //I don't think this method is necessary - JG
    //Agreed, commented it out just in case we decide we need it - SC
    // findAllLikes: (req, res) => {
    //     Like.find()
    //         .then(allLikes => {
    //             console.log(allLikes)
    //             res.json(allLikes)
    //         })
    //         .catch((error) => {
    //             console.log('failed to find all Likes')
    //             res.status(400).json(error)
    //         })
    // },

}