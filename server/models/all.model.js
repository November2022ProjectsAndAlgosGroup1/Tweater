const mongoose = require('mongoose')

const LikeSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User ID required']
    },
    tweatID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Tweat ID required']
    },
}, { timestamps: true })

const ReplySchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User ID required']
    },
    tweatID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Tweat ID required']
    },
    text: {
        type: String,
        required: [true, 'Please respond with a comment.']
    }
}, { timestamps: true })


const RestaurantSchema = mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Restaurant name is required']
    },
    yelpID: {
        type: String
    },
    tweats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweat'
    }]
}, { timestamps: true })

const TweatSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User ID is required']
    },
    restaurantID: {
        type: mongoose.Schema.Types.ObjectId,
        // required: [true, 'Restaurant ID is required']
    },
    text: {
        type: String
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply'
    }],
    //TODO:  Should likes just be an array of User IDs?  I don't think it needs to be a separate model.
    //Just a list of references to users who like the tweat
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }],
    originalTweat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweat'
    },
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
        email:{
            type: String,
            required: [true, 'Email is required'],
            // validate: [
            //         /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            //         'Provided email is invalid'
            //     ]
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
            //ref: 'User'  //We could just create an array of user references here instead of creating a separate model for likes.
        }]
    }, { timestamps: true })

const Like = mongoose.model('Like', LikeSchema)
const Reply = mongoose.model('Reply', ReplySchema)
const Restaurant = mongoose.model('Restaurant', RestaurantSchema)
const Tweat = mongoose.model('Tweat', TweatSchema)
const User = mongoose.model('User', UserSchema)

module.exports = { Like, Reply, Restaurant, Tweat, User }