import db from '../models';

const {
  recipes,
  reviews,
  users,
  votes,
  favorites
} = db;

/**
 *
 *
 * @class Recipes
 */
class Recipes {
  /**
   *
   * @param {any} req
   * @param {any} res
   * @returns {void}
   * @memberof Recipes
   */
  add(req, res) {
    const {
      recipeImage, recipeName, description, method, ingredients
    } = req.body;
    return recipes
      .create({
        userId: req.decoded.id,
        recipeImage,
        recipeName,
        description,
        instructions: method,
        ingredients
      }).then(Recipe => res.status(201).json(Recipe))
      .catch(() => res.status(500).json({
        message: 'Some error occured!'
      }));
    return this;
  }

  /**
   *
   * @param {any} req
   * @param {any} res
   * @returns {void}
   * @memberof Recipes
   */
  modify(req, res) {
    const {
      recipeName,
      recipeImage,
      description,
      method,
      ingredients
    } = req.body;

    const updateFields = {};
    const id = req.params.recipeId;
    const instructions = method;

    recipes.findOne({
      where: {
        userId: req.decoded.id,
        id
      }
    }).then((found) => {
      if (found) {
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

        if (Object.keys(updateFields).length === 0 && updateFields.constructor === Object) {
          return res.status(200).json({
            message: 'Nothing to update!'
          });
        }
        found.update(
          updateFields,
          {
            where: {
              userId: req.decoded.id,
              id
            }
          }
        ).then(recipeDetails => res.status(200).json({
          message: 'Succesfully Updated Recipe',
          recipeDetails
        }));
      } else {
        return res.status(401).json({
          message: 'You cannot modify this Recipe!'
        });
      }
    });
    return this;
  }

  /**
   *
   * @param {any} req
   * @param {any} res
   * @returns {void}
   * @memberof Recipes
   */
  get(req, res) {
    const limitValue = (req.query.limit <= 0) ? 9 : req.query.limit || 9;
    const pageValue = (req.query.page <= 0) ? 0 : req.query.page - 1 || 0;

    if (req.query.search) {
      // lets search something
      const searchQuery = req.query.search.split(' ');

      const search = searchQuery.map(value => ({
        recipeName: { $iLike: `%${value}%` }
      }));

      const ingredients = searchQuery.map(value => ({
        ingredients: { $iLike: `%${value}%` }
      }));

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
      }).then((result) => {
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
      }).then(recipe => res.status(200).json({
        recipe
      }));
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
        }).then((getAllRecipes) => {
          if (getAllRecipes.count === 0) {
            return res.status(200).json({
              message: 'No recipes have yet been created!'
            });
          }
          const totalCount = getAllRecipes.count;
          const pageCount = Math.ceil(totalCount / limitValue);
          const recipes = getAllRecipes.rows;

          return res.status(200).json({
            totalCount, page: pageValue + 1, pageCount, recipes
          });
        });
    }
    return this;
  }

  /**
   *
   * @param {any} req
   * @param {any} res
   * @returns {void}
   * @memberof Recipes
   */
  getOne(req, res) {
    const id = req.decoded ? req.decoded.id : null;
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
      }).then((recipeDetails) => {
        if (recipeDetails) {
          if (!req.decoded || req.decoded.id !== recipeDetails.userId) {
            // updat eview
            recipes.update(
              {
                views: recipeDetails.views + 1
              },
              {
                where: {
                  id: req.params.recipeId
                }
              }
            );
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
          }).then((recipeReviews) => {
            votes.findOne({
              where: {
                userId: id,
                recipeId: req.params.recipeId
              }
            }).then((userVotes) => {
              const reviews = (recipeReviews.length <= 0) ?
                'No reviews yet' : recipeReviews;

              return res.status(200).json({
                recipeDetails,
                reviews,
                userVotes
              });
            });
          });
        } else {
          return res.status(404).json({
            message: 'Recipe not found'
          });
        }
      });
    return this;
  }

  /**
   *
   * @param {any} req
   * @param {any} res
   * @returns {void}
   * @memberof Recipes
   */
  getUserRecipe(req, res) {
    const limitValue = (req.query.limit <= 0) ? 9 : req.query.limit || 9;
    const pageValue = (req.query.page <= 0) ? 0 : req.query.page - 1 || 0;
    return recipes
      .findAndCountAll({
        offset: limitValue * pageValue,
        limit: limitValue,
        where: {
          userId: (req.query.userId) ? req.query.userId : req.decoded.id
        },

        include: [
          {
            attributes: ['id', 'avatar', 'username'],
            model: users
          }
        ]
      }).then((getAllRecipes) => {
        if (getAllRecipes.count === 0) {
          return res.status(404).json({
            message: (req.query.userId) ? 'This user has not created any recipes yet!' : 'You have not created any recipe Yet'
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
      }).catch(() => {
        res.status(500).json({
          message: 'oops, some error occured'
        });
      });
    return this;
  }

  /**
   *
   * @param {any} req
   * @param {any} res
   * @returns {void}
   * @memberof Recipes
   */
  getPopularRecipe(req, res) {
    recipes.findAll({
      limit: 10,
      order: [
        ['favorites', 'DESC']
      ]
    }).then(popularRecipes => res.status(200).json({
      popularRecipes
    }));
    return this;
  }

  /**
   *
   * @param {any} req
   * @param {any} res
   * @returns {void}
   * @memberof Recipes
   */
  delete(req, res) {
    const id = req.params.recipeId;

    recipes.findOne({
      where: {
        id
      }
    }).then((found) => {
      if (!found) {
        return res.status(404).json({
          message: 'Recipe Not found!'
        });
      } else if (found.userId !== req.decoded.id) {
        return res.status(403).json({
          message: 'You did not created this recipe, you cannot delete it!'
        });
      }
      return recipes
        .destroy({
          where: {
            userId: req.decoded.id,
            id
          }
        }).then(() => res.status(200).json({
          message: 'Recipe Deleted!'
        }));
    });
    return this;
  }
}

export default Recipes;
