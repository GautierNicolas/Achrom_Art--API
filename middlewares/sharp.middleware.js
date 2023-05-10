const sharp = require('sharp')

exports.sharp(imagePath)
    .resize(2000)
    .toFile(`uploads/resized-${req.file.originalname}`)
    .then(() => {
      console.log('Image uploaded and resized successfully')
    })
    .catch((error) => {
        console.log('COMPOSANT SHARP CATCH' + error)
    })     