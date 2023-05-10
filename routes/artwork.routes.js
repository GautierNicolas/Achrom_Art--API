const express = require('express')
const router = express()
const {createOne, deleteOne, getAll, getOne, updateOne} = require('../controllers/artwork.controller')
const {authentification, restrictToOwnUser} = require('../middlewares/auth.middleware')
const multer = require('../middlewares/multer.middleware')
const sharp = require('sharp')

// Rendu des vues avec EJS
// router 
//     .get('/', (req, res) => {
//         res.render('artworks.ejs', { title: 'multer Images' })
//     })
    
router
    // .set('view engine', 'ejs')
    .route('/')
        .get(getAll)
        .post(createOne)
    
router
    .route('/:id')
        .get(getOne)
        .put(updateOne)
        .delete(authentification, restrictToOwnUser, deleteOne)
    
module.exports = router