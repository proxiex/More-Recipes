import { combineReducers } from 'redux';
import auth from './reducers/auth';
import { recipe, recipes } from './reducers/recipe';
import review from './reducers/review';
import favorites from './reducers/favorites';

export default combineReducers({
  auth,
  recipe,
  recipes,
  review,
  favorites
});