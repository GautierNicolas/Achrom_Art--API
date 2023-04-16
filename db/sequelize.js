const { Sequelize, DataTypes} = require('sequelize')
const bcrypt = require('bcrypt')
const ArtistModelSequelize = require('../models/artists')
const ArtworkModelSequelize = require('../models/artworks')
const MessageModelSequelize = require('../models/contact')
const CategorieModelSequelize = require('../models/categories')
const CountrieModelSequelize = require('../models/countries')

// Création de donnée achromart2
const sequelize = new Sequelize('achromart2', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
})

// Création de mes tables sur la base de leur modèle Sequelize
const ArtistModel = ArtistModelSequelize(sequelize, DataTypes)
const ArtworkModel = ArtworkModelSequelize(sequelize, DataTypes)
const MessageModel = MessageModelSequelize(sequelize, DataTypes)
const CategorieModel = CategorieModelSequelize(sequelize, DataTypes)
const CountrieModel = CountrieModelSequelize(sequelize, DataTypes)

// Définition des relations
// Artworks / Artists many to many
ArtistModel.belongsToMany(ArtworkModel, {through: 'artworks_artists'})
ArtworkModel.belongsToMany(ArtistModel, {through: 'artworks_artists'})

// Artworks / Categories many to many
ArtworkModel.belongsToMany(CategorieModel, {through: 'artworks_categories'})
CategorieModel.belongsToMany(ArtworkModel, {through: 'artworks_categories'})

// Artists / Countries many to many
ArtistModel.belongsToMany(CountrieModel, {through: 'artists_Countries'})
CountrieModel.belongsToMany(ArtistModel, {through: 'artists_Countries'})

// Initialisation de la base de donnée
const initDb = () => {
    return sequelize.sync()
    .then(() => console.log('Connexion établie'))
    .catch(error => console.log('Erreur lors de la connexion', error))
}

sequelize
    .authenticate()
    .then(() =>
    console.log("La base est bien authentifié")
    //     bcrypt.hash('mdp', 10)
    //       .then((hash) => {
    //           ArtistModel.create({
    //               artist_name: 'paul',
    //               password: hash,
    //               roles: ['artist', 'admin']
    //           })
    //       })
    //       .catch(err => console.log(err))
    //     ,
    //     bcrypt.hash('mdp', 10)
    //     .then((hash) => {
    //         ArtistModel.create({
    //             artist_name: 'pierre',
    //             password: hash,
    //             roles: ['artist']
    //         })
    //     })
    //   .catch(err => console.log(err))
    )
    .catch((error) =>
        console.error(`Impossible de se connecter à la base de donnée ${error}`)
    )

module.exports = {
    ArtistModel,
    ArtworkModel,
    MessageModel,
    CategorieModel,
    initDb
}