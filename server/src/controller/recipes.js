import db from '../models/db';

class Recipe {
  add(req, res) {
    const { recipeName, mealType, dishType, method, ingredients } = req.body;
    console.log(req.body);
    if (!recipeName) {
      return res.status(400).send({
        message: 'Please Enter Recipe Name'
      });
    }  else if (!mealType) {
      return res.status(400).send({
        message: 'Please Enter Meal Type'
      });
    } else if (!dishType) {
      return res.status(400).send({
        message: 'Please Enter Dish Type'
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

    let l = db.recipes.length;
    const id = 1 + l;

    db.recipes.push({
      id: id,
      userId: 2,
      recipeName: recipeName,
      mealType: mealType,
      dishType: dishType,
      method: method,
      ingredients: [ ingredients ],
      upVotes: 0,
      downVotes: 0
    });

    return res.status(201).send(db.recipes[id -1]);
  }

  get(req, res){
    if (req.query.sort && req.query.order)  {

      const up = db.recipes.sort(function(a, b){return b.upVotes - a.upVotes; });
      return res.status(200).send(up);
    } else {
      return res.status(200).send(db.recipes);
    }
  }
  
  update(req, res) {
    const  id = req.params.Id;
    const { recipeName, mealType, dishType, method, ingreidents } = req.body;
    
    // console.log(db.recipes[1].id);

    for (let i = 0; i < db.recipes.length; i++) {
      if (db.recipes[i].id === parseInt(id, 10)){
        db.recipes[i].recipeName = recipeName || db.recipes[i].recipeName;
        db.recipes[i].mealType = mealType || db.recipes[i].mealType;
        db.recipes[i].dishType = dishType || db.recipes[i].dishType;
        db.recipes[i].method = method || db.recipes[i].method;
        db.recipes[i].ingreidents = [ ingreidents ] ||  db.recipes[i].ingreidents; 
        
        return res.status(200).send(db.recipes[i]);   
      } 
    }

    return res.status(404).send({
      message: 'Recipe Not found!'
    });
  }

  delete(req, res) {
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
  
}

export default Recipe;