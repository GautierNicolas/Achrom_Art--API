const bcrypt = require('bcrypt')
const {ArtistModel, ArtworkModel, CategorieModel} = require('../db/sequelize')
const protect = require('../controllers/auth.controller')
const {privilegeAcces} = require('./auth.controller')

const visitor = ['email', 'password', 'roles', 'name', 'first_name', 'birth_date', 'createdAt', 'updatedAt', 'viewCount']
const artist = ['email', 'password', 'roles', 'name', 'first_name', 'birth_date', 'createdAt', 'updatedAt', 'viewCount']
const admin = ['']

// Récupérer tout les Artist
// visiteur = accès limité aux données publiques
// artist = accès limité aux données publiques + données privées en relation avec l'artiste
// admin = accès à toutes les données
exports.getAll = (req, res) => {
    const authorization = req.headers.authorization
    if(authorization == null) {
        ArtistModel.findAll({
            exclude: visitor,
            include: [ArtworkModel]
        })
        .then((results) => {            
            const msg = "La liste des artist a bien été trouvé"
            res.status(200).json({ msg, data: results })
        })
        .catch((error) => {
            res.status(500).json({ error: error.message })
        })
    } else {
        const roles = privilegeAcces(req, res).roles
        console.log(roles.every())
        if(roles.every(role => role !== 'admin')) {
        res.status(200).json({ msg: 'Voici la liste des artist', artist })
        }
        return (
            console.log
        )
    }
}

exports.getAllFilter = (req, res) => {
    ArtistModel.findAll({
    attributes: {
        exclude: ['email', 'password', 'createdAt', 'updatedAt', 'viewCount'],
    },
    })
    .then((artist) => {
        res.status(200).json({ msg: 'Voici la liste des artist', artist })
    })
    .catch((error) => res.status(500).json({ error: error.message }))
}
   
// Récupérer un artist
exports.getOne = (req, res) => {
    const { id } = req.params
    ArtistModel.findByPk(id, {
    attributes: { exclude: ['createdAt', 'updatedAt', 'viewCount'] },
    })
    .then((artwork) => {
        if (!artwork)
        return res.status(404).json({ error: "l'artist n'existe pas" })
        artwork.viewCount += 1
        artwork.save()
        res.status(200).json({ msg: "Voici l'artist", artwork })
    })
    .catch((error) => res.status(500).json({ error: error.message }))
}

//  Modifier une artist
exports.updateOne = (req, res) => {
    const { body } = req
    const { id } = req.params
    console.log(id)
    ArtistModel.findByPk(id)
    .then((artist) => {
        if (!artist) {
        return res.status(404).json({ error: "l'artist n'existe pas" })
        }
        artist.update(body)
        .then((artist) => {
        res.status(200).json({ msg: "L'artist a bien été modifié", artist })
        })
        .catch((error) => res.status(500).json({ error: error.message }))
    })
    .catch((error) => res.status(500).json({ error: error.message }))
}

//  Supprimer une artist
exports.deleteOne = (req, res) => {
    const { id } = req.params
    ArtistModel.findByPk(id)
    .then((artist) => {
        if (!artist) {
        return res.status(404).json({ error: "l'artist n'existe pas" })
        }
        artist.destroy()
        .then(() => {
        res.status(200).json({ msg: "L'artist a bien été supprimé" })
        })
        .catch((error) => res.status(500).json({ error: error.message }))
    })
    .catch((error) => res.status(500).json({ error: error.message }))
}