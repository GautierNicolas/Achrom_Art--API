const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artists.controller')
const authController = require('../controllers/auth.controller')

router
    .route('/')
    .get(artistController.getAll)

router
    .route('/:id')
    .get(artistController.getOne)
    .put(artistController.updateOne)
    .delete(artistController.deleteOne)

router
    .route('/auth/login')
    .post(authController.login)

router
    .route('/auth/register')
    .post(authController.signup)

module.exports = router