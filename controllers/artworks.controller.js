const { Op, ValidationError, UniqueConstraintError } = require('sequelize')
const {ArtworkModel, ArtistModel, CategorieModel} = require('../db/sequelize')
const {protectId, restrictTo} = require('../controllers/auth.controller')



// Récupérer toutes les oeuvres
exports.getAll = (req, res) => {
  ArtworkModel.findAll({
    include: [ArtistModel.scope("withoutPassword"), CategorieModel]
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
  ArtworkModel.findByPk(req.params.id, {
    include: [ArtistModel.scope("withoutPassword"), CategorieModel]
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
  ArtworkModel.create(req.body)
    .then((artwork) => {
      if(artwork === null) {
        const msg = "L'artworks n'est pas conforme"
        res.status(404).json({ msg })
      } else {
          artwork.addArtists(req.headers.userid)
          const msg = "L'oeuvre a bien été créée"
          res.status(201).json({ msg, artwork })
      }
    })
    .catch((error) => {
      if (
        error instanceof ValidationError ||
        error instanceof UniqueConstraintError
      ) {
        return res.status(400).json({ message: error.message, data: error })
      } 
      const msg = "Impossible de créer l'artworks"
        res.status(500).json({ msg, message: error.message, data: error })
    })
}

//  Modifier une oeuvre
exports.updateOne = (req, res) => {
  ArtworkModel.update(req.body, {
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
  ArtworkModel.destroy({ where: { id } })
    .then((ressource) => {
      if (ressource === 0)
        return res.status(404).json({ error: "L'oeuvre n'existe pas" })
      res.status(200).json({ msg: "L'oeuvre a bien été supprimée" })
    })
    .catch((error) => res.status(500).json({ error: error.message }))
}


