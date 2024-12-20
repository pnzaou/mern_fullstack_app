const Post = require("../models/Post.model")

const createPost = async (req, res) => {
    const {id} = req.authData
    const {contenu} = req.body
    const images = req.files.map(image => `${req.protocol}://${req.get('host')}/uploads/${image.filename}`)
    try {
        if(!contenu){
            return res.status(400).json({message: "Veuillez saisir le contenu du post"})
        }
        const rep = await Post.create({
            contenu,
            images,
            authorId: id
        })
        return res.status(201).json({message: "Votre post a été publié avec succès.", data: rep})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Une erreur est survenue. Veuillez réessayer.",
            erreur: error
        })
    }
}

const addToDraft = async (req, res) => {
    const {id} = req.authData
    const {contenu} = req.body
    const images = req.files.map(image => `${req.protocol}://${req.get('host')}/uploads/${image.filename}`)
    try {
        if(!contenu){
            return res.status(400).json({message: "Veuillez saisir le contenu du post"})
        }
        const rep = await Post.create({
            contenu,
            images,
            authorId: id,
            status: "draft"
        })
        return res.status(201).json({message: "Post enregistrer dans votre brouillon.", data: rep})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Une erreur est survenue. Veuillez réessayer.",
            erreur: error
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