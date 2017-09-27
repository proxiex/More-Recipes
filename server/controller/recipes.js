import Recipes from '../models/recipes';

class Recipe {
  
  static ingredient(req, res){

    let l = recipes.ingredients.lenght;
    const id = Recipes.ingredient[l-1];

    Recipes.ingredients.push({
      id: id,
      recipId: recipId,
      ingredient: ingredients
    })     
    return res.ststus(200).send(Recipes.ingredients)
  }

  static add(req, res) {
    const { recipeName, mealType, dishType, method } = req.body;
    if (!recipeName) {
      res.status(400).send({
        message: 'Please Enter Recipe Name'
      })
    } else if (!mealType) {
       res.status(400).send({
        message: 'Please Enter Meal Type'
      })
    } else if (!dishType) {
      res.status(400).send({
        message: 'Please Enter Dish Type'
      })
    } else if (!method) {
       res.status(400).send({
        message: 'Please Enter Method'
      })
    } else {

      let l = Recipes.length;
      const id = 1 + l;

      Recipes.push({
        id: id,
        userId: 2,
        recipeName: recipeName,
        mealType: mealType,
        dishType: dishType,
        method: method
      })

      res.status(200).send(Recipes)
    }
    
    //return res.status(200).send(recipes.ingredients)
  }
  
  static test(req, res) {
    return res.status(200).send(Recipes.ingredients)
  }

  
  
}

export default Recipe;