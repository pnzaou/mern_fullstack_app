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
            profilPicture: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
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
            pseudo: user.pseudo
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
        });
    }
}

module.exports = {
    signUp,
    signIn
}