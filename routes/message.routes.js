const express = require('express')
const router = express()
const multer = require('../middlewares/multer.middleware')
const { deleteOne, getAll, getOne, updateOne, createOne } = require('../controllers/message.controller')
                    
router
    .route('/')
    .get(getAll)
    .post(createOne)

router
    .route('/:id')
    .get(getOne)
    .put(updateOne)
    .delete(deleteOne)

module.exports = router