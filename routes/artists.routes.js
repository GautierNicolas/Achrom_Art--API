const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artists.controller')
const authController = require('../controllers/auth.controller')

router
    .route('/')
    .get(artistController.getAll)

router
    .route('/login')
    .post(authController.login)

router
    .route('/signup')
    .post(authController.signup)

module.exports = router;