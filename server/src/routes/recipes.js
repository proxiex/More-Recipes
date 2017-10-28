import express from 'express';
import Recipes from '../controller/recipes';
import Auth from '../middleware/auth';
import Pass from '../middleware/pass';
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
router.get('/:recipeId', Pass.Verify, Validate.recipeId, recipeController.getOne);
router.put('/:recipeId', Auth.Verify, Validate.recipeId, recipeController.modify);
router.delete('/:recipeId',  Auth.Verify, Validate.recipeId, recipeController.delete);

router.post('/:recipeId/favorites',  Auth.Verify, Validate.recipeId, favoritesController.add);
router.post('/favorites', Auth.Verify, favoritesController.add);
router.get('/:userId',  Auth.Verify, Validate.userId, favoritesController.get);

router.post('/:recipeId/reviews', Auth.Verify,  Validate.recipeId, reviewController.add); 
router.post('/:recipeId/votes', Auth.Verify, Validate.recipeId, voteController.votes);




export default router;