const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'please input a password']
    },
    tweat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweat'
    },
    reply: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply'
    },
    like: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
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
        ref: 'Reply'
    },
    like: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    },
    // image: {
    //     //to be implemented
    // },
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

const LikeSchema = mongoose.Schema({
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
        ref: 'Tweat'
    }
}, { timestamps: true })


const User = mongoose.model('User', UserSchema)
const Tweat = mongoose.model('Tweat', TweatSchema)
const Reply = mongoose.model('Reply', ReplySchema)
const Like = mongoose.model('Like', LikeSchema)
const Restaurant = mongoose.model('Restaurant', RestaurantSchema)

module.exports = { User, Tweat, Reply, Like, Restaurant }