const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artists.controller')

router
    .route('/')
    .get(artistController.getAll)

router
    .route('/login')
    .post()

router
    .route('/signup')
    .post()

module.exports = router;