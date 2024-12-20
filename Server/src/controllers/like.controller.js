const mongoose = require('mongoose')
const Like = require("../models/Like.model")

const toggleLikedPost = async (req, res) => {
    const {id} = req.authData
    const {postId} = req.body

    try {

        if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "ID du post invalide ou manquant." });
        }

        const existingLike = await Like.findOne({ userId: id, postId })

        if (existingLike) {
            await Like.findOneAndDelete({ userId: id, postId });
            return res.status(200).json({ message: "Vous avez retiré votre like sur le post." });
        }
        
        await Like.create({ userId: id, postId });
        return res.status(201).json({ message: "Vous avez liké le post." });
        
    } catch (error) {
        console.error("Erreur dans toggleLikedPost :", error.message)
        return res.status(500).json({
            message: "Une erreur s'est produite. Veuillez réessayer.",
            error: error.message,
        })
    }
}

const toggleLikedComment = async (req, res) => {
    const {id} = req.authData
    const {commentId} = req.body

    try {

        if (!commentId || !mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({ message: "L'ID du commentaire est invalide ou manquant." })
        }

        const existingLike = await Like.findOne({ userId: id, commentId })

        if (existingLike) {
            await Like.findOneAndDelete({ userId: id, commentId })
            return res.status(200).json({ message: "Vous avez retiré votre like sur le commentaire." })
        }

        await Like.create({ userId: id, commentId })
        return res.status(201).json({ message: "Vous avez liké le commentaire." })
        
    } catch (error) {
        console.error("Erreur dans toggleLikedComment :", error.message)
        return res.status(500).json({
            message: "Une erreur s'est produite. Veuillez réessayer.",
            error: error.message,
        })
    }
}


module.exports = {
    toggleLikedPost,
    toggleLikedComment
}