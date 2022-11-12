const { Reply, User, Tweat } = require('../models/all.model')

module.exports = {

    //adds a reply to the database
    //adds the reply's ID to the user's reply array
    //adds the reply's ID to the tweat's reply array
    addReply: async (req, res) => {
        try {
            const newReply = await Reply.create(req.body)
            const updatedUserWithReply = await User.findOneAndUpdate(
                { _id: newReply.userID },
                { $push: { replies: newReply._id } },
                { new: true }
            )
            const updatedTweatWithReply = await Tweat.findOneAndUpdate(
                { _id: newReply.tweatID },
                { $push: { replies: newReply._id } },
                { new: true }
            )
            res.status(200).json({ updatedTweatObj: updatedTweatWithReply, updatedUserObj: updatedUserWithReply })
        }
        catch (error) {
            res.status(400).json(error)
        }
    },

    //finds a reply in the database
    findReply: (req, res) => {
        Reply.findOne({ _id: req.params.id })
            .then(oneReply => res.json(oneReply))
            .catch((error) => res.status(400).json(error))
    },

    //finds all replies in the database
    findAllReplies: (req, res) => {
        Reply.find()
            .then(allReplys => {
                console.log(allReplys)
                res.json(allReplys)
            })
            .catch((error) => {
                console.log('failed to find all replies')
                res.status(400).json(error)
            })
    },

    // TODO
    //updates a single reply in the database
    //are we allowing users to update their replies??
    updateReply: (req, res) => {
        Reply.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then(updatedReply => res.json(updatedReply))
            .catch((error) => res.status(400).json(error))
    },

    //TODO: Test this method.  When a reply is deleted, it is removed from the Replies collection, the associated User's replies array, and the associated Tweat's replies array
    deleteReply: async (req, res) => {
        Reply.deleteOne({ _id: req.params.id })
            .then(result => res.json(result))
            .catch((error) => res.status(400).json(error))
        const replyID = req.params.id
        try {
            //Delete the reply from the Replies collection
            const deletedReply = await Reply.findOneAndRemove({ _id: req.params.id })
            //Update the User to remove the reply
            const updatedUser = await User.findOneAndUpdate(
                { _id: deletedReply.userID },
                { $pull: { replies: deletedReply._id } }
            )
            //Update the associated Tweat to remove the reply
            const updatedTweat = await Tweat.findOneAndUpdate(
                { _id: deletedReply.tweatID },
                { $pull: { replies: deletedReply._id } }
            )
            res.status(200).json({ deletedReply: deletedReply, updatedTweat: updatedTweat, updatedUser: updatedUser })
        }
        catch (error) {
            res.status(400).json(error)
        }

        //Previous code: When a reply is deleted, it is not deleted from the parent document array.
        // Reply.deleteOne({ _id: req.params.id })
        // .then(result => res.json(result))
        // .catch((error) => res.status(400).json(error))
    },
}