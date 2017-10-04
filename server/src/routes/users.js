import express from 'express';
import Users from '../controller/users';
import Favorites from '../controller/favorites';
import Auth from '../middleware';

const usersController = new Users();
const favoritesController = new Favorites();

let router = express.Router();

router.post('/signup', usersController.signup);
router.post('/signin', usersController.signin);
router.get('/:userId/recipes', /* Auth.Verify, */ favoritesController.get);

export default router;