import express from 'express';
import Users from '../controller/users';
import Favorites from '../controller/favorites';
import Auth from '../middleware/validation';

const usersController = new Users();
const favoritesController = new Favorites();

let router = express.Router();

router.post('/signup', Auth.userSignup, usersController.signup);
router.post('/signin', Auth.userSignin, usersController.signin);
router.get('/:userId/recipes', /* Auth.Verify, */ favoritesController.get);

export default router;