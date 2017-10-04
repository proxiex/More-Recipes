import express from 'express';
import Recipes from '../controller/recipes';
import Auth from '../middleware';
import Reviews from '../controller/reviews';
import Favorites from '../controller/favorites';


const recipeController = new Recipes();
const reviewController = new Reviews();
const favoritesController = new Favorites();

let router = express.Router();

router.post('/', Auth.Verify, recipeController.add);
router.get('/', recipeController.get);
router.put('/:recipeId', Auth.Verify, recipeController.modify);
router.delete('/:recipeId', Auth.Verify, recipeController.delete);
router.post('/:recipeId/reviews', Auth.Verify, reviewController.add); 
router.post('/:recipeId/favorites', /* Auth.Verify, */ favoritesController.add);




export default router;