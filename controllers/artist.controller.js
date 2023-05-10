const {ArtistModel, ArtworkModel, CategorieModel} = require('../db/sequelize')


// Récupérer tout les Artist
// visiteur = accès limité aux données publiques
// artist = accès limité aux données publiques + données privées en relation avec l'artiste
// admin = accès à toutes les données
exports.getAll = (req, res) => {
    ArtistModel.scope('withoutPassword').findAll({
        include: [ArtworkModel, CategorieModel]
    })
    .then((artist) => {
        const msg = "La liste des artist a bien été trouvé"
        res.json({ msg, data: artist })
    })
    .catch((error) => {
        const msg = "La liste des artist n'a pas pu être récupéré"
        res.status(500).json({ msg, data: error })
    })
}
   
// Récupérer un artist
exports.getOne = (req, res) => {
    const { id } = req.params
    ArtistModel.findByPk(id, {
    attributes: { exclude: ['createdAt', 'updatedAt', 'viewCount'] },
    })
    .then((artist) => {
        if (!artist) {
            return res.status(404).json({ error: "l'artist n'existe pas" })
        } else {
            artist.view_count += 1
            artist.save()
            res.status(200).json({ msg: "Voici l'artist", artist })
        }
    })
    .catch((error) => res.status(500).json({ error: error.message }))
}

//  Modifier une artist
exports.updateOne = (req, res) => {
    const { body } = req
    const { id } = req.params
    
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