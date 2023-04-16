const express = require('express')
const morgan = require('morgan')
// const serveFavicon = require('serve-favicon')
const sequelize = require('./db/sequelize')

const app = express()
const port = 3000

sequelize.initDb()

// Middleware
app
    .use(morgan('dev'))
    .use(express.json())
    // .use(serveFavicon(__dirname + '/favicon.ico'))

// Routes
const artistRouter = require('./routes/artist.routes')
const artworkRouter = require('./routes/artwork.routes')
const messageRouter = require('./routes/message.routes')

app
    .use('/api/artists', artistRouter)
    .use('/api/artworks', artworkRouter)
    .use('/api/messages', messageRouter)

app.listen(port, () => {
    console.log(`L'application ecoute le port ${port}`)
})