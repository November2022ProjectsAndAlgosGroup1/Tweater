const mongoose = require("mongoose");

const TweatSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User"
    },

    //This is a Map. I'm not really sure what that means, and I'm too tired to figure it out tonight
    restaurantInfo: {
      name: {
        type: String,
        required: [true, "Restaurant name is required"],
      },
      latitude: {
        type: Number,
        required: [true],
      },
      logitude: {
        type: Number,
        required: [true],
      },
    },
    text: {
      type: String,
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
        ref: "Tweat"
      },
    ],
    originalTweat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweat",
    },
    // image: {
    //     //to be implemented
    // },
  },
  { timestamps: true }
);

const Tweat = mongoose.model("Tweat", TweatSchema);

module.exports = { Tweat };
