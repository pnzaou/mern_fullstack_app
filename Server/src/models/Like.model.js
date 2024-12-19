const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    comment_id: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
}, { timestamps: true });

const Like = mongoose.model('Like', likeSchema)

module.exports = Like
