const User = require("../models/User.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const fs = require("fs")

const signUp = async (req, res) => {
    const {userName, pseudo, email, password} = req.body
    console.log(userName, pseudo, email, password)
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const rep = await User.create({
            userName,
            pseudo,
            email,
            password: hashedPassword,
            profilPicture: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        })

        const msg = "Inscription réussie."
        return res.status(201).json({message: msg, data: rep})

    } catch (error) {
        console.log(error.message);
        const msg = 'Une erreur est survenue. Veuillez réessayer.'
        return res.status(500).json({message: msg, erreur: error.message})
    }
}

const signIn = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({email})
        if(!user) {
            return res.status(401).json({message: "Email ou mot de passe incorrect."})
        } else {
            const verifPassword = await bcrypt.compare(password, user.password)
            if(!verifPassword) {
                return res.status(401).json({message: "Email ou mot de passe incorrect."})
            } else {
                const secret = fs.readFileSync("./.meow/meowPr.pem")
                const token = jwt.sign({
                    id: user._id,
                    userName: user.userName,
                    pseudo: user.pseudo
                }, secret, {algorithm: "RS256"})
                return res.status(200).json({message: "Connexion réussie", token})
            }
        }
    } catch (error) {
        console.log(error.message);
        const msg = 'Une erreur est survenue. Veuillez réessayer.'
        return res.status(500).json({message: msg, erreur: error})
    }
}


module.exports = {
    signUp,
    signIn
}