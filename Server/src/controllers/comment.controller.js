const Comment = require("../models/Comment.model")

const addComment = async (req, res) => {
    const {id} = req.authData
    const {content, postId, parentCommentId} = req.body

    try {

        if(!content || !postId) {
            return res.status(400).json({ message: "Le contenu et l'ID du post sont requis." })
        }

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "L'ID du post est invalide." })
        }

        if (parentCommentId && !mongoose.Types.ObjectId.isValid(parentCommentId)) {
            return res.status(400).json({ message: "L'ID du commentaire parent est invalide." })
        }

        const newComment = await Comment.create({
            authorId: id,
            content,
            postId,
            parentCommentId: parentCommentId || null,
        })

        return res.status(201).json({
            message: "Commentaire posté avec succès.",
            data: newComment,
        })

    } catch (error) {
        console.error("Erreur dans addComment :", error.message);
        return res.status(500).json({
            message: "Une erreur s'est produite. Veuillez réessayer.",
            error: error.message,
        })
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

        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            return res.status(400).json({ message: "L'ID du commentaire est invalide." });
        }

        const deletedComment = await Comment.findByIdAndDelete(commentId)
        
        if (!deletedComment) {
            return res.status(404).json({ message: "Le commentaire n'existe pas ou a déjà été supprimé." });
        }

        return res.status(200).json({
            message: "Commentaire supprimé avec succès.",
            data: deletedComment,
        })

    } catch (error) {
        console.error("Erreur dans deleteComment :", error.message);
        return res.status(500).json({
            message: "Une erreur s'est produite. Veuillez réessayer.",
            error: error.message,
        })
    }
}


module.exports = {
    addComment,
    updateComment,
    deleteComment
}