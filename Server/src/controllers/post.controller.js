const Post = require("../models/Post.model")

const createPost = async (req, res) => {
    const {id} = req.authData
    const {titre, contenu} = req.body

    try {

        if (!contenu || contenu.trim() === "") {
            return res.status(400).json({ message: "Veuillez saisir le contenu du post." })
        }

        let images = []
        if (req.files && req.files.length > 0) {
            images = req.files.map(image => 
                `${req.protocol}://${req.get('host')}/uploads/${image.filename}`
            )
        }

        const newPost = await Post.create({
            tire,
            contenu,
            images,
            authorId: id,
        })

        return res.status(201).json({
            message: "Votre post a été publié avec succès.",
            data: newPost,
        })

    } catch (error) {
        console.error("Erreur lors de la création du post :", error.message)
        return res.status(500).json({
            message: "Une erreur est survenue. Veuillez réessayer.",
            error: error.message,
        })
    }
}

const addToDraft = async (req, res) => {
    const {id} = req.authData
    const {titre, contenu} = req.body

    try {

        if (!contenu || contenu.trim() === "") {
            return res.status(400).json({ message: "Veuillez saisir le contenu du post." })
        }

        let images = []
        if (req.files && req.files.length > 0) {
            images = req.files.map(image =>
                `${req.protocol}://${req.get('host')}/uploads/${image.filename}`
            )
        }

        const draftPost = await Post.create({
            titre,
            contenu,
            images,
            authorId: id,
            status: "draft",
        })

        return res.status(201).json({
            message: "Le post a été enregistré dans vos brouillons.",
            data: draftPost,
        })

    } catch (error) {
        console.error("Erreur lors de l'enregistrement dans les brouillons :", error.message)
        return res.status(500).json({
            message: "Une erreur est survenue. Veuillez réessayer.",
            error: error.message,
        })
    }
}

const editPost = async (req, res) => {

}

module.exports = {
    createPost,
    addToDraft,
    editPost
}