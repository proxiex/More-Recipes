import db from '../models';
//import Sequelize from 'sequelize';

const recipes = db.recipes;
const favorites = db.favorites;
const users = db.users;
/**
 * 
 * 
 * @class Favorite
 */
class Favorite {
  /**
   * 
   * 
   * @param {any} req 
   * @param {any} res 
   * @returns 
   * @memberof Favorite
   */
  add(req, res) {
    const id = req.params.recipeId;
    if (isNaN(id)) {
      return res.status(400).json({
        message: 'Parameter must be a number!'
      });
    }
    recipes.find({ 
      where: {
        id: id
      }
    }).then(found => {
      if (found) {
        favorites.findOne({
          where: {
            recipeId: id,
            userId: req.decoded.id
          }
        }).then(foundFavorite => {
          if (foundFavorite) {
            favorites.destroy({
              where: {
                userId: req.decoded.id,
                recipeId: id
              }
            }).then(() => {
              return res.status(200).json({
                message: 'Recipe removed from Favorites'
              });
            });
          } else  {
            return favorites
              .create({
                recipeId: id,
                userId: req.decoded.id
              }).then(favorite => {
                return res.status(201).json({
                  message: 'Recipe has been added to your favorite list',
                  favorite
                });
              });
          }
        });
      } else  {
        return res.status(404).json({
          message: 'Recipe Not found!'
        });
      }
    });
  }

  get(req, res) {
    const id = parseInt(req.params.userId, 10);
    const limitValue = (req.query.limit <= 0) ? 9 : req.query.limit || 9;
    const pageValue = (req.query.page <= 0 ) ? 0 : req.query.page - 1 || 0;

    if (isNaN(id)) {
      return res.status(400).json({
        message: 'Parameter must be a number!'
      });
    }
    return favorites
      .findAndCountAll({
        offset: limitValue * pageValue, 
        limit: limitValue,

        where: {
          userId: id
        },
        include: [
          {
            model: recipes,
            include: [
              {
                model: users
              }
            ]
          }
        ]
      }).then((favoriteRecipe) => {
        console.log('ok workssdfsfdfs >>>>>>> ', favoriteRecipe);
        if (favoriteRecipe.length <= 0) {
          return res.status(404).json({
            message: 'Recipe Not found'
          });
          
        }
        const totalCount = favoriteRecipe.count;
        const pageCount = Math.ceil(totalCount / limitValue);
        const recipes = favoriteRecipe.rows;

        return res.status(200).json({
          totalCount,
          pageCount,
          recipes
        });
        
      });
    

  }
}

export default Favorite;