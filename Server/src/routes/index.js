const express = require("express")
const { signIn, signUp, toggleFav, toggleSub, getAuthUserDetails, getUserDetails } = require("../controllers/user.controller")
const { uploadSingle, uploadMultiple } = require("../middlewares/multer.middleware")
const verifToken = require("../middlewares/verifToken.middleware")
const { createPost, addToDraft, getAllPosts } = require("../controllers/post.controller")
const { addComment, updateComment, deleteComment } = require("../controllers/comment.controller")
const { toggleLikedPost, toggleLikedComment } = require("../controllers/like.controller")
const router = express.Router()

//USER
router.post("/api/users/signUp", uploadSingle, signUp)
router.post("/api/users/signIn", signIn)
router.get("/api/users/auth-details", verifToken, getAuthUserDetails)
router.get("/api/users/details", getUserDetails)
router.patch("/api/users/toggle-favorites", verifToken, toggleFav)
router.patch("/api/users/toggle-subscriptions", verifToken, toggleSub)


//POST
router.route("/api/posts")
    .post(verifToken, uploadMultiple, createPost)
    .get(verifToken, getAllPosts)
router.post("/api/posts/add-to-draft", verifToken, uploadMultiple, addToDraft)
router.put("/api/post/:id")


//COMMENT
router.route("/api/comments")
    .post(verifToken, addComment)
router.route("/api/comment/:commentId")
    .put(verifToken, updateComment)
    .delete(verifToken, deleteComment)


//LIKE
router.post("/api/likes/post", verifToken, toggleLikedPost)
router.post("/api/likes/comment", verifToken, toggleLikedComment)


module.exports = router