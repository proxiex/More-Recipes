// route middleware that will happen on every request
import jwt from 'jsonwebtoken';

require('dotenv').config();

const key = process.env.SECRET_KEY;

const authenticate = {
  Verify: (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-token'];
    if (!token) {
      return res.status(401).send({
        message: 'Unauthorised User!'
      });
    }

    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: 'Token could not be authenticated'
        });
      }
      req.decoded = decoded;
      next();
    });
  }
};

export default authenticate;
