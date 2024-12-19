const express = require("express")
const { signIn, signUp } = require("../controllers/user.controller")
const { uploadSingle } = require("../middlewares/multer.middleware")
const router = express.Router()

router.post("/api/users/signUp", uploadSingle, signUp)
router.post("/api/users/signIn", signIn)

module.exports = router