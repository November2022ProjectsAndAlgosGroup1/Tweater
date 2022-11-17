const { Tweat } = require("../models/tweat.model")
const { User } = require("../models/user.model")

module.exports = {
    //creates new tweat and adds it to the user's tweat array and adds the tweat's ID to the user's tweat array
    addTweat: async (req, res) => {
        // console.log('Adding the tweat!')
        console.log(
            "Here is the request body when a tweat is created:",
            req.body
        )
        console.log("Here is the file", req.file)

        const userID = req.body.userID
        const yelpID = req.body.yelpID
        const restaurantName = req.body.restaurantName
        const restLatitude = req.body.restLatitude
        const restLogitude = req.body.restLogitude

        const text = req.body.text
        let image = ""
        //If there is a photo in the file, set the image field
        if (req.file !== undefined) {
            image = req.file.filename
        }

        const tweatData = {
            userID,
            yelpID,
            restaurantName,
            restLatitude,
            restLogitude,
            text,
            image,
        }
        try {
            const newTweat = await Tweat.create(tweatData)
            const updatedUserWithTweat = await User.findOneAndUpdate(
                { _id: newTweat.userID },
                { $push: { tweats: newTweat._id } },
                { new: true }
            )
            console.log(updatedUserWithTweat)
            res.status(200).json({
                successMessage: "Success! You Tweated!",
                newTweat: newTweat,
                updatedUserObj: updatedUserWithTweat,
            })
        } catch (error) {
            res.status(400).json(error)
        }
    },

    //finds a single tweat in the database
    findTweat: (req, res) => {
        Tweat.findOne({ _id: req.params.id })
            .populate("replies") //extends the tweat object to include the actual reply objects
            .populate("likes") //extends the tweat object to include the actual like objects
            .then((oneTweat) => res.json(oneTweat))
            .catch((error) => res.status(400).json(error))
    },

    //finds all tweats in the database
    findAllTweats: (req, res) => {
        Tweat.find()
            .populate({
                path: "userID",
                select: "name userName",
            })
            .populate("likes")
            .sort({ createdAt: "desc" })
            .then((allTweats) => {
                //map through tweats and attach the user object to each tweat
                // const tweatsWithUsers = allTweats.map((tweat) => {
                //     return User.findOne({ tweats: tweat._id }).then((user) => {
                //         tweat.user = user
                //         return tweat
                //     })
                // })
                res.json(allTweats)
            })
            .catch((error) => {
                console.log("failed to find all Tweats")
                res.status(400).json(error)
            })
    },

    //updates a single tweat in the database
    updateTweat: (req, res) => {
        Tweat.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        })
            .then((updatedTweat) => res.json(updatedTweat))
            .catch((error) => res.status(400).json(error))
    },

    //deletes a single tweat in the database and user's tweat array
    deleteTweat: async (req, res) => {
        const tweatID = req.params.id
        try {
            //Delete the tweat from the Tweat collection
            const deletedTweat = await Tweat.findOneAndDelete({
                _id: tweatID,
            })
            console.log("Just deleted this tweat:", deletedTweat)
            console.log("Deleted Tweet ID:", deletedTweat._id)
            //Update the User to remove the tweat
            const updatedUser = await User.findOneAndUpdate(
                { _id: deletedTweat.userID },
                { $pull: { tweats: deletedTweat._id } }
            )
            console.log("Just updated this user:", updatedUser)


            res.status(200).json({
                deletedTweat: deletedTweat,
                // updatedUser: updatedUser,
            })
        } catch (error) {
            res.status(400).json(error)
        }
    },

    likeTweat: async (req, res) => {

        console.log("liked")
        const tweatID = req.body.tweatID
        const userID = req.body.userID
        console.log(`tweatID: ${tweatID}, userID: ${userID}`)
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: userID },
                { $push: { likes: tweatID } },
                { new: true }
            )
            const updatedTweat = await Tweat.findOneAndUpdate(
                { _id: tweatID },
                { $push: { likes: userID } },
                { new: true }
            )
            res.status(200).json({ updatedUser: updatedUser, updatedTweat: updatedTweat })
        } catch (error) {
            res.status(400).json(error)
        }
    },
    dislikeTweat: async (req, res) => {
        console.log("disliked")
        const tweatID = req.body.tweatID
        const userID = req.body.userID
        console.log(`tweatID: ${tweatID}, userID: ${userID}`)
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: userID },
                { $pull: { likes: tweatID } },
            )
            const updatedTweat = await Tweat.findOneAndUpdate(
                { _id: tweatID },
                { $pull: { likes: userID } },
            )
            res.status(200).json({ updatedUser: updatedUser, updatedTweat: updatedTweat })
        } catch (error) {
            res.status(400).json(error)
        }
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
