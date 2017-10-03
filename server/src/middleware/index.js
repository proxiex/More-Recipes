// route middleware that will happen on every request
import jwt from 'jsonwebtoken';
import app from '../app';

const authenticate = {
  Verify: (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-token'];
    if (!token) {
      return res.status(403).send({
        message: 'Unauthorised User!'
      });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      console.log(app);
      if (err) {
        return res.status(403).send({
          error: 'Token could not be authenticated'
        });
      }
      req.decoded = decoded;
      next();
    });
  }
};

export default authenticate;
