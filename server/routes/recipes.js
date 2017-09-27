import express from 'express';
import recipeController from '../controller/recipes';

let router = express.Router();

router.get('/', recipeController.Test)

export default router;