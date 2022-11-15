const mongoose = require("mongoose");

const ReplySchema = mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "User ID required"],
        },
        tweatID: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Tweat ID required"],
        },
        text: {
            type: String,
            required: [true, "Please respond with a comment."],
        },
    },
    { timestamps: true }
);

const Reply = mongoose.model("Reply", ReplySchema);

module.exports = { Reply };
