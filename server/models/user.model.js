const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            minLength: [2, "Name must be at least 2 characters"],
        },
        userName: {
            type: String,
            required: [true, "Username is required"],
            minLength: [2, "Username must be at least 2 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            //Validation is ready to be used, commented to be easier to test
            // validate: [
            //         /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            //         'Provided email is invalid'
            //     ]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: [8, "Password must be at least 8 characters"],
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
            // ref: 'User'  //We could just create an array of user references here instead of creating a separate model for likes.
        }],

    },
    { timestamps: true }
);

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value)

// Middleware for password confirmation
UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords must match!')
    }
    next()
})

//Middleware for password encryption
UserSchema.pre('save', async function (next) {
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10)
        // console.log(`Hashed password: ${hashedPassword}`)
        this.password = hashedPassword
        next()
    } catch (error) {
        console.log('error in save', error)
    }
})

const User = mongoose.model("User", UserSchema);

module.exports = { User };
