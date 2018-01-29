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
/**
 *
 *
 * @class Users
 */
class Users {
  /**
   *
   * @returns {void}
   * @param {any} req
   * @param {any} res
   * @memberof Users
   */
  signup(req, res) {
    const { username, email, password } = req.body;
    const noImage = 'https://firebasestorage.googleapis.com/v0/b/morerecipes-aed62.appspot.com/o/images%2Fmore-recipes_asd_1516790520726.jpg?alt=media&token=e8c20e43-10ef-413f-8f62-2e583ed8ff80';
    users.find({
      where: {
        [Op.or]: [
          { email },
          { username: username.trim() }
        ]
      }
    }).then((found) => {
      if (found) {
        let eremail;
        let erusername;

        if (found.email === email) {
          eremail = 'Email is already in use';
        }

        if (found.username === username.trim()) {
          erusername = 'Username already taken';
        }

        return res.status(409).json({
          eremail,
          erusername
        });
      }
      return users

        .create({
          avatar: noImage,
          username: username.trim(),
          email,
          password: bcrypt.hashSync(password, 10)
        }).then((user) => {
          const newUser = { username: user.username, email: user.email };
          res.status(201).json({
            message: 'Signup succesfull',
            newUser
          });
        })
        .catch(error => res.status(400).json({
          message: error.errors[0].message
        }));
    });
    return this;
  }

  /**
   *
   * @returns {void}
   * @param {any} req
   * @param {any} res
   * @memberof Users
   */
  signin(req, res) {
    const { username, password } = req.body;
    return users
      .findOne({
        where: {
          [Op.or]: [
            { email: username },
            { username }

          ]
        }
      }).then((found) => {
        if (!found) {
          return res.status(400).json({
            message: 'Incorrect signin credentials!'
          });
        } else if (bcrypt.compareSync(password, found.password)) {
          const user = {
            firstName: found.firstName,
            lastName: found.lastName
          };
          const token = jwt.sign({
            id: found.id,
            username: found.username
          }, key, {
            expiresIn: 60 * 60 * 24 // Token expires in 24 hours
          });
          return res.status(200).json({
            message: 'Sign in Successful!',
            user,
            Token: token
          });
        }
        return res.status(400).json({
          message: 'Incorrect signin credentials!'
        });
      })
      .catch(() => res.status(500).json({
        message: 'Some error occured!'
      }));
    return this;
  }

  /**
   *
   * @returns {void}
   * @param {any} req
   * @param {any} res
   * @memberof Users
   */
  profile(req, res) {
    // - get user name
    const userId = req.decoded.id;
    return users
      .findById(userId).then((UserDetails) => {
        // -- total number of recipes created by user
        const user = {
          avatar: UserDetails.avatar,
          firstName: UserDetails.firstName,
          lastName: UserDetails.lastName,
          email: UserDetails.email,
          username: UserDetails.username,
        };
        recipes.findAndCountAll({
          where: {
            userId
          }
        }).then((result) => {
          // if (result.count < 1) {
          //   return res.status(200).json({
          //     UserDetails: user,
          //     recipeDetails: {
          //       totalRecipes: 0,
          //       myTotalFavorites: 0,
          //       myTotalVotes: 0 ,
          //       myRecipeTotalVotes: 0,
          //       myRecipeTotaFavorites: 0,
          //     }

          //   });
          // } else {
          // collect an array of all users recipes.

          const id = [];
          result.rows.map(key => id.push(key.id));

          /* for (let i = 0; i < result.rows.length; i++ ){
            id.push(result.rows[i].id);
          } */
          // - total number of favorites user recipe has
          favorites.count({ where: { recipeId: id } }).then((myTotalFavorites) => {
            // - total number of likes for user recipes
            votes.count({ where: { recipeId: id } }).then((myTotalVotes) => {
              // - recipes liked by user
              votes.count({ where: { userId, } }).then((myRecipeTotalVotes) => {
                // - recipes favoried by user
                favorites.count({ where: { userId } }).then(myRecipeTotaFavorites => res.status(200).json({
                  UserDetails: user,
                  recipeDetails: {
                    totalRecipes: result.count,
                    myTotalFavorites,
                    myTotalVotes,
                    myRecipeTotalVotes,
                    myRecipeTotaFavorites
                  }

                }));
              });
            });
          });
        });
      })
      .catch(() =>
        // console.log(err);
        res.status(500).json({
          message: 'Some error occured!'
        }));
    return this;
  }

  /**
   *
   * @returns {void}
   * @param {any} req
   * @param {any} res
   * @memberof Users
   */
  updateProfile(req, res) {
    // fetch user details from decoded.
    const updateFields = {};
    const {
      avatar, firstName, lastName, oldPassword, newPassword
    } = req.body;
    users.findById(req.decoded.id).then((foundUser) => {
      if (firstName) {
        updateFields.firstName = req.body.firstName;
      }

      if (lastName) {
        updateFields.lastName = lastName;
      }

      if (avatar) {
        updateFields.avatar = avatar;
      }

      if (oldPassword) {
        if (oldPassword && newPassword.length > 6) {
          if (bcrypt.compareSync(oldPassword, foundUser.password)) {
            updateFields.password = bcrypt.hashSync(newPassword, 10);
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
      }

      foundUser.update(
        updateFields,
        {
          where: {
            id: req.decoded.id
          }
        }
      ).then(user => res.status(200).json({
        message: 'Updated Succesfully!',
        UserDetails: user
      }));
    })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: 'Some error occured!'
        });
      });
    return this;
  }
}

export default Users;
