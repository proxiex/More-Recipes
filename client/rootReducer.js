import { combineReducers } from 'redux';
import auth from './reducers/auth';
import { recipe, recipes, popularRecipe } from './reducers/recipe';
import review from './reducers/review';
import favorites from './reducers/favorites';
import { userRecipe, profile } from './reducers/user';

export default combineReducers({
  auth,
  recipe,
  recipes,
  popularRecipe,
  review,
  favorites,
  userRecipe,
  profile
});