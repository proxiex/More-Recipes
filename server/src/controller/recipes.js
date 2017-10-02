import db from '../models';

const recipes = db.recipes;

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
}

export default Recipes;