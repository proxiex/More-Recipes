import db from '../models';

const reviews = db.reviews;
const recipes = db.recipes;
const users = db.users;

/**
 *
 *
 * @class Reviews
 */
class Reviews {
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {void}
   * @memberof Reviews
   */
  add(req, res) {
    // check if recipe exsits.
    const id = req.params.recipeId;
    if (isNaN(id)) {
      return res.status(400).json({
        message: 'Parameter must be a number!'
      });
    }
    recipes.findOne({ id }).then((found) => {
      if (!found) {
        return res.status(404).json({
          message: 'Recipe Not found!'
        });
      }
      if (!req.body.reviews) {
        return res.status(400).json({
          message: 'Please enter Review'
        });
      }
      return reviews
        .create({
          userId: req.decoded.id,
          recipeId: id,
          review: req.body.reviews
        }).then(() => {
          reviews.findAll({
            where: {
              recipeId: id
            },
            include: [
              {
                attributes: ['id', 'avatar', 'username'],
                model: users
              }
            ],

          }).then(review => res.status(201).json(review));
        });
    });
    return this;
  }

  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {void}
   * @memberof Reviews
   */
  getAllRecipeReview(req, res) {
    const recipeId = req.params.recipeId;

    reviews.findAll({
      where: {
        recipeId
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
      const reviews = (recipeReviews.length <= 0) ? 'No reviews 1 yet' : recipeReviews;
      return res.status(200).json({
        reviews
      });
    });
    return this;
  }
}

export default Reviews;
