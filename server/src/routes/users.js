import express from 'express';
import Users from '../controller/users';
import Favorites from '../controller/favorites';
import Validate from '../middleware/validation';
import Auth from '../middleware/auth';

const usersController = new Users();
const favoritesController = new Favorites();

let router = express.Router();

router.post('/signup', Validate.userSignup, usersController.signup);
router.post('/signin', Validate.userSignin, usersController.signin);

router.post('/:recipeId/recipes',  Auth.Verify, Validate.recipeId, favoritesController.add);
router.get('/:userId/recipes', Auth.Verify, favoritesController.get);

router.get('/me', Auth.Verify, usersController.profile);
router.patch('/me', Auth.Verify, usersController.updateProfile);
// router.delete('/me', Auth.Verify, usersController.deleteAccount);

export default router;