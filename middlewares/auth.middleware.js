// Protège les routes en vérifiant la présence d'un jeton JWT valide
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

exports.protect = (req, res, next) => {
        const authorizationHeader = req.headers.authorization
        console.log("protect Middleware" + " " + authorizationHeader)
    if(!authorizationHeader){
        const msg = "Un jeton est nécessaire pour accéder à la ressource"
        return res.status(401).json({msg})
    }
    try {
        const token = authorizationHeader.split(' ')[1]
        console.log("token" + " " + token)
        const decoded = jwt.verify(token, privateKey)
        req.userId = decoded.data
    } catch (err) {
        const msg = "Jeton invalide"
        return res.status(403).json({msg, data: err})
    }    
    return next();
}

// Restreint l'accès à une ressource à un utilisateur ayant un rôle spécifique
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        ArtistModel.findByPk(req.userId)
            .then(user => { 
                console.log(user.artist_name, user.id, roles) 
                if(!user || !roles.every(role => user.roles.includes(role))){
                    const msg = "Droits insuffisants";
                    return res.status(403).json({msg}) 
                }
                return next();
            })
            .catch(err => {
                const msg = "Erreur lors de l'autorisation"
                res.status(500).json({msg, data: err})
            })    
    }
}

// Restreint l'accès à une ressource propre à un utilisateur    
exports.restrictToOwnUser = (req, res, next) => {
    ArtworkModel.findByPk(req.params.id)
        .then(artwork => { 
            if(!artwork){
                const msg = `Le commentaire n°${req.params.id} n'existe pas`
                return res.status(404).json({msg})
            }
            if(artwork.UserId != req.userId){
                const msg = "Tu n'es pas le créateur de cette ressource";
                return res.status(403).json({msg}) 
            }
            return next();
        })
        .catch(err => {
            const msg = "Erreur lors de l'autorisation"
            res.status(500).json({msg, data: err})
        })    
}