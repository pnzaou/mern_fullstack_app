const Like = require("../models/Like.model")

const toggleLikedPost = async (req, res) => {
    const {id} = req.authData
    const {postId} = req.body

    try {
        const like = await Like.findOne({userId: id, postId})
        if(!like) {
            await Like.create({userId: id, postId})
            return res.status(201).json({message: "Vous avez liké le post."})
        } else {
            await like.deleteOne()
            return res.status(200).json({message: "Vous avez disliké le post."})
        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Une erreur s'est produite. Veuillez réessayer" });
    }
}

const toggleLikedComment = async (req, res) => {
    const {id} = req.authData
    const {commentId} = req.body

    try {
        const like = await Like.findOne({userId: id, commentId})
        if(!like) {
            await Like.create({userId: id, commentId})
            return res.status(201).json({message: "Vous avez liké le commentaire."})
        } else {
            await like.deleteOne()
            return res.status(200).json({message: "Vous avez disliké le commentaire."})
        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Une erreur s'est produite. Veuillez réessayer" });
    }
}


module.exports = {
    toggleLikedPost,
    toggleLikedComment
}