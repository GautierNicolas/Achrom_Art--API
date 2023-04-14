const { Sequelize, DataTypes} = require('sequelize')
const ArtistsModelSequelize = require('../models/artists')
const ArtworksModelSequelize = require('../models/artworks')
const MessagesModelSequelize = require('../models/contact')
const CategoriesModelSequelize = require('../models/categories')
const CountriesModelSequelize = require('../models/countries')

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
const CategoriesModel = CategoriesModelSequelize(sequelize, DataTypes)
const CountriesModel = CountriesModelSequelize(sequelize, DataTypes)

// Définition des relations
// Artworks / Artists many to many
ArtistsModel.belongsToMany(ArtworksModel, {through: 'artworks_artists'})
ArtworksModel.belongsToMany(ArtistsModel, {through: 'artworks_artists'})

// Artworks / Categories many to many
ArtworksModel.belongsToMany(CategoriesModel, {through: 'artworks_categories'})
CategoriesModel.belongsToMany(ArtworksModel, {through: 'artworks_categories'})

// Artists / Countries many to many
ArtistsModel.belongsToMany(CountriesModel, {through: 'artists_Countries'})
CountriesModel.belongsToMany(ArtistsModel, {through: 'artists_Countries'})


// Initialisation de la base de donnée
const initDb = () => {
    return sequelize.sync()
    .then(() => console.log('Connexion établie'))
    .catch(error => console.log('Erreur lors de la connexion', error))
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
    CategoriesModel,
    initDb
}