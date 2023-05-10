const multer = require('multer')

// Dictionnaire des types MIME
const MYME_TYPES = {
    'image/jpg': '.jpg',
    'image/jpeg': '.jpg',
    'image/png': '.png'
}

// La destination des fichiers et génration du nom unqiue
const storage = multer.diskStorage({
    // Le dossier de destination
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    // Le nom du fichier
    filename: (req, file, cb) => {
        // On génère un nom unique
        const name = Date.now() + MYME_TYPES[file.mimetype]
        cb(null, name)
    }
})

// Vérification du type de fichier
const fileFilter = (req, file, cb) => {
    // Vérifiez que le type de fichier est accepté
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Format de fichier non autorisé'), false);
    }
  };

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});


module.exports = upload