import db from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';

// const Sequelize = new sequelize();
const users = db.users;
const Op = Sequelize.Op;

class Users {
  signup(req, res) {
    //console.log(req.body);
    users.find({
      where: {
        email: req.body.email
      }
    }).then(found => {
      if (found) {
        res.status(400).send({
          message: 'User already Exist!'
        });
      } else {
        // Validating user input
        if (!req.body.username) {
          res.status(400).send({
            message: 'Please Enter Username'
          });
        } else if (!req.body.email) {
          res.status(400).send({
            message: 'Please Enter Email'
          });
        } else if (!req.body.password) {
          res.status(400).send({
            message: 'Please Enter password'
          });
        } else {
          if (req.body.password === req.body.cpassword) {
            return users
              .create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
              }).then(register => res.status(201).send(register))
              .catch(error => {
                res.status(404).send(error);
              });
          } else {
            res.status(400).send({
              message: 'Password Missmatch!'
            });
          }
        }
      }
    });
  }

  signin (req, res) {
    //console.log(req.body)
    if (!req.body.username) {
      res.status(400).send({
        message: 'Please enter Your username or email'
      });
    } else if (!req.body.password) {
      res.status(400).send({
        message: 'Please enter Your Password'
      });
    } else {
      return users
        .findOne({
          where: {
            [Op.or] : [
              { email: req.body.username },
              { username: req.body.username}

            ]
          }
        }).then(found => {
          // console.log(found)
          if (!found) {
            res.status(404).send({
              message: 'User does NOT exist!'
            });
          } else if (bcrypt.compareSync(req.body.password, found.password)) {
            // console.log(found.role)
            const token = jwt.sign({id: found.id}, process.env.SECRET_KEY, {
              expiresIn: 60 * 60 * 24 // Token expires in 24 hours
            });
            return res.status(200).send({
              message: 'Sign in Successful!',
              Token: token
            });
          } else {
            res.status(401).send({
              ERrOR: 'Incorrect Password'
            });
          }
        })
        .catch(error => {
          res.status(404).send(error);
        });
    }
  }
}

export default Users;