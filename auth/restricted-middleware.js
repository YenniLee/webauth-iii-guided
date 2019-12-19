const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  // const token = req.headers.authorization;
  const { authorization } = req.headers;
  if (authorization) {
    const secret = process.env.JWT_SECRET || 'is it secret?';

    jwt.verify(authorization, secret, function(err, decodedToken) {
      if (err) {
        res.status(401).json({ message: 'Invalid token.' })
      } else {
        req.token = decodedToken;
  
        next();
      }
    })
  } else {
    res.status(400).json({ message: 'Unabe to login.' })
  }

};

// const { username, password } = req.headers;

//   if (username && password) {
//     Users.findBy({ username })
//       .first()
//       .then(user => {
//         if (user && bcrypt.compareSync(password, user.password)) {
//           next();
//         } else {
//           res.status(401).json({ message: 'Invalid Credentials' });
//         }
//       })
//       .catch(error => {
//         res.status(500).json({ message: 'Ran into an unexpected error' });
//       });
//   } else {
//     res.status(400).json({ message: 'No credentials provided' });
//   }
// };

