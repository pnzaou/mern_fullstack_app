const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
}, { timestamps: true });

likeSchema.index({ postId: 1 })

const Like = mongoose.model('Like', likeSchema)

module.exports = Like
