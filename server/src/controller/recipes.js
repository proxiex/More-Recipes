import db from '../models';
import Sequelize from 'sequelize';

const recipes = db.recipes;
const votes = db.votes;
const Op = Sequelize.Op;

class Recipes {
  add(req, res) {
    const { recipeName, mealType, description, method, ingredients } = req.body;
    return recipes
      .create({
        userId: req.decoded.id,
        recipeName: recipeName,
        mealType: mealType,
        description: description,
        method: method,
        ingredients: ingredients
      }).then(created => {
        return res.status(201).json(created);
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({
          message: 'Some error occured!'
        });
      });
  }
  
  modify(req, res) {
    const { recipeName, mealType, description, method, ingredients } = req.body;
    let updateFields = {};
    const id = req.params.recipeId;  

    recipes.findOne({
      where: {
        userId: req.decoded.id,
        id: id
      }
    }).then(found => {
      if(found) {
        if (recipeName) {
          updateFields.recipeName = req.body.recipeName;
        } 
        
        if (mealType) {
          updateFields.mealType = req.body.mealType;
        } 
        
        if (description) {
          updateFields.description = req.body.description;
        } 
        
        if (method) {
          updateFields.method = req.body.method;
        } 
        
        if (ingredients) {
          updateFields.ingredients = req.body.ingredients;
        } else {
          return res.status(200).json({
            Message: 'Nothing to update!'
          });
        }
        console.log(updateFields);
        found.update( 
          updateFields, 
          {
            where: {
              userId: req.decoded.id,
              id: id
            }
          }).then((updated) => {
          return res.status(200).json({
            Message: 'Succesfully Updated Recipe',
            updated
          });
        });
      } else {
        return res.status(401).json({
          message: 'You cannot modify this Recipe!'
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
          return res.status(200).json(sortedRecipes);
        });
    } else {
      return recipes
        .findAll({ offset: req.query.next }).then(getAllRecipes => {
          if (!getAllRecipes || getAllRecipes.length < 0) {
            return res.status(200).json({
              Message: 'No recipes have yet been created!'
            });
          }
          return res.status(200).json(getAllRecipes);
        });
    }
  }

  delete(req, res) {
    const id = req.params.recipeId;
    
    recipes.findOne({
      where: { 
        userId: req.decoded.id,
        id: id
      }
    }).then(found => { 
      if (!found) {
        return res.status(404).json({
          message: 'You did not created this recipe, you cannot delete it!'
        });
      } else {
        return recipes
          .destroy({
            where: {
              userId: req.decoded.id,
              id: id
            }
          }).then(() => {
            return res.status(200).json({
              message: 'Recipe Deleted!'
            });
          });
      }
    });
  }

  /* getOne(req, res) {

  } */
}

export default Recipes;