import db from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';

// const Sequelize = new sequelize();
const users = db.users;
const Op = Sequelize.Op;

class Users {
  signup (req, res) {
    const { firstName, lastName, email, username, password, confirmPassword } = req.body;
    if(!firstName) {
      return res.status(400).send({
        message: 'Please enter Your First Name!'
      });
    } else if (!lastName){
      return res.status(400).send({
        message: 'Please enter Your Last Name!'
      });
    } else if (!email) {
      return res.status(400).send({
        message: 'Please enter Your Email!'
      });
    } else if(!username) {
      return res.status(400).send({
        message: 'Please enter Your Username!'
      });
    } else if (!password) {
      return res.status(400).send({
        message: 'Please enter Your Password'
      });
    } else if (password !== confirmPassword) {
      return res.status(400).send({
        message: 'Password Mismatch!!'
      });
    } else {
      users.find({
        where: {
          [Op.or] : [
            { email: email },
            { username: username }
          ]
        }
      }).then(foundUser => {
        console.log('Found user: ' + foundUser);

        if (!foundUser) {
          return users
            .create({
              firstName: firstName,
              lastName: lastName,
              email: email.trim().toLowerCase(),
              username: username.trim().toLowerCase(),
              password: bcrypt.hashSync(password, 10)
            }).then(signup => {
              res.status(201).send(signup);
            })
            .catch(err => {
            // console.log(Sequelize.ValidationErrorItem.message);
              if (Sequelize.ValidationError) {
                return res.status(400).send({
                  message: 'Invalid Email Address'
                });
              }
              //console.log(err);
              res.status(500).send({
                message: 'Some Error occured!'
              });
            });
        }else if (foundUser.email === email) {
          res.status(400).send({
            message: 'Email is already associated with another account!'
          });
        } else if (foundUser.userName === username) {
          res.status(400).send({
            message: 'User name already exist!'
          });
        }
      });
    }
  }

  signin (req, res) {
    const { username, password } = req.body;
    if (!username) {
      return res.status(400).send({
        message: 'Please enter Your username or email address'
      });
    } else if (!password) {
      return res.status(400).send({
        message: 'Please enter Your Password'
      });
    } else {
      return users
        .findOne({
          where: {
            [Op.or] : [
              { email: username },
              { username: username }
            ]
          }
        }).then (foundUser => {
          if (!foundUser) {
            return res.status(404).send({
              message: 'User NOT found!'
            });
          } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            // console.log(found.role)
            const token = jwt.sign({ id: foundUser.id }, process.env.SECRET_KEY, {
              expiresIn: 60 * 60 * 24 // Token expires in 24 hours
            });
            return res.status(200).send({
              message: 'Sign in Successful!',
              token: token
            });
          } else {
            return res.status(404).send({
              message: 'User NOT found!'
            });
          }
        });
    }
  }
}

export default Users;