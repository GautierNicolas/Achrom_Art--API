const { Sequelize, DataTypes} = require('sequelize')
const ArtistModelSequelize = require('../models/artist.model')
const ArtworkModelSequelize = require('../models/artwork.model')
const MessageModelSequelize = require('../models/message.model')
const CategorieModelSequelize = require('../models/categorie.model')
const CountrieModelSequelize = require('../models/countrie.model')

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
ArtistModel.belongsToMany(ArtworkModel, {through: 'artworks_artists', foreignKey: "artistId"})
ArtworkModel.belongsToMany(ArtistModel, {through: 'artworks_artists', foreignKey: "artworkId"})

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
    // // Création de 50 utilisateurs
    // .then(() => {
    //     for (let i = 0; i < 50; i++) {
    //         ArtistModel.create({
    //             artist_name: `artist${i}`,
    //             email: `  ${ i }@gmail.com`,
    //             password: bcrypt.hashSync('password', 10),
    //             name : `name${i}`,
    //             first_name : `first_name${i}`,
    //             biography : `biography${i}`,
    //             birth_date : `2020-10-10`
    //         })
    //     }
    // })
    // // Création de 50 oeuvres
    // .then(() => {
    //     for (let i = 0; i < 50; i++) {
    //         ArtworkModel.create({
    //             title: `artwork${i}`,
    //             description: `artwork${i} description`,
    //             src: `artwork${i}.jpg`,
    //             year: 1990,
            
    //         })
    //     }
    // })
    // // Création de 50 messages
    // .then(() => {
    //     for (let i = 0; i < 50; i++) {
    //         MessageModel.create({
    //             title: `message${i}`,
    //             email: `${ i }@gmail.com`,
    //             request: `message${i} content`,
    //         })
    //     }
    // })
    // bcrypt.hash('mdp', 10)
    //     .then((hash) => {
    //         ArtistModel.create({
    //             artist_name: 'paul',
    //             password: hash,
    //             roles: ['artist', 'admin']
    //         })
    //     })
    //     .catch(err => console.log(err))
    // bcrypt.hash('mdp', 10)
    // .then((hash) => {
    //     ArtistModel.create({
    //         artist_name: 'pierre',
    //         password: hash,
    //         roles: ['artist']
    //     })
    // })
    // .catch(err => console.log(err))
    // gestion des erreurs 
    .catch(error => console.log('Erreur lors de la connexion', error))

module.exports = {
    ArtistModel,
    ArtworkModel,
    MessageModel,
    CategorieModel,
    initDb
}