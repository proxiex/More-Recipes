import express from 'express';
import recipeController from '../controller/recipes';
import reviewController from '../controller/review';

let router = express.Router();

//router.get('/', recipeController.test)

router.post('/', recipeController.add);
router.put('/:Id', recipeController.update);
router.delete('/:Id', recipeController.delete);
router.get('/', recipeController.get);

router.post('/:Id/reviews', reviewController.add);

export default router;