import { GET_FAVORITE_RECIPES, FAVORITE_RECIPE} from '../actions/types';

let newState;

export default function favorites( state = [], action = {} ) {
  switch(action.type) {
  case FAVORITE_RECIPE:
    newState = action.payload;
    return newState;
  case GET_FAVORITE_RECIPES:
    newState = action.payload;
    return newState;
  default:
    return state;
  }
}