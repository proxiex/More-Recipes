import express from 'express';
import recipeController from '../controller/recipes';

let router = express.Router();

router.get('/', recipeController.test)

router.post('/', recipeController.add)

export default router;