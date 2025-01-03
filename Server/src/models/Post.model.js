const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    titre: {type: String, required: true},
    contenu: {type: String, required: true},
    images: {type: [String]},
    status: { 
        type: String, 
        required: true,
        enum: ['draft', 'published', 'archived'],
        default: 'published'
    },
    authorId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
},{timestamps: true})

postSchema.index({ createdAt: -1 })

const Post = mongoose.model("Post", postSchema)

module.exports = Post