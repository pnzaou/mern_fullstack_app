const express = require("express")
const { signIn, signUp } = require("../controllers/user.controller")
const { uploadSingle, uploadMultiple } = require("../middlewares/multer.middleware")
const verifToken = require("../middlewares/verifToken.middleware")
const { createPost, addToDraft } = require("../controllers/post.controller")
const router = express.Router()

router.post("/api/users/signUp", uploadSingle, signUp)
router.post("/api/users/signIn", signIn)


router.route("/api/posts")
    .post(verifToken, uploadMultiple, createPost)
router.post("/api/posts/add-to-draft", verifToken, uploadMultiple, addToDraft)
router.put("/api/post/:id")

module.exports = router