import db from '../models';
import Sequelize from 'sequelize';

const reviews = db.reviews;
const recipes = db.recipes;

class Reviews {
  add(req, res) {
    // check if recipe exsits.
    const id = req.params.recipeId;
    if (isNaN(id)) {
      return res.status(400).send({
        message: 'Parameter must be a number!'
      });
    }
    recipes.findOne({id: id }).then(found => {
      if (!found) {
        return res.status(404).send({
          message: 'Recipe Not foune!'
        });
      }
      if (!req.body.reviews) {
        return res.status(400).send({
          message: 'Please enter Review'
        });
      }
      return reviews
        .create({
          userId: req.decoded.id,
          recipeId: id,
          review: req.body.reviews
        }).then(created => {
          return res.status(201).send(created);
        });
    });
 
  }
}

export default Reviews;