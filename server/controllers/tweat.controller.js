const { Tweat, User } = require('../models/all.model')


//creates new tweat and adds it to the user's tweat array
module.exports.addTweat = async (req, res) => {
    try {
        const newTweat = await Tweat.create(req.body)
        const updatedUserWithTweat = await User.findOneAndUpdate(
            { _id: newTweat.userID },
            { $push: { tweats: newTweat._id } },
            { new: true }
        )
        // const updatedRestaurantWithTweat = await Restaurant.findOneAndUpdate(
        //     { _id: newTweat.restaurantID },
        //     { $push: { tweats: newTweat._id } },
        //     { new: true }
        // )
        res.status(200).json(updatedUserWithTweat)
    } catch (error) {
        res.status(400).json(error)
    }
},


    module.exports.findTweat = async (req, res) => {
        Tweat.findOne({ _id: req.params.id })
            .populate('replies')
            .populate('likes') 
            .then(oneTweat => res.json(oneTweat))
            .catch((error) => res.status(400).json(error))
    },

    module.exports.findAllTweats = async (req, res) => {
        Tweat.find()
            .then(allTweats => {
                console.log(allTweats)
                res.json(allTweats)
            })
            .catch((error) => {
                console.log('failed to find all Tweats')
                res.status(400).json(error)
            })
    },

    module.exports.updateTweat = async (req, res) => {
        Tweat.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then(updatedTweat => res.json(updatedTweat))
            .catch((error) => res.status(400).json(error))
    },

    module.exports.deleteTweat = async (req, res) => {
        Tweat.deleteOne({ _id: req.params.id })
            .then(result => res.json(result))
            .catch((error) => res.status(400).json(error))
    },

    module.exports.retweat = async (req, res) => {
        const retweat = await Tweat.findOne({ _id: req.params.id })
        Tweat.addTweat(retweat)
            .then()
            .catch((error) => res.status(400).json(error))
    }
