import express from 'express';
import recipeController from '../controller/recipes';

let router = express.Router();

//router.get('/', recipeController.test)

router.post('/', recipeController.add);
router.put('/:Id', recipeController.update);

export default router;