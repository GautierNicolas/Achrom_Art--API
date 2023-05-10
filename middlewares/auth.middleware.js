// Protège les routes en vérifiant la présence d'un jeton JWT valide
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
const {ArtworkModel, ArtistModel} = require('../db/sequelize')

exports.authentification = (req, res, next) => {
        const authorizationHeader = req.headers.authorization
    if(!authorizationHeader){
        const msg = "Un jeton est nécessaire pour accéder à la ressource"
        return res.status(401).json({msg})
    }
    try {
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, privateKey)
        req.headers.userId = decoded.data
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

// Restreint l'accès à un artwork propre à un utilisateur    
exports.artworksRestrictToOwnUser = (req, res, next) => {
    ArtworkModel.findByPk(req.params.id, {include: ArtistModel})
        .then(artwork => { 
            if(!artwork){
                const msg = "Cette ressource n'existe pas";
                return res.status(404).json({msg})
            } 
            const artistFromArtwork = artwork.artists[0].dataValues.id
            const artistFromToken = req.headers.decodedToken

            if((artistFromArtwork != artistFromToken) && (artistFromToken.roles ==! "admin")){
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
// Restreint l'accès à un artist propre à un artist
exports.restrictToOwnUser = (req, res, next) => {
    ArtistModel.findByPk(req.params.id, {include: ArtworkModel})
        .then(artist => {
            if(!artist){
                const msg = "Cette ressource n'existe pas";
                return res.status(404).json({msg})
            }
            // !!!!!!!!! A modifier pendant developpement front !!!!!!!!!
            const idFromToken = req.headers.userid
            const idFromResponse = artist.dataValues.id
            const roles = req.headers.roles
            
            if((idFromResponse != idFromToken) && (roles ==! "admin")){
                const msg = "Tu n'es pas le créateur de cette ressource"
                return res.status(403).json({msg})
            }
            return next();
        })
        .catch(err => {
            const msg = "Erreur lors de l'autorisation"
            res.status(500).json({msg, data: err})
        })
}