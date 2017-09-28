import Recipes from '../models/recipes';

class Recipe {
  
  static ingredient(req, res){
    const { ingredient, recipId } = req.body;
    let l = Recipes.ingredients.lenght;
    const id = 1 + l;

    Recipes.ingredients.push({
      id: id,
      recipId: recipId,
      ingredient: ingredient
    });     
    return res.ststus(200).send(Recipes.ingredients);
  }

  static add(req, res) {
    const { recipeName, mealType, dishType, method, ingredients } = req.body;
    if (!recipeName) {
      res.status(400).send({
        message: 'Please Enter Recipe Name'
      });
    } else if (!mealType) {
      res.status(400).send({
        message: 'Please Enter Meal Type'
      });
    } else if (!dishType) {
      res.status(400).send({
        message: 'Please Enter Dish Type'
      });
    } else if (!method) {
      res.status(400).send({
        message: 'Please Enter Method'
      });
    } 
    else if (!ingredients) {
      res.status(400).send({
        message: 'Please Enter Ingredients'
      });
    }else {

      let l = Recipes.length;
      const id = 1 + l;

      Recipes.push({
        id: id,
        userId: 2,
        recipeName: recipeName,
        mealType: mealType,
        dishType: dishType,
        method: method,
        ingredients: { ingredients }
      });

      res.status(200).send(Recipes);
    }
    
    //return res.status(200).send(recipes.ingredients)
  }
  
  static update(req, res) {
    const  id = req.params.Id;
    const { recipeName, mealType, dishType, method, ingredients } = req.body;
    
    // console.log(Recipes[1].id);

    for (let i = 0; i < Recipes.length; i++) {
      if (Recipes[i].id === parseInt(id, 10)){
        Recipes[i].recipeName = recipeName || Recipes[i].recipeName,
        Recipes[i].mealType = mealType || Recipes[i].mealType,
        Recipes[i].dishType = dishType || Recipes[i].dishType,
        Recipes[i].method = method || Recipes[i].method,
        Recipes[i].ingredients = ingredients ||  Recipes[i].ingredients ;     
        
        return res.status(200).send({Recipes});   
      } 
    }

    return res.status(404).send({
      message: 'Recipe Not found!'
    });
  }

  static delete(req, res) {
    
  }
  static test(req, res) {
    return res.status(200).send(Recipes.ingredients); 
  }

  
  
}

export default Recipe;