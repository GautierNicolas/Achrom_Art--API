const { Op, UniqueConstraintError, ValidationError } = require('sequelize');
const { ArtistModel } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

exports.login = (req, res) => {    
    
    if(!req.body.artist_name || !req.body.password){
        const msg = "Veuillez fournir un nom d'utilisateur et un mot de passe."
        return res.status(400).json({message: msg})
    }    
    ArtistModel.findOne({ where : {artist_name: req.body.artist_name}})
        .then(artist => {
            if(!artist){
                const msg = "L'utilisateur demandé n'existe pas."
                return res.status(404).json({message: msg})
            }

            bcrypt.compare(req.body.password, artist.password)
                .then(isMatch => {
                    if(!isMatch){
                        const msg = "Le mot de passe est incorrect."
                        return res.status(404).json({message: msg})
                    }                    
                    const token = jwt.sign({                        
                        id : artist.id,
                        artist_name : artist.artist_name,
                        email : artist.email,
                        roles : artist.roles                        
                    }, privateKey, { expiresIn: '5h' });
                    
                    artist.password = "hidden"
                    const msg = "L'utilisateur a été connecté avec succès."
                    res.status(200).json({ message: msg, data: token })
                })
        })
        .catch(error => {
            const msg = "L'utilisateur n'a pas pu se connecter."
            return res.status(500).json({message: msg, error})
        })
}

exports.signup = (req, res) => {
    console.log("AUTH REGISTER")
    console.log("------>" + " " + req.body.password)
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            req.body.password = hash
            return ArtistModel.create(req.body)
            .then((artistCreated) => {
                const message = `L'utilisateur ${artistCreated.artist_name} a bien été créé` 
                artistCreated.password = 'hidden';
                return res.json({message, data: artistCreated})
            })
        })
        .catch(error => {
            if(error instanceof UniqueConstraintError || error instanceof ValidationError){
                return res.status(400).json({message: error.message, data: error})
            } 
            const message = "Un problème est survenu lors de la création du profil"
            return res.status(500).json({message, data:error})
        })
}                                                 

// exports.privilegeAcces = (req, res) => {
//     console.log("authentification Middleware" + " " )
//     const authorizationHeader = req.headers.authorization
    
//     if(!authorizationHeader){
//         const message = "Un jeton est nécessaire pour accéder à la ressource"
//         return res.status(401).json({message})
//     }
//     try {
//         const token = authorizationHeader.split(' ')[1];
//         const decoded = jwt.verify(token, privateKey)
//         return(decoded)
//     } catch (err) {
//         const message = "Jeton invalide"
//         return res.status(403).json({message, data: err})
//     }    
// }

