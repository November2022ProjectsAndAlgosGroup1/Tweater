const mongoose = require("mongoose");

const LikeSchema = mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "User ID required"],
        },
        tweatID: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Tweat ID required"],
        },
    },
    { timestamps: true }
);

const Like = mongoose.model("Like", LikeSchema)

module.exports = { Like }
