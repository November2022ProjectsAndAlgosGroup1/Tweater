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

    findLike: async (req, res) => {
        Like.findOne({ _id: req.params.id })
            .then(oneLike => res.json(oneLike))
            .catch((error) => res.status(400).json(error))
    },

    findAllLikes: async (req, res) => {
        Like.find()
            .then(allLikes => {
                console.log(allLikes)
                res.json(allLikes)
            })
            .catch((error) => {
                console.log('failed to find all Likes')
                res.status(400).json(error)
            })
    },

    removeLike: async (req, res) => {
        Like.deleteOne({ _id: req.params.id })
            .then(result => res.json(result))
            .catch((error) => res.status(400).json(error))
    },
}






    // .populate({
    //     path: 'likes',
    //     model: 'Like'
    // })