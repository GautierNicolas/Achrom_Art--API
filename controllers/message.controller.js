const { ValidationError } = require('sequelize')
const { MessageModel } = require('../db/sequelize')

// Récupérer toutes les messages
exports.getAll = (req, res) => {
    MessageModel.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'viewCount'] },
      order: [['id', 'DESC']]
    })
      .then((messages) => {
        res.status(200).json({ msg: 'Voici la liste des messages', messages })
      })
      .catch((error) => res.status(500).json({ error: error.message }))
}
  
  // Récupérer une message
exports.getOne = (req, res) => {
  MessageModel.findByPk(req.params.id, {
    attributes: { exclude: ['createdAt', 'updatedAt', 'viewCount'] },
  })
    .then((message) => {
      if (message === null) {
        const msg = "Le message n'existe pas"
        res.status(404).json({ msg })
      }
      if (!message.read) {
        message.read = true
        message.save()
      }
      res.status(200).json({ msg: 'Voici le message', message })
    })
    .catch((error) => res.status(500).json({ error: error.message }))
}
  
// Créer une message
exports.createOne = (req, res) => {
  MessageModel.create(req.body)
    .then((message) => {
      if(!message) {
        const msg = "Le message n'a pas été créée"
        return res.status(404).json({ msg })
      } else {
        const msg = "Le message a bien été créée"
        return res.status(201).json({ msg, message })
      }
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ errors: error.errors })
      }
      const msg = "Impossible de créer le message"
      res.status(500).json({ msg, message: error.message, data: error })
    })      
}
  
//  Modifier une message
exports.updateOne = (req, res) => {
  const { body } = req
  const { id } = req.params
  MessageModel.findByPk(id)
    .then((messages) => {
      if (!messages)
        return res.status(404).json({ error: "Le message n'existe pas" })

      messages.title = body.title
      messages.mail = body.description
      messages.phone = body.src
      messages.request = body.year
      messages.read = body.read
      messages
        .save()

        .then(() =>
          res
            .status(200)
            .json({ msg: 'Le message a bien été modifiée', messages })
        )
        .catch((error) => res.status(500).json({ error: error.message }))
    })
    .catch((error) => res.status(500).json({ error: error.message }))
}
  
// Supprimer une message
exports.deleteOne = (req, res) => {
  const { id } = req.params
  MessageModel.destroy({ where: { id } })
    .then((message) => {
      if (!message)
        return res.status(404).json({ error: "Le message n'existe pas" })
      res.status(200).json({ msg: 'Le message a bien été supprimée' })
    })
    .catch((error) => res.status(500).json({ error: error}))
}
  
