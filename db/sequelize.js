const { Sequelize, DataTypes} = require('sequelize')
const ArtistsModelSequelize = require('../models/artists')
const ArtworksModelSequelize = require('../models/artworks')
const MessagesModelSequelize = require('../models/contact')

// Création de donnée achromart2
const sequelize = new Sequelize('achromart2', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
})

// Création de mes tables sur la base de leur modèle Sequelize
const ArtistsModel = ArtistsModelSequelize(sequelize, DataTypes)
const ArtworksModel = ArtworksModelSequelize(sequelize, DataTypes)
const MessagesModel = MessagesModelSequelize(sequelize, DataTypes)
// Définition des relations

// Initialisation de la base de donnée
const initDb = () => {
    return sequelize.sync()
}

sequelize
    .authenticate()
    .then(() =>
        console.log(`La connection à la base de donnée est établie`)
    )
    .catch((error) =>
        console.error(`Impossible de se connecter à la base de donnée ${error}`)
    )

module.exports = {
    ArtistsModel,
    ArtworksModel,
    MessagesModel,
    initDb
}