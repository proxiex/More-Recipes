import db from '../models';
//import Sequelize from 'sequelize';

const recipes = db.recipes;
const favorites = db.favorites;

class Favorite {
  add(req, res) {
    const id = req.params.recipeId;
    if (isNaN(id)) {
      return res.status(400).send({
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
            return res.status(400).send({
              message: 'Recipe already Favorited'
            });
          } else  {
            return favorites
              .create({
                recipeId: id,
                userId: req.decoded.id
              }).then(favorited => {
                return res.status(201).send({
                  message: 'Recipe Favorited!',
                  favorited
                });
              });
          }
        });
      } else  {
        return res.status(404).send({
          message: 'Recipe Not found!'
        });
      }
    });
  }

  get(req, res) {
    const id = req.params.userId;
    if (isNaN(id)) {
      return res.status(400).send({
        message: 'Parameter must be a number!'
      });
    }
    return favorites
      .findAll({
        where: {
          userId: id
        },
        include: [
          {
            model: recipes
          }
        ]
      }).then(found => {
        if (found) {
          return res.status(200).send(found);
        } else  {
          return res.status(404).send({
            message: 'Recipe Not found'
          });
        }
      });

  }
}

export default Favorite;