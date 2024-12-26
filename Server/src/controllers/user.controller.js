const User = require("../models/User.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const fs = require("fs")

const signUp = async (req, res) => {
    const {userName, pseudo, email, password} = req.body
    
    if(!userName || !pseudo || !email || !password) {
        return res.status(400).json({message: "Tous les champs sont requis."})
    }

    try {

        const existingUser = await User.findOne({
            $or: [{email}, {pseudo}]
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(409).json({ message: "Cet email est déjà utilisé." });
            }
            if (existingUser.pseudo === pseudo) {
                return res.status(409).json({ message: "Ce pseudo est déjà pris." });
            }
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const rep = await User.create({
            userName,
            pseudo,
            email,
            password: hashedPassword,
            profilPicture: req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null
        })

        return res.status(201).json({message: "Inscription réussie.", data: rep})

    } catch (error) {
        console.log(error.message);
        const msg = 'Une erreur est survenue. Veuillez réessayer.'
        return res.status(500).json({
            message: 'Une erreur est survenue. Veuillez réessayer.',
            erreur: error.message
        })
    }
}

const signIn = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "Email et mot de passe sont requis." });
    }

    try {

        const user = await User.findOne({email})
        if(!user) {
            return res.status(401).json({message: "Email ou mot de passe incorrect."})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) {
            return res.status(401).json({message: "Email ou mot de passe incorrect."})
        }

        let secret
        try {
            secret = fs.readFileSync("./.meow/meowPr.pem")
        } catch (fileError) {
            console.error("Erreur de lecture du fichier de clé :", fileError.message);
            return res.status(500).json({ message: "Erreur interne. Impossible de générer le token." });
        }
                
        const token = jwt.sign({
            id: user._id,
            userName: user.userName,
            pseudo: user.pseudo,
            profilPicture: user.profilPicture
        }, secret, {algorithm: "RS256"})

        return res.status(200).json({
            message: "Connexion réussie",
            token
        })

    } catch (error) {
        console.error("Erreur lors de la connexion :", error.message);
        return res.status(500).json({
            message: "Une erreur est survenue. Veuillez réessayer.",
            error: error.message,
        })
    }
}

const toggleFav = async (req, res) => {
    const {id} = req.authData
    const {postId} = req.body

    try {

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "L'ID du post est invalide." })
        }

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." })
        }
        
        if(user.favs.includes(postId)) {

            user.favs.pull(postId)
            await user.save()
            return res.status(200).json({message: "Post retiré de vos favoris."})
        }

        user.favs.push(postId)
        await user.save()

        return res.status(200).json({message: "Post ajouté dans vos favoris"})
    } catch (error) {
        console.error("Erreur lors de la gestion des favoris :", error.message);
        return res.status(500).json({
            message: "Une erreur est survenue. Veuillez réessayer.",
            error: error.message,
        })
    }
}

const toggleSub = async (req, res) => {
    const {id} = req.authData
    const {followedUserId} = req.body

    const session = await mongoose.startSession()

    try {

        if (!mongoose.Types.ObjectId.isValid(followedUserId)) {
            return res.status(400).json({ message: "L'ID de l'utilisateur à suivre est invalide." })
        }

        session.startTransaction()

        const authUser = await User.findById(id).session(session)
        const followedUser = await User.findById(followedUserId).session(session)

        if (!authUser || !followedUser) {
            return res.status(404).json({ message: "Un ou plusieurs utilisateurs non trouvés." })
        }

        if (authUser.subscriptions.includes(followedUserId)) {
            authUser.subscriptions.pull(followedUserId)
            followedUser.followers.pull(authUser._id)
        } else {
            authUser.subscriptions.push(followedUserId)
            followedUser.followers.push(authUser._id)
        }

        await authUser.save()
        await followedUser.save()

        await session.commitTransaction()
        session.endSession()

        const action = authUser.subscriptions.includes(followedUserId) ? 'abonné(e)' : 'désabonné(e)'
        return res.status(200).json({
            message: `Vous vous êtes ${action} à ${followedUser.pseudo}`,
        })

    } catch (error) {
        console.error("Erreur lors de la gestion des abonnements :", error.message)
        await session.abortTransaction()
        session.endSession()
        return res.status(500).json({
            message: "Une erreur est survenue. Veuillez réessayer.",
            error: error.message,
        })
    }
}

const getAuthUserDetails = async (req, res) => {
    const {id} = req.authData

    try {
        const user = await User.findById(id)

        if(!user) {
            return res.status(404).json({
                message: "Utilisateur non trouvé"
            })
        }
        return res.status(200).json({
            message: "Données récupérées avec succès",
            data: user
        })
    } catch (error) {
        console.error("Erreur lors de la récupération des données utilsateur :", error.message)

        let errorMessage = "Une erreur est survenue. Veuillez réessayer."
        if (error.name === 'CastError') {
            errorMessage = "L'ID utilisateur est invalide."
        }

        return res.status(500).json({
            message: errorMessage,
            error: error.message,
        })
    }
}

const getUserDetails = async (req, res) => {
    const {id} = req.params

    try {
        const user = await User.findById(id)

        if(!user) {
            return res.status(404).json({
                message: "Utilisateur non trouvé"
            })
        }
        return res.status(200).json({
            message: "Données récupérées avec succès",
            data: user
        })
    } catch (error) {
        console.error("Erreur lors de la récupération des données utilsateur :", error.message)

        let errorMessage = "Une erreur est survenue. Veuillez réessayer."
        if (error.name === 'CastError') {
            errorMessage = "L'ID utilisateur est invalide."
        }

        return res.status(500).json({
            message: errorMessage,
            error: error.message,
        })
    }
}

module.exports = {
    signUp,
    signIn,
    toggleSub,
    toggleFav,
    getUserDetails,
    getAuthUserDetails,
}