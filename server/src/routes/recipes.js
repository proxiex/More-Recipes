import express from 'express';
import Recipes from '../controller/recipes';
import Reviews from '../controller/review';


const recipeController = new Recipes();
const reviewController = new Reviews();

let router = express.Router();

//router.get('/', recipeController.test)

router.post('/', recipeController.add);
router.put('/:Id', recipeController.update);
router.delete('/:Id', recipeController.delete);
router.get('/', recipeController.get);
router.post('/:Id/reviews', reviewController.add);



export default router;