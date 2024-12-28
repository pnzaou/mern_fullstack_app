const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    profilPicture: String,
    userName: {type: String, required: true, unique: true},
    pseudo: {type: String, required: true, unique: true},
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(v);
            },
            message: props => `${props.value} n'est pas un email valide!`
        }
    },
    password: {type: String, required: true},
    favs: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Post"}
    ],
    subscriptions: [
        {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    ],
    followers: [
        {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    ],
},{timestamps: true})

userSchema.index({ favs: 1 })

const User = mongoose.model("User", userSchema)

module.exports = User 