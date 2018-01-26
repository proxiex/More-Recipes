import db from '../models';
import Sequelize from 'sequelize';

const recipes = db.recipes;
const reviews = db.reviews;
const users = db.users;
const votes = db.votes;
const Op = Sequelize.Op;

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
    const { recipeImage, recipeName, description, method, ingredients } = req.body;
    return recipes
      .create({
        userId: req.decoded.id,
        recipeImage,
        recipeName,
        description,
        instructions: method,
        ingredients
      }).then(Recipe => {
        return res.status(201).json(Recipe);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: 'Some error occured!'
        });
      });
  }
  
  modify(req, res) {
    const { recipeName, recipeImage, description, method, ingredients } = req.body;
    let updateFields = {};
    const id = req.params.recipeId;  
    const instructions = method;

    recipes.findOne({
      where: {
        userId: req.decoded.id,
        id: id
      }
    }).then(found => {
      if(found) {
        if (recipeImage) {
          updateFields.recipeImage = recipeImage;
        }
        
        if (recipeName) {
          updateFields.recipeName = recipeName;
        } 

        if (description) {
          updateFields.description = description;
        } 
        
        if (instructions) {
          updateFields.instructions = instructions;
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
            }).then((recipeDetails) => {
            return res.status(200).json({
              Message: 'Succesfully Updated Recipe',
              recipeDetails
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
    const limitValue = (req.query.limit <= 0) ? 9 : req.query.limit || 9;
    const pageValue = (req.query.page <= 0 ) ? 0 : req.query.page - 1 || 0;

    if (req.query.search) {
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

      recipes.findAndCountAll({
        offset: limitValue * pageValue, 
        limit: limitValue,

        where: {
          $or: 
          search.concat(ingredients)
        },
        order: [
          ['id', 'DESC']
        ],

        include: [
          {
            attributes: ['id', 'firstName', 'lastName', 'username'],
            model: users
          }
        ]
      }).then(result => {
        if (result.count === 0) {
          return res.status(200).json({
            message: `Your search - ${req.query.search} - did not matched any recipe`
          });
        }
        const totalCount = result.count;
        const pageCount = Math.ceil(totalCount / limitValue);
        const recipes = result.rows;

        return res.status(200).json({
          totalCount,
          pageCount,
          page: (pageValue + 1),
          recipes
        });
      });


    } else if (req.query.sort) {
      const sort = req.query.sort === 'upVotes' || req.query.sort === 'downVotes' ? req.query.sort : 'upVotes';
      const order = req.query.order === 'des' ? 'DESC' : 'DESC';

      recipes.findAll({
        order: [
          [sort, order]
        ],

        include: [
          {
            attributes: ['id', 'firstName', 'lastName', 'username'],
            model: users
          }
        ]
      }).then(recipe => {
        return res.status(200).json({
          recipe
        });
      });
    } else {  
      return recipes
        .findAndCountAll({ 
          offset: limitValue * pageValue, 
          limit: limitValue,

          include: [
            {
              attributes: ['id', 'firstName', 'lastName', 'username'],
              model: users
            }
          ],
          order: [
            ['id', 'DESC']
          ]
        }).then(getAllRecipes => {
          if (getAllRecipes.count === 0) {
           
            return res.status(200).json({
              Message: 'No recipes have yet been created!'
            });
          } 
          const totalCount = getAllRecipes.count;
          const pageCount = Math.ceil(totalCount / limitValue);
          const recipes = getAllRecipes.rows;

          return res.status(200).json({ totalCount, page: pageValue + 1,  pageCount, recipes });
        });
    }
  }

  getOne(req, res) {
    const id = req.decoded || null;
    return recipes
      .findOne({
        where: { 
          id: req.params.recipeId
        },

        include: [
          {
            attributes: ['id', 'firstName', 'lastName', 'username'],
            model: users
          }
        ]
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
            },
            
            order: [
              ['id', 'DESC']
            ],

            include: [
              {
                attributes: ['id', 'avatar', 'username'],
                model: users
              }
            ]
          }).then(recipeReviews =>{
            votes.findOne({
              where: {
                userId: id,
                recipeId: req.params.recipeId
              }
            }).then(userVotes => {
              const reviews = (recipeReviews.length <= 0)? 'No reviews yet': recipeReviews;
              return res.status(200).json({
                recipeDetails,
                reviews,
                userVotes
              });
            });
          });

        } else {
          return res.status(400).json({
            message: 'Recipe Not found'
          }); 
        }
      });
  }

  getUserRecipe(req, res) {
    const limitValue = (req.query.limit <= 0) ? 9 : req.query.limit || 9;
    const pageValue = (req.query.page <= 0 ) ? 0 : req.query.page - 1 || 0;

    return recipes
      .findAndCountAll({
        offset: limitValue * pageValue, 
        limit: limitValue,
        where: {
          userId: (req.query.userId)? req.query.userId : req.decoded.id
        },
        
        include: [
          {
            attributes: ['id', 'avatar', 'username'],
            model: users
          }
        ]
      }).then(getAllRecipes => {
        if (getAllRecipes.count === 0) {
          return res.status(404).json({
            message: (req.query.userId)? 'This user has not created any recipes yet!': 'You have not created any recipe Yet'
          });
        }

        const totalCount = getAllRecipes.count;
        const pageCount = Math.ceil(totalCount / limitValue);
        const recipes = getAllRecipes.rows;


        return res.status(200).json({
          totalCount,
          pageCount,
          recipes
        });
      });
  }

  getPopularRecipe(req, res) {
    recipes.findAll({
      limit: 10,
      order: [ 
        ['favorites', 'DESC']
      ]
    }).then(popularRecipes => {
      return res.status(200).json({
        popularRecipes
      });
    });
  }

  delete(req, res) {
    const id = req.params.recipeId;
    
    recipes.findOne({
      where: {
        id: id
      }
    }).then(found => { 
      if (!found) {
        return res.status(404).json({
          message: 'Recipe Not found!'
        });
      } else if (found.userId !== req.decoded.id) {
        return res.status(403).json({
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
}

export default Recipes;