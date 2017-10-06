import db from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';

require('dotenv').config();

const key = process.env.SECRET_KEY;
const users = db.users;
const Op = Sequelize.Op;

class Users {
  signup(req, res) {
    
    // Validating user input
    const { firstName, lastName, username, email, password, confirmPassword} = req.body;
    console;
    if (!firstName || typeof firstName !== 'string') {
      return res.status(400).json({
        message: 'Please Enter First Name'
      });
    } else if (!lastName || typeof lastName !== 'string') {
      return res.status(400).json({
        message: 'Please Enter Last Name'
      });
    } else if (!username || typeof username !== 'string') {
      return res.status(400).json({
        message: 'Please Enter Username'
      });
    } else if (!email || typeof email !== 'string') {
      return res.status(400).json({
        message: 'Please Enter Email'
      });
    } else if (!password || typeof  password !== 'string') {
      return res.status(400).json({
        message: 'Please Enter password'
      });
    } else if (password.length < 6) {
      return res.status(400).json({
        message: 'Password is too short!'
      });
    } else if (password !== confirmPassword) {
      return res.status(400).json({
        message: 'Password Missmatch!'
      });
    }
    users.find({
      where: {
        [Op.or]: [
          { email: email },
          { username: username}
        ]
      }
    }).then(found => {
      if (found) {
        res.status(400).json({
          message: 'User already Exist!'
        });
      } else {
        return users
          .create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
          }).then(register => res.status(201).json(register))
          .catch(error => res.status(400).json({ message: error.errors[0].message }));
      }
    });
  }

  signin (req, res) {
    const { username, password } = req.body;
    if (!username || typeof username !== 'string') {
      res.status(400).json({
        message: 'Please enter Your username or email'
      });
    } else if (!password || typeof password !== 'string') {
      res.status(400).json({
        message: 'Please enter Your Password'
      });
    } else {
      return users
        .findOne({
          where: {
            [Op.or] : [
              { email: username },
              { username: username}

            ]
          }
        }).then(found => {
          if (!found) {
            return res.status(400).json({
              message: 'Incorrect signin credentials!'
            });
          } else if (bcrypt.compareSync(req.body.password, found.password)) {
            const token = jwt.sign({id: found.id}, key, {
              expiresIn: 60 * 60 * 24 // Token expires in 24 hours
            });
            return res.status(200).json({
              message: 'Sign in Successful!',
              Token: token
            });
          } else {
            return res.status(400).json({
              message: 'Incorrect signin credentials'
            });
          }
        })
        .catch(error => {
          console.log(error);
          return res.status(500).json({
            message: 'Some error occured!'
          });
        });
    }
  }
}

export default Users;