const { Op, ValidationError, UniqueConstraintError } = require('sequelize')
const {ArtworkModel, ArtistModel, CategorieModel} = require('../db/sequelize')


exports.getAll = (req, res) => {
    ArtworkModel.findAll({
      include: [ArtistModel, CategorieModel],
      order: [['id', 'DESC']]
    })
    .then((artwork) => {
      const msg = "La liste des artwork a bien été trouvé"
      res.json({ msg, data: artwork })
    })
    .catch((error) => {
      const msg = "La liste des artwork n'a pas pu être récupéré"
      res.status(500).json({ msg, data: error })
    })
  }