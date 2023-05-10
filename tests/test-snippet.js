const { Sequelize } = require('sequelize')

// Paramêtres Sequelize pour la connexion à la base de donnée setDatabseName
const sequelize = new Sequelize('setDatabseName', 'setUserDB', 'setPasswordDB', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
})