import db from '../models';
import bcrypt from 'bcrypt';
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
};

export default Users;