import db from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';

require('dotenv').config();

const key = process.env.SECRET_KEY;
const users = db.users;
const recipes = db.recipes;
const favorites = db.favorites;
const reviews = db.reviews;
const votes = db.votes;
const Op = Sequelize.Op;

class Users {
  signup (req, res) {
    const { username, email, password} = req.body;
    users.find({
      where: {
        [Op.or]: [
          { email: email },
          { username: username}
        ]
      }
    }).then(found => {
      if (found) {
        let eremail;
        let erusername;

        if (found.email === email) {
          eremail = 'Email is already in use';
        } 

        if (found.username === username) {
          erusername = 'Username already taken';
        }

        return res.status(400).json({
          eremail,
          erusername
        });

      } else {
        return users
          .create({
            username: username,
            email: email,
            password: bcrypt.hashSync(password, 10)
          }).then(register => res.status(201).json({
            message: 'Signup succesfull',
            register
          }))
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
        } else if (bcrypt.compareSync(password, found.password)) {
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

  profile (req, res) {
    // - get user name
    const userId = req.decoded.id;
    return users
      .findById(userId).then(UserDetails => {
        // -- total number of recipes created by user
        const details = {
          Names: UserDetails.firstName + ' ' + UserDetails.lastName,
          email: UserDetails.email,
          username: UserDetails.username
        };
        recipes.findAndCountAll({
          where: {
            userId: userId
          }
        }).then(result => {
          // collect an array of all users recipes.
          let id = [];
          for (let i = 0; i < result.rows.length; i++ ){
            id.push(result.rows[i].id);
          }
          // - total number of favorites user recipe has
          favorites.count({ where : { recipeId: id } }).then(totalFavorites =>{
            // - total number of likes for user recipes
            votes.count({ where:{ recipeId: id }}).then(totalVotes => {
              // - recipes liked by user
              votes.count({ where: { userId } }).then(userVotes => {
                // - recipes favoried by user
                favorites.count({ where: { userId } }).then(userFavorites => {
                  return res.status(200).json({
                    UserDetails: details,
                    recipes: 'You have crated ' + result.count + ' recipes',
                    Favorited: 'Your recipes have been Favorited ' + totalFavorites + ' times',
                    TotalVotes: 'Your Recipes have recived a total of ' + totalVotes + ' Votes (up and donw)',
                    UserVotes: 'You have voted (up and down) for ' + userVotes + ' recipes',
                    UserFavorites: 'You have favorited ' + userFavorites + ' recipes'
                  });
                });
              });
            });
          });
        });
      })
      .catch(() => {
        // console.log(err);
        return res.status(500).json({
          message: 'Some error occured!'
        });
      });
  }
    
  updateProfile(req, res) {
    // fetch user details from decoded.
    let updateFields = {};
    const { firstName, lastName, oldPassword, newPassword } = req.body;
    users.findById(req.decoded.id).then(foundUser => {
      if (firstName) {
        updateFields.firstName = req.body.firstName;
      } 

      if (lastName) {
        updateFields.lastName = lastName;
      } 

      if (oldPassword && newPassword.length > 6){
        if (bcrypt.compareSync(oldPassword, foundUser.password)) {
          updateFields.password =  bcrypt.hashSync(newPassword, 10);
        } else {
          return res.status(400).json({
            message: 'Incorrect Old password'
          });
        }
      } else {
        return res.status(400).json({
          message: 'Password is too short'
        });
      }
      foundUser.update(
        updateFields,
        {
          where: {
            id: req.decoded.id
          }
        }).then(() => {
        return res.status(200).json({
          message: 'Updated Succesfully!',
        });
      });
    })
      .catch(() => {
        // console.log(err);
        return res.status(500).json({
          message: 'Some error occured!'
        });
      });
    // collect data from user.
    // update where nessary 
  }

}

export default Users;