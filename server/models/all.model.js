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
        type: String,
        required: [true, 'please respond with a comment']
    }
}, { timestamps: true })


const RestaurantSchema = mongoose.Schema({
    yelpID: {
        type: String
    },
    tweatID: {
        type: String
    },
    tweats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweat'
    }]
}, { timestamps: true })

const TweatSchema = mongoose.Schema({
    userID: {
        type: String
    },
    restaurantID: {
        type: String
    },
    text: {
        type: String
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }],
    // image: {
    //     //to be implemented
    // },
}, { timestamps: true })

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            minLength: [2, 'Name must be at least 2 characters']
        },
        password: {
            type: String,
            required: [true, 'please input a password'],
            minLength: [8, 'Password must be at least 8 characters']
        },
        tweats: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tweat'
        }],
        replies: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Reply'
        }],
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }]
    }, { timestamps: true })

const Like = mongoose.model('Like', LikeSchema)
const Reply = mongoose.model('Reply', ReplySchema)
const Restaurant = mongoose.model('Restaurant', RestaurantSchema)
const Tweat = mongoose.model('Tweat', TweatSchema)
const User = mongoose.model('User', UserSchema)

module.exports = { Like, Reply, Restaurant, Tweat, User }