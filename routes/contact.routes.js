const express = require('express')
const router = express()
const { deleteOne, getAll, getOne, updateOne } = require('../controllers/contact.controller')

router
    .route('/')
    .get(getAll)

router
    .route('/:id')
    .get(getOne)
    .put(updateOne)
    .delete(deleteOne)

module.exports = router