import db from '../models';
// import Sequelize from 'sequelize';

const recipes = db.recipes;
const reviews = db.reviews;
// const Op = Sequelize.Op;
/**
 * 
 * 
 * @class Recipes
 */
class Recipes {
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof Recipes
   */
  add(req, res) {
    const { recipeImage, recipeName, mealType, description, method, ingredients } = req.body;
    return recipes
      .create({
        userId: req.decoded.id,
        recipeImage,
        recipeName,
        mealType,
        description,
        method,
        ingredients
      }).then(created => {
        return res.status(201).json(created);
      })
      .catch((err) => {
        console.log(err);
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
          updateFields.recipeName = recipeName;
        } 
        
        if (mealType) {
          updateFields.mealType = mealType;
        } 
        
        if (description) {
          updateFields.description = description;
        } 
        
        if (method) {
          updateFields.method = method;
        } 
        
        if (ingredients) {
          updateFields.ingredients = ingredients;
        } 
        if (updateFields.length < 0 ){
          return res.status(200).json({
            Message: 'Nothing to update!'
          });
        } else {

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
        }
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
    } else if (req.query.search) {
      // lets search something 
      const searchQuery = req.query.search.split(' ');
      
      let search = searchQuery.map((value) => {
        return {
          recipeName: {$iLike : `%${value}%`}
        };
      });
      
      let ingredients = searchQuery.map((value) => {
        return {
          ingredients: {$iLike : `%${value}%`}
        };
      });

      recipes.findAll({
        where: {
          $or: 
          search.concat(ingredients)
        },
        order: [
          ['id', 'DESC']
        ]
      }).then(result => {
        if (result.length <= 0) {
          return res.status(404).json({
            message: 'No recipe Matched your Search!'
          });
        }
        return res.status(200).json({
          result
        });
      });


    } else {
      const limitValue = req.query.limit || 12;
      const pageValue = req.query.page - 1 || 0;

      return recipes
        .findAndCountAll({ offset: limitValue * pageValue, limit: limitValue }).then(getAllRecipes => {
          if (!getAllRecipes || getAllRecipes.length <= 0) {
           
            return res.status(200).json({
              Message: 'No recipes have yet been created!'
            });
          } 
          const totalCount = getAllRecipes.count;
          const pageCount = Math.ceil(totalCount / limitValue);

          return res.status(200).json({ totalCount, page: pageValue + 1,  pageCount, getAllRecipes});
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

  getOne(req, res) {
    return recipes
      .findOne({
        where: { 
          id: req.params.recipeId
        }
      }).then(recipeDetails => {
        if (recipeDetails) {
          if (!req.decoded || req.decoded.id !== recipeDetails.userId) {
            // updat eview
            recipes.update({
              views: recipeDetails.views + 1
            }, 
            {
              where: {
                id: req.params.recipeId
              }
            });
          }
          reviews.findAll({
            where: {
              recipeId: req.params.recipeId
            }
          }).then(recipeReviews =>{
            const reviews = (recipeReviews.length <= 0)? 'No reviews yet': recipeReviews;
            return res.status(200).json({
              recipeDetails,
              reviews: reviews
            });
          });

        } else {
          return res.status(400).json({
            message: 'Recipe Not found'
          });
        }
      });
  }
}

export default Recipes;