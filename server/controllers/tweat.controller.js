const { Tweat, User } = require('../models/all.model')

module.exports = {

    //creates new tweat and adds it to the user's tweat array
    //adds the tweat's ID to the user's tweat array
    addTweat: async (req, res) => {
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

    //finds a single tweat in the database
    findTweat: (req, res) => {
        Tweat.findOne({ _id: req.params.id })
            .populate('replies') //extends the tweat object to include the actual reply objects
            .populate('likes') //extends the tweat object to include the actual like objects
            .then(oneTweat => res.json(oneTweat))
            .catch((error) => res.status(400).json(error))
    },

    //finds all tweats in the database
    findAllTweats: (req, res) => {
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

    //updates a single tweat in the database
    updateTweat: (req, res) => {
        Tweat.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then(updatedTweat => res.json(updatedTweat))
            .catch((error) => res.status(400).json(error))
    },

    //TODO: need to remove from user's tweat array
    //deletes a single tweat in the database
    deleteTweat: (req, res) => {
        Tweat.deleteOne({ _id: req.params.id })
            .then(result => res.json(result))
            .catch((error) => res.status(400).json(error))
    }
}
//TODO:  For retweat, I think that we can just route to '/api/tweats/'
// to add a new tweat and pass in a Tweat Schema to the retweat field in originalTweat field through
//on the front end??
// module.exports.retweat = (req, res) => {
//     Tweat.addTweat(retweat)
//         .then()
//         .catch((error) => res.status(400).json(error))
//     const retweat = Tweat.findOne({ _id: req.params.id })
// }