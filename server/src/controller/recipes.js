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
      })
      .catch();
  }
  modify(req, res) {
    const updateFields = {};
    const { recipeName, mealType, description, method, ingredients } = req.body;
    console.log(req.body)
    recipes.findOne({
      where: {
        userId: req.decoded.id,
        id: req.params.recipeId
      }
    }).then(found => {
      //console.log(found);
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
        found.update(updateFields).then(updated => {
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
}

export default Recipes;