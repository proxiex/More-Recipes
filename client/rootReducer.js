import { combineReducers } from 'redux';
import auth from './reducers/auth';
import recipe from './reducers/recipe';
import review from './reducers/review';

export default combineReducers({
  auth,
  recipe,
  review
});