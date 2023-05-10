const express = require('express')
const morgan = require('morgan')
const sequelize = require('./db/sequelize')
const cookieParser = require('cookie-parser')

// const serveFavicon = require('serve-favicon')

const app = express()
const port = 3000;

sequelize.initDb( { force: false })

// Middleware
app
    .use(morgan('dev'))
    .use(express.json())
    .use(cookieParser('secret'))
    // .use(serveFavicon(__dirname + '/favicon.ico'))

// Routes
const artistRouter = require('./routes/artist.routes')
const artworkRouter = require('./routes/artwork.routes')
const messageRouter = require('./routes/message.routes')

app
    .use('/api/artists', artistRouter)
    .use('/api/artworks', artworkRouter)
    .use('/api/messages', messageRouter)

// Lancement du serveur
app.listen(3000, () => {
    console.log(`L'application ecoute le port ${port}`)
})
