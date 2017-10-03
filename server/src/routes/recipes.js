import express from 'express';
import Recipes from '../controller/recipes';
import Auth from '../middleware';
import Reviews from '../controller/reviews';


const recipeController = new Recipes();
const reviewController = new Reviews();

let router = express.Router();

router.post('/', Auth.Verify, recipeController.add);
router.get('/', recipeController.get);
router.put('/:recipeId', Auth.Verify, recipeController.modify);
router.delete('/:recipeId', Auth.Verify, recipeController.delete);
router.post('/:recipeId/reviews', /* Auth.Verify, */ reviewController.add); 




export default router;