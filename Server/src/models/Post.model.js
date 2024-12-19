const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    legende: {type: String, required: true},
    images: {type: [String]},
    status: { 
        type: String, 
        required: true,
        enum: ['draft', 'published', 'archived']
    },
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
},{timestamps: true})

const Post = mongoose.model("Post", postSchema)

module.exports = Post