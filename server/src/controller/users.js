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
    const { firstName, lastName, username, email, password} = req.body;
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
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: bcrypt.hashSync(password, 10)
          }).then(register => res.status(201).json(register))
          .catch(error => res.status(400).json({ message: error.errors[0].message }));
      }
    });
  }

  signin (req, res) {
    const { username, password } = req.body;
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
      .catch(() => {
        return res.status(500).json({
          message: 'Some error occured!'
        });
      });
  }

}

export default Users;