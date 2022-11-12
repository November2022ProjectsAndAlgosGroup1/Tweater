const { Like, User, Tweat } = require('../models/all.model')

module.exports = {
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

    //TODO: Test this method - Deletes the like, removes the like from the associates User's Likes, removes the Like from the associated Tweat   
    removeLike: async (req, res) => {
        const likeID = req.params.id 
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

        //Method removes the Like from the likes collection but does not remove the like from the User or from the Tweat
        // Like.deleteOne({ _id: req.params.id })
        //     .then(result => res.json(result))
        //     .catch((error) => res.status(400).json(error))
    },

    //I don't think this method is necessary
    // findLike: (req, res) => {
    //     Like.findOne({ _id: req.params.id })
    //         .then(oneLike => res.json(oneLike))
    //         .catch((error) => res.status(400).json(error))
    // },

    //I don't think this method is necessary
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