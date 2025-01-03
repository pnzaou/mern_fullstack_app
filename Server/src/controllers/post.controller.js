const Post = require("../models/Post.model")
const Like = require("../models/Like.model")
const User = require("../models/User.model")
const Comment = require("../models/Comment.model")

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
            success: true,
            message: "Votre post a été publié avec succès.",
            data: newPost,
        })

    } catch (error) {
        console.error("Erreur dans le post.controller(createPost) :", error)
        return res.status(500).json({
            success: false,
            message: "Une erreur est survenue. Veuillez réessayer."
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
            success: true,
            message: "Le post a été enregistré dans vos brouillons.",
            data: draftPost,
        })

    } catch (error) {
        console.error("Erreur dans le post.controller(addToDraft) :", error)
        return res.status(500).json({
            success: false,
            message: "Une erreur est survenue. Veuillez réessayer."
        })
    }
}

const editPost = async (req, res) => {

}

const getAllPosts = async (req, res) => {
    const {skip} = req.query
    console.log(skip);
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).skip(parseInt(skip)).limit(10).lean()

        const postsWithDetails = await Promise.all(posts.map(async (post) => {
            const [likes, author, favs, comments] = await Promise.all([
                Like.countDocuments({postId: post._id}),
                User.findById(post.authorId, {profilPicture: 1, userName: 1, pseudo: 1, _id: 0}).lean(),
                User.countDocuments({favs: post._id}),
                Comment.countDocuments({postId: post._id})
            ])
            return { ...post, likes, author, favs, comments }
        }))

        return res.status(200).json({
            success: true,
            message: "Posts récupérés avec succès",
            data: postsWithDetails,
        })
    } catch (error) {
        console.error("Erreur dans le post.controller(getAllPosts) :", error.message)
        return res.status(500).json({
            success: false,
            message: "Erreur serveur! Veuillez réessayer.",
        })
    }
}

module.exports = {
    createPost,
    addToDraft,
    editPost,
    getAllPosts
}