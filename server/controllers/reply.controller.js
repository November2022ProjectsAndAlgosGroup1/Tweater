const { Reply, User, Tweat } = require('../models/all.model')

module.exports = {
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

        Reply.create(req.body)
            .then(newReply = res.json(newReply))
            .catch((error) => res.status(400).json(error))
    },
    findReply: async (req, res) => {
        Reply.findOne({ _id: req.params.id })
            .then(oneReply => res.json(oneReply))
            .catch((error) => res.status(400).json(error))
    },
    findAllReplies: async (req, res) => {
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
    updateReply: async (req, res) => {
        Reply.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then(updatedReply => res.json(updatedReply))
            .catch((error) => res.status(400).json(error))
    },
    deleteReply: async (req, res) => {
        Reply.deleteOne({ _id: req.params.id })
            .then(result => res.json(result))
            .catch((error) => res.status(400).json(error))
    },
}