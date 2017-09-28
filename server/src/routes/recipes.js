import express from 'express';
import Recipes from '../controller/recipes';
import Reviews from '../controller/review';
import UpVotes from '../controller/upvotes';

const recipeController = new Recipes();
const reviewController = new Reviews();
const upvoteController = new UpVotes();

let router = express.Router();

//router.get('/', recipeController.test)

router.post('/', recipeController.add);
router.put('/:Id', recipeController.update);
router.delete('/:Id', recipeController.delete);
router.get('/', recipeController.get);
router.post('/:Id/reviews', reviewController.add);
router.get('/?sort=upvotes&order=des', upvoteController.getUpvotesRecip);
router.post('/upvote', upvoteController.vote);



export default router;