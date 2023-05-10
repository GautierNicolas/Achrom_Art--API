var express = require('express')
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

var app = express()
app.use(cookieParser('moncodesecret'))



app
    .set('view engine', 'ejs')
    // Test cookie-parser, cookie-parser est un middleware qui permet de parser les cookies

    .get('/', (req, res) => {
        // ... vérifier les informations d'authentification ...
      
        // Si les informations d'authentification sont valides, générer le token JWT
        const token = jwt.sign({ userId: '123' }, 'secret');
      
        // Stocker le token dans un cookie
        res.cookie('jwt', token, {
             signed: true, // signe le cookie avec la clé secrète
             httpOnly: true,  // le cookie ne sera pas accessible via JavaScript
             secure: true, // le cookie ne sera envoyé que via HTTPS
             sameSite: 'strict' // prévient les failles CSRF en bloquant les requêtes de sites tiers
           });

        // Répondre au client avec le token généré
        res.status(200).json({ token });

    })

    app.get('/post', (req, res) => {
        // Récupérer le token stocké dans le cookie
        // signedcookie est une méthode de cookie-parser qui permet de récupérer les cookies signés et vérifier leur signature
        const token = req.cookies.jwt;
        
        if (!token) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
        // Vérifier le token et extraire les informations qu'il contient
        try {
          const verified = jwt.verify(token, 'secret');
          req.user = verified;
          res.status(200).json({ message: 'Welcome to the authentificationed endpoint!' });
        } catch (err) {
          res.status(400).json({ message: 'Invalid token' });
        }
    });

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

