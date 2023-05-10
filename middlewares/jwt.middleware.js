const jwt = require('jsonwebtoken');


exports.tokenVerify((req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          res.clearCookie('jwt');
          res.status(401).send('Invalid token.');
        } else {
          req.user = decodedToken;
          next();
        }
      });
    } else {
      res.status(401).send('Token not found.');
    }
  });