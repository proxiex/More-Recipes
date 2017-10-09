import express from 'express';
import Recipes from '../controller/recipes';
import Auth from '../middleware';
import Reviews from '../controller/reviews';
import Favorites from '../controller/favorites';
import Votes from '../controller/votes';


const recipeController = new Recipes();
const reviewController = new Reviews();
const favoritesController = new Favorites();
const voteController = new Votes();

let router = express.Router();

router.post('/', Auth.Verify, recipeController.add);
router.get('/', recipeController.get);
router.put('/:recipeId', Auth.Verify, recipeController.modify);
router.delete('/:recipeId', Auth.Verify, recipeController.delete);

router.post('/:recipeId/favorites', Auth.Verify, favoritesController.add);
router.post('/favorites', Auth.Verify, favoritesController.add);
router.get('/userId', Auth.Verify, favoritesController.get);

router.post('/:recipeId/reviews', Auth.Verify, reviewController.add); 
router.post('/:recipeId/vote', voteController.votes);




export default router;