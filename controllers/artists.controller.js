const bcrypt = require('bcrypt')
const {ArtistsModel} = require('../db/sequelize')


// Récupérer tout les artists
exports.getAll = (req, res) => {
  ArtistsModel.findAll({
    attributes: {
      exclude: ['email', 'password', 'createdAt', 'updatedAt', 'viewCount'],
    },
  })
    .then((artists) => {
      res.status(200).json({ msg: 'Voici la liste des artists', artists })
    })
    .catch((error) => res.status(500).json({ error: error.message }))
}

exports.getAllFilter = (req, res) => {
  ArtistsModel.findAll({
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
  ArtistsModel.findByPk(id)

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
  ArtistsModel.destroy({ where: { id } })
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
  ArtistsModel.findOne({ where: { email } })
    .then((artists) => {
      if (!artists)
        return res.status(404).json({ error: "l'artist n'existe pas" })
      res.status(200).json({ msg: "Voici l'artist", artists })
    })
    .catch((error) => res.status(500).json({ error: error.message }))
}
