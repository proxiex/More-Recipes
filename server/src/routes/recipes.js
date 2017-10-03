import express from 'express';
import Recipes from '../controller/recipes';
import Auth from '../middleware';
//import Reviews from '../controller/review';


const recipeController = new Recipes();
/* const reviewController = new Reviews(); */

let router = express.Router();

router.post('/', Auth.Verify, recipeController.add);
router.get('/', recipeController.get);
router.put('/:recipeId', Auth.Verify, recipeController.modify);

/* 
router.delete('/:Id', recipeController.delete);

router.post('/:Id/reviews', reviewController.add); */



export default router;