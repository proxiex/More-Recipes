import express from 'express';
import Recipes from '../controller/recipes';
import Auth from '../middleware/auth';
import Validate from '../middleware/validation';
import Reviews from '../controller/reviews';
import Favorites from '../controller/favorites';
import Votes from '../controller/votes';


const recipeController = new Recipes();
const reviewController = new Reviews();
const favoritesController = new Favorites();
const voteController = new Votes();

let router = express.Router();

router.post('/',  Auth.Verify, Validate.addRecipe, recipeController.add);
router.get('/', recipeController.get);
router.put('/:recipeId', Auth.Verify, Validate.params, recipeController.modify);
router.delete('/:recipeId',  Auth.Verify, Validate.params, recipeController.delete);

router.post('/:recipeId/favorites',  Auth.Verify, Validate.params, favoritesController.add);
router.post('/favorites', Auth.Verify, favoritesController.add);
router.get('/:userId',  Auth.Verify, Validate.params, favoritesController.get);

router.post('/:recipeId/reviews', Auth.Verify,  Validate.params, reviewController.add); 
router.post('/:recipeId/vote', Auth.Verify, Validate.params, voteController.votes);




export default router;