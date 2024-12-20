const Comment = require("../models/Comment.model")

const addComment = async (req, res) => {
    const {id} = req.authData
    const {content, postId, parentCommentId} = req.body

    try {
        const rep = await Comment.create({authorId: id, content, postId, parentCommentId})
        return res.status(201).json({message: "Commentaire posté avec succès.", rep})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Une erreur s'est produite. Veuillez réessayer."})
    }
}

const updateComment = async (req, res) => {
    const { id } = req.authData
    const { commentId } = req.params 
    const { content } = req.body 

    if (!content || content.trim() === "") {
        return res.status(400).json({ message: "Le contenu du commentaire ne peut pas être vide." })
    }

    try {
        const comment = await Comment.findById(commentId)
        if (!comment) {
            return res.status(404).json({ message: "Commentaire non trouvé." })
        }

        if (comment.authorId.toString() !== id) {
            return res.status(403).json({ message: "Vous n'êtes pas autorisé à modifier ce commentaire." })
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { $set: { content } },
            { new: true }
        )

        return res.status(200).json({ message: "Commentaire modifié avec succès.", updatedComment })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Une erreur s'est produite. Veuillez réessayer." })
    }
}

const deleteComment = async (req, res) => {
    const { commentId } = req.params
    try {
        const rep = await Comment.findByIdAndDelete(commentId)
        return res.status(200).json({message: "Commentaire supprimé avec succès."})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Une erreur est s'est produite. Veuillez réessayer."})
    }
}


module.exports = {
    addComment,
    updateComment,
    deleteComment
}