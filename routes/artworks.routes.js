const express = require('express')
const router = express()
const {createOne, deleteOne, getAll, getOne, updateOne} = require('../controllers/artworks.controller')
const {protect, restrictTo} = require('../middlewares/auth.middleware')
router
    .route('/')
    .get(getAll)
    .post(protect, createOne)

router
    .route('/:id')
    .get(getOne)
    .put(updateOne)
    .delete(deleteOne)

module.exports = router