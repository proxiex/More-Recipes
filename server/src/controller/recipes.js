import db from '../models/db';

class Recipe {
  
  static ingredient(req, res){
    const { ingredient, recipId } = req.body;
    let l = db.recipes.ingredients.lenght;
    const id = 1 + l;

    db.recipes.ingredients.push({
      id: id,
      recipId: recipId,
      ingredient: ingredient
    });     
    return res.ststus(200).send(db.recipes.ingredients);
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

      let l = db.recipes.length;
      const id = 1 + l;

      db.recipes.push({
        id: id,
        userId: 2,
        recipeName: recipeName,
        mealType: mealType,
        dishType: dishType,
        method: method,
        ingredients: [ ingredients ]
      });

      res.status(200).send(db.recipes[id -1]);
    }
    
    //return res.status(200).send(recipes.ingredients)
  }

  static get(req, res){
    return res.status(200).send(db.recipes);
  }
  
  static update(req, res) {
    const  id = req.params.Id;
    const { recipeName, mealType, dishType, method, ingredients } = req.body;
    
    // console.log(db.recipes[1].id);

    for (let i = 0; i < db.recipes.length; i++) {
      if (db.recipes[i].id === parseInt(id, 10)){
        db.recipes[i].recipeName = recipeName || db.recipes[i].recipeName,
        db.recipes[i].mealType = mealType || db.recipes[i].mealType,
        db.recipes[i].dishType = dishType || db.recipes[i].dishType,
        db.recipes[i].method = method || db.recipes[i].method,
        db.recipes[i].ingredients = ingredients ||  db.recipes[i].ingredients ;     
        
        return res.status(200).send(db.recipes);   
      } 
    }

    return res.status(404).send({
      message: 'Recipe Not found!'
    });
  }

  static delete(req, res) {
    for (let i = 0; i < db.recipes.length; i++) {
      if (db.recipes[i].id === parseInt(req.params.Id, 10)){
        db.recipes.splice(i, 1);
        return res.status(204).send({
          message: 'Recipe has been Deleted'
        });
      }
    }
    return res.status(404).send({
      message: 'Recipe Not found!'
    });    
  }

  static test(req, res) {
    return res.status(200).send(db.recipes.ingredients); 
  }

  
  
}

export default Recipe;