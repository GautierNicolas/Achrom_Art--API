const bcrypt = require('bcrypt')
const { ArtistModel, CategorieModel, ArtworkModel } = require('../db/sequelize')


// Récupérer tout les artists
// visiteur = accès limité aux données publiques
// artist = accès limité aux données publiques + données privées en relation avec l'artiste
// admin = accès à toutes les données
exports.getAll = (req, res) => {
  if(req.headers.authorization === null)
    ArtistModel.findAll({
      attributes: {
        exclude: ['email', 'password', 'roles', 'name', 'first_name', 'birth_date', 'createdAt', 'updatedAt', 'viewCount'],
          include: [ArtistModel.scope("withoutPassword")]      
      }
      .then((artists) => {
        const msg = "La liste des artists a bien été trouvé"
        res.status(200).json({ msg, artists })
      })
      .catch((error) => res.status(500).json({ error: error.message }))
    })
      .then((artists) => {
        res.status(200).json({ msg: 'Voici la liste des artists', artists })
      })
      .catch((error) => res.status(500).json({ error: error.message }))
}

exports.getAllFilter = (req, res) => {
  ArtistModel.findAll({
    attributes: {
      exclude: ['email', 'password', 'createdAt', 'updatedAt', 'viewCount'],
    },
  })
    .then((artists) => {
      res.status(200).json({ msg: 'Voici la liste des artists', artists })
    })
    .catch((error) => res.status(500).json({ error: error.message }))
}

// Récupérer un artist
exports.getOne = (req, res) => {
  const { id } = req.params
  console.log(id)

  Artists.findByPk(id, {
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
    if (error) return res.status(401).json({ error: error.details[0].message })
    ArtistModel.findByPk(id)

      .then((artist) => {
        if (!artist)
          return res.status(404).json({ error: "l'artist n'existe pas" })
        const { password } = body
        if (password) {
          const hashedPassword = bcrypt.hashSync(password, 10)

          // si le body contient de la data, on la modifie, sinon on garde la data existante
          artist.roles = body.roles || artist.role
          artist.email = body.email || artist.email
          artist.password = hashedPassword || artist.password
          artist.artist_name = body.artist_name || artist.artist_name
          artist.name = body.name || artist.name
          artist.first_name = body.first_name || artist.first_name
          artist.biography = body.biography || artist.biography
          artist.img_profile = body.img_profile || artist.img_profile
          artist.birth_date = body.birth_date || artist.birth_date
        }
        artist
          .save()

          .then(() =>
            res.status(200).json({ msg: "l'artist a bien été modifiée", artist })
          )
          .catch((error) => res.status(500).json({ error: error.message }))
      })
      .catch((error) => res.status(500).json({ error: error.message }))
}

// Supprimer une artist
exports.deleteOne = (req, res) => {
  const { id } = req.params
  ArtistModel.destroy({ where: { id } })
    .then((ressource) => {
      if (ressource === 0)
        return res.status(404).json({ error: "l'artist n'existe pas" })
      res.status(200).json({ msg: "l'artist a bien été supprimée" })
    })
    .catch((error) => res.status(500).json({ error: error.message }))
}

exports.getByEmail = (req, res) => {
  console.log(req.params)
  const { email } = req.params
  ArtistModel.findOne({ where: { email } })
    .then((artists) => {
      if (!artists)
        return res.status(404).json({ error: "l'artist n'existe pas" })
      res.status(200).json({ msg: "Voici l'artist", artists })
    })
    .catch((error) => res.status(500).json({ error: error.message }))
}
