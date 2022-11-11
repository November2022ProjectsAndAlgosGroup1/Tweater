const mongoose = require('mongoose')

const LikeSchema = mongoose.Schema({
    userID: {
        type: String
    },
    tweatID: {
        type: String
    },
}, { timestamps: true })

const ReplySchema = mongoose.Schema({
    userID: {
        type: String
    },
    tweatID: {
        type: String
    },
    text: {
        type: String
    }
}, { timestamps: true })


const RestaurantSchema = mongoose.Schema({
    yelpID: {
        type: String
    },
    tweatID: {
        type: String
    },
    tweat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tweat'
    }
}, { timestamps: true })

const TweatSchema = mongoose.Schema({
    restaurantID: {
        type: String
    },
    text: {
        type: String
    },
    reply: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reply'
    },
    like: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'like'
    },
    // image: {
    //     //to be implemented
    // },
}, { timestamps: true })

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        validate: [true],
        min: [2, 'must be at least 2 characters']
    },
    password: {
        type: String,
        required: [true, 'please input a password']
    },
    tweat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tweat'
    },
    reply: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reply'
    },
    like: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'like'
    }
}, { timestamps: true })

const User = mongoose.model('user', UserSchema)
const Tweat = mongoose.model('tweat', TweatSchema)
const Reply = mongoose.model('reply', ReplySchema)
const Like = mongoose.model('like', LikeSchema)
const Restaurant = mongoose.model('restaurant', RestaurantSchema)

module.exports = { User, Tweat, Reply, Like, Restaurant }