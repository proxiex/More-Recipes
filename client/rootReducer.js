import { combineReducers } from 'redux';
import auth from './reducers/auth';
import recipe from './reducers/recipe';

export default combineReducers({
  auth,
  recipe
});