const { Op, ValidationError, UniqueConstraintError } = require('sequelize')
const {ArtworkModel, ArtistModel, CategorieModel} = require('../db/sequelize')

// Récupérer toutes les oeuvres
exports.getAll = (req, res) => {
  console.log('GET ALL')

  ArtworkModel.findAll({
    include: [ArtistModel, CategorieModel],
    order: [['id', 'DESC']]
  })
  .then((artwork) => {
    const msg = "La liste des artworks a bien été trouvé"
    res.json({ msg, data: artwork })
  })
  .catch((error) => {
    const msg = "La liste des artwork n'a pas pu être récupéré"
    res.status(500).json({ msg, data: error })
  })
}

// Récupérer une oeuvre
exports.getOne = (req, res) => {
  ArtworkModel.findByPk(req.params.id, {
    include: [ArtistModel.scope("withoutPassword"), CategorieModel]
  })
  .then((artwork) => {
    if(!artwork) {
      const msg = "L'artwork n'existe pas"
      res.status(404).json({ msg })
    } else {
      artwork.view_count += 1
      artwork.save()
      const msg = "L'artwork à bien été récupéré"
      res.json({ msg, data: artwork })
    }
  })
  .catch(error => {
    const msg = "L'artwork n'a pas pu être récuépré"
    res.status(500).json({msg, data: error})
  })
}

// Créer une oeuvre
exports.createOne = (req, res) => {
  ArtworkModel.create(req.body)
    .then(artwork => {
      console.log(artwork + req.headers.userid)
      
      ArtistModel.findByPk(1)
        .then((artist) => {
          console.log(artist)
          artist.addArtwork(artwork)
          res.json({artwork})
        })
        .catch((error) => {
          res.json("erreur dans addArtworks")
        })      
    })
    .catch((error) => {
      res.json("erreur dans le catch ArtworksCreate")
    })
} 

//  Modifier une oeuvre
exports.updateOne = (req, res) => {
  if(res.file){
    req.body.src = req.file.originalname
  }

  ArtworkModel.update(req.body, {
    where: {
      id: req.params.id,
    }
  })
    .then((artwork) => {
      if(!artwork) {
        const msg = "L'oeuvre demandé n'existe pas."
        res.json({message: msg})
      } else {
        const msg = "L'oeuvre à bien été modifié."
        res.json({ message: msg, data: artwork })
      }
    })
    .catch((error) => {
      if(
        error instanceof UniqueConstraintError || error instanceof ValidationError
      ) {
        return res.status(400).json({ message: error.message, data: error })
      }
      const msg = "Impossible de mettre à jour l'artwork"
      res.status(500).json({ message: msg })
  })
}

// Supprimer une oeuvre
exports.deleteOne = (req, res) => {
  ArtworkModel.findByPk(req.params.id)
    .then(artwork => {
        if (!artwork) {
            const message = `Le artwork demandé n'existe pas.`
            return res.status(404).json({ message })
        }
        return ArtworkModel.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(() => {
                const message = `Le artwork ${artwork.name} a bien été supprimé.`
                res.json({ message, data: artwork });
            })
    })
  .catch(error => {
      const message = `Impossible de supprimer le artwork.`
      res.status(500).json({ message, data: error })
  })
}
