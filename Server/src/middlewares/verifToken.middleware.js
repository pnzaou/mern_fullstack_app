const jwt = require("jsonwebtoken")
const fs = require("fs")

const verifToken = async (req, res, next) => {
    const token = req.headers.authorization
    if(!token) {
        return res.status(403).json({message: "Accès refusé."})
    } else {
        const secret = fs.readFileSync("./.meow/meowPu.pem")
        jwt.verify(token, secret, (error, decode) => {
            if(error) {
                return res.status(401).json({message: "Token invalid!"})
            } else {
                req.authData = decode
                next()
            }
        })
    }
}

module.exports = verifToken