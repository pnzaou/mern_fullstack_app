const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    parentCommentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null },
}, { timestamps: true });

commentSchema.index({postId: 1})

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment