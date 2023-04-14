const { Op, ValidationError, UniqueConstraintError } = require('sequelize')
const {ArtworksModel, ArtistsModel, CategoriesModel} = require('../db/sequelize')


// Récupérer toutes les oeuvres
exports.getAll = (req, res) => {
  ArtworksModel.findAll({
    include: [ArtistsModel.scope("withoutPassword"), CategoriesModel]
  })
  .then((results) => {
    const msg = "La liste des artworks a bien été trouvé"
    res.json({ msg, data: results })
  })
  .catch((error) => {
    const msg = "La liste des artworks n'a pas pu être récupéré"
    res.status(500).json({ msg, data: error })
  })
}

// Récupérer une oeuvre
exports.getOne = (req, res) => {
  ArtworksModel.findByPk(req.params.id, {
    include: [ArtistsModel.scope("withoutPassword"), CategoriesModel]
  })
  .then((artworks) => {
    if(artworks === null) {
      const msg = "L'artworks n'existe pas"
      res.status(404).json({ msg })
    } else {
      const msg = "L'artworks à bien été récupéré"
      res.json({ msg, data: results })
    }
  })
  .catch(error => {
    const msg = "L'artworks n'a pas pu être récuépré"
    res.status(500).json({msg, data: error})
  })
}

// Créer une oeuvre
exports.createOne = (req, res) => {
  const { body } = req
  ArtworksModel.create(body)
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
  ArtworksModel.update(req.body, {
    where: {
      id: req.params.id,
    }
  })
    .then((artworks) => {
      if(artworks === null) {
        const msg = "L'oeuvre demandé n'existe pas."
        res.json({message: msg})
      } else {
        const msg = "L'oeuvre à bien été modifié."
        res.json({ message: msg, data: artworks })
      }
    })
    .catch((error) => {
      if(
        error instanceof UniqueConstraintError || error instanceof ValidationError
      ) {
        return res.status(400).json({ message: error.message, data: error })
      }
      const msg = "Impossible de mettre à jour l'artworks"
      res.status(500).json({ message: msg })
  })
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


