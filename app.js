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
const artistsRouter = require('./routes/artists.routes')
const artworksRouter = require('./routes/artworks.routes')
const contactRouter = require('./routes/contact.routes')

app
    .use('/api/artists', artistsRouter)
    .use('/api/artworks', artworksRouter)
    .use('/api/contact', contactRouter)

app.listen(port, () => {
    console.log(`L'application ecoute le port ${port}`)
})