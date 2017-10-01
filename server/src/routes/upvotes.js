import express from 'express';
import UpVotes from '../controller/upvotes';

const upvoteController = new UpVotes();

let router = express.Router();

router.get('/recipes?sort=upvotes&order=des', upvoteController.getUpvotesRecipe);
router.post('/upvote', upvoteController.vote);

export default router;