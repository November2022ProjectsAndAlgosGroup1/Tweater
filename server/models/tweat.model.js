const mongoose = require("mongoose")

const TweatSchema = mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "User ID is required"],
            ref: "User",
        },
        //This is a Map. I'm not really sure what that means, and I'm too tired to figure it out tonight
        yelpID: String,
        restaurantName: {
            type: String,
            // required: [true, "Restaurant name is required"],
        },
        restLatitude: {
            type: Number,
            // required: [true],
        },
        restLogitude: {
            type: Number,
            // required: [true],
        },
        text: {
            type: String,
            required: [true, "Text is required"],
        },
        replies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Reply",
            },
        ],
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Like",
            },
        ],
        retweat: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tweat",
            },
        ],
        originalTweat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tweat",
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
)

const Tweat = mongoose.model("Tweat", TweatSchema)

module.exports = { Tweat }
