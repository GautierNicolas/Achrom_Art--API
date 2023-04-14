const { MessagesModel } = require('../db/sequelize')

// Récupérer toutes les messages
exports.getAll = (req, res) => {
    MessagesModel.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'viewCount'] },
    })
      .then((messages) => {
        res.status(200).json({ msg: 'Voici la liste des messages', messages })
      })
      .catch((error) => res.status(500).json({ error: error.message }))
  }
  
  // Récupérer une message
  exports.getOne = (req, res) => {
    const { id } = req.params
    MessagesModel.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt', 'viewCount'] },
    })
      .then((message) => {
        if (!message)
          return res.status(404).json({ error: "Le message n'existe pas" })
        if (message.read === false) {
          message.read = true
          message.save()
        }
        res.status(200).json({ msg: 'Voici le message', message })
      })
      .catch((error) => res.status(500).json({ error: error.message }))
  }
  
  // Créer une message
  const createOne = (req, res) => {
    const { body } = req
    if (error) return res.status(401).json({ error: error.details[0].message })
  
    MessagesModel.create(body)
      .then((message) =>
        res.status(201).json({ msg: 'Le message a bien été créée', message })
      )
      .catch((error) => res.status(500).json({ error: error.message }))
  }
  
  //  Modifier une message
  exports.updateOne = (req, res) => {
    const { body } = req
    const { id } = req.params
    MessagesModel.findByPk(id)
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
    Messages.destroy({ where: { id } })
      .then((ressource) => {
        if (ressource === 0)
          return res.status(404).json({ error: "Le message n'existe pas" })
        res.status(200).json({ msg: 'Le message a bien été supprimée' })
      })
      .catch((error) => res.status(500).json({ error: error.message }))
  }
  
