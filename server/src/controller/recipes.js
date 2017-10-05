import db from '../models';
import Sequelize from 'sequelize';

const recipes = db.recipes;
const Op = Sequelize.Op;

class Recipes {
  add(req, res) {
    const { recipeName, mealType, description, method, ingredients } = req.body;
    console.log(req.body);
    if (!recipeName) {
      return res.status(400).send({
        message: 'Please Enter Recipe Name'
      });
    }  else if (!mealType) {
      return res.status(400).send({
        message: 'Please Enter Meal Type'
      });
    } else if (!description) {
      return res.status(400).send({
        message: 'Please Enter Description'
      });
    } else if (!method) {
      return res.status(400).send({
        message: 'Please Enter Method'
      });
    } 
    else if (!ingredients) {
      return res.status(400).send({
        message: 'Please Enter Ingredients'
      });
    }
    return recipes
      .create({
        userId: req.decoded.id,
        recipeName: recipeName,
        mealType: mealType,
        description: description,
        method: method,
        ingredients: [ ingredients ]
      }).then(created => {
        return res.status(201).send(created);
      });
      //.catch();
  }
  
  modify(req, res) {
    const updateFields = {};
    const { recipeName, mealType, description, method, ingredients } = req.body;
    const id = req.params.recipeId;
    if (isNaN(id)) {
      return res.status(400).send({
        message: 'Parameter must be a number!'
      });
    }
    console.log(req.body);
    recipes.findOne({
      where: {
        userId: req.decoded.id,
        id: id
      }
    }).then(found => {
      console.log(found);
      if(found) {
        if (recipeName) {
          updateFields.recipeName = recipeName;
        } else if (mealType) {
          updateFields.mealType = mealType;
        } else if (description) {
          updateFields.description = description;
        } else if (method) {
          updateFields.method = method;
        } else if (ingredients) {
          updateFields.ingredients = [ingredients];
          //found.update({ingredients: ingredients});
        } else {
          return res.status(200).send({
            Message: 'Nothing to update!'
          });
        }
        console.log(updateFields);
        found.update({ 
          updateFields 
        }, {
          where: {
            userId: req.decoded.id,
            id: id
          }
        }).then(updated => {
          return res.status(200).send({
            Message: 'Succesfully Updated Recipe',
            updated
          });
        });
      } else {
        return res.status(404).send({
          message: 'Recipe Not found!'
        });
      }
    });
  }

  get(req, res) {
    if (req.query.order || req.query.sort) {
      return recipes
        .findAll({
          order: [
            ['upVotes', 'DESC']
          ]
        }).then(sortedRecipes => {
          return res.status(200).send(sortedRecipes);
        });
    } else {
      return recipes
        .findAll({ offset: req.query.next, limit: 2 }).then(getAllRecipes => {
          if (!getAllRecipes) {
            return res.status(200).send({
              Message: 'No recipes have yet been created!'
            });
          }
          return res.status(200).send(getAllRecipes);
        });
    }
  }

  delete(req, res) {
    const id = req.params.recipeId;
    if (isNaN(id)) {
      return res.status(400).send({
        message: 'Parameter must be a number!'
      });
    }
    recipes.findAll({
      where: { 
        userId: req.decoded.id,
        id: id
      }
    }).then(found => {
      if (!found) {
        return res.status(404).send({
          message: 'You did not created this recipe, you cannot delete it!'
        });
      }
      return recipes
        .destroy({
          where: {
            id: id
          }
        }).then(() => {
          return res.status(200).send({
            message: 'Recipe Deleted!'
          });
        });
    });
  }

  /* getOne(req, res) {

  } */
}

export default Recipes;