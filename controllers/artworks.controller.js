const { Op, ValidationError, UniqueConstraintError } = require('sequelize')
const {ArtworksModel} = require('../db/sequelize')


// Récupérer toutes les oeuvres
exports.getAll = (req, res) => {
  if (req.query.search) {
    const { search } = req.query

    ArtworksModel.findAll({ where: { title: { [Op.like]: `%${search}%` } } })
      .then((artworks) => {
        if (!artworks.length) {
          return res
            .status(404)
            .json({ error: "Aucune oeuvre n'a été trouvée" })
        }
        res.json({ msg: "Voici l'oeuvre", artworks })
      })
      .catch((error) => res.status(500).json({ error: error.message }))
  } else {
    ArtworksModel.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'viewCount'] },
    })
      .then((artworks) => {
        res.status(200).json({ msg: 'Voici la liste des oeuvres', artworks })
      })
      .catch((error) => res.status(500).json({ error: error.message }))
  }
}

// Récupérer une oeuvre
exports.getOne = (req, res) => {
  const { id } = req.params
  Artworks.findByPk(id, {
    attributes: { exclude: ['createdAt', 'updatedAt', 'viewCount'] },
  })
    .then((artwork) => {
      if (!artwork)
        return res.status(404).json({ error: "L'oeuvre n'existe pas" })
      res.status(200).json({ msg: "Voici l'oeuvre", artwork })
    })
    .catch((error) => res.status(500).json({ error: error.message }))
}

// Créer une oeuvre
exports.createOne = (req, res) => {
  const { body } = req
  if (error) return res.status(401).json({ error: error.details[0].message })
  console.log(body)
  Artworks.create(body)

    .then((artwork) => {
      res.status(201).json({ msg: "L'oeuvre a bien été créée", artwork })
    })
    .catch((error) => {
      if (
        error instanceof ValidationError ||
        error instanceof UniqueConstraintError
      ) {
        res.status(400).json({ message: error.message })
      } else {
        res.status(500).json({ error: error.message })
      }
    })
}

//  Modifier une oeuvre
exports.updateOne = (req, res) => {
  const { body } = req
  const { id } = req.params

  ArtworksModel.findByPk(id)
    .then((artworks) => {
      if (!artworks)
        return res.status(404).json({ error: "L'oeuvre n'existe pas" })
      // if (req.headers.privilege_acces !== 'admin' && req.headers.id !== artworks.user_id) return res.status(401).json({error: "Vous n'avez pas les droits pour modifier cette oeuvre"})

      artworks.title = body.title || artworks.title
      artworks.description = body.description || artworks.description
      artworks.src = body.src || artworks.src
      artworks.year = body.year || artworks.year
      artworks.view_count = body.view_count || artworks.view_count

      artworks
        .save()

        .then(() =>
          res
            .status(200)
            .json({ msg: "L'oeuvre a bien été modifiée", ArtworksModel })
        )
        .catch((error) => res.status(500).json({ error: error.message }))
    })
    .catch((error) => res.status(500).json({ error: error.message }))
}

// Supprimer une oeuvre
exports.deleteOne = (req, res) => {
  const { id } = req.params
  ArtworksModel.destroy({ where: { id } })
    .then((ressource) => {
      if (ressource === 0)
        return res.status(404).json({ error: "L'oeuvre n'existe pas" })
      res.status(200).json({ msg: "L'oeuvre a bien été supprimée" })
    })
    .catch((error) => res.status(500).json({ error: error.message }))
}


