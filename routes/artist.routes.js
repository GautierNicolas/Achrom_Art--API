const express = require('express');
const router = express.Router();
const {getAll, getOne, updateOne, deleteOne} = require('../controllers/artist.controller')
const {login, signup} = require('../controllers/auth.controller')
const {authentification, restrictToOwnUser} = require('../middlewares/auth.middleware')

router
    .route('/')
    .get(getAll)

router
    .route('/:id')
    .get(getOne)
    .put(authentification, restrictToOwnUser, updateOne)
    .delete(authentification, restrictToOwnUser, deleteOne)

router
    .route('/auth/login')
    .post(login)

router
    .route('/auth/register')
    .post(signup)

module.exports = router