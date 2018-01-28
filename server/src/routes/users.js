import express from 'express';
import Users from '../controller/users';
import Favorites from '../controller/favorites';
import Recipe from '../controller/recipes';
import Validate from '../middleware/validation';
import Auth from '../middleware/auth';
import Pass from '../middleware/pass';

const usersController = new Users();
const favoritesController = new Favorites();
const recipeController = new Recipe();

const router = express.Router();

router
  .post(
    '/signup',
    Validate.userSignup,
    usersController.signup
  );
router
  .post(
    '/signin',
    Validate.userSignin,
    usersController.signin
  );

router
  .post(
    '/:recipeId/favorites',
    Auth.Verify,
    Validate.recipeId,
    favoritesController.add
  );
router
  .get(
    '/:userId/favorites',
    Auth.Verify,
    favoritesController.get
  );
router
  .get(
    '/recipe',
    Pass.Verify,
    recipeController.getUserRecipe
  );

router
  .get(
    '/me',
    Auth.Verify,
    usersController.profile
  );
router
  .patch(
    '/me',
    Auth.Verify,
    usersController.updateProfile
  );

export default router;
