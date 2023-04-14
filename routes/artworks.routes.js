const express = require('express')
const router = express()
const {createOne, deleteOne, getAll, getOne, updateOne} = require('../controllers/artworks.controller')

router
    .route('/')
    .get(getAll)

router
    .route('/:id')
    .get(getOne)
    .post(createOne)
    .put(updateOne)
    .delete(deleteOne)

module.exports = router