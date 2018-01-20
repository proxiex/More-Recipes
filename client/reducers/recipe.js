import 
{ 
  ADD_NEW_RECIPE, 
  GET_ALL_RECIPES, 
  GET_RECIPE_DETAILS,
  EDIT_RECIPE,
  DELETE_RECIPE
} from '../actions/types';

import { VOTE } from '../actions/types';


let newState;

export function recipes(state = [], action = {} ) {
  switch(action.type) {
  case ADD_NEW_RECIPE: 
    newState = [...state, action.payload];
    return newState;
  case GET_ALL_RECIPES:
    newState = action.payload;
    return newState;
  case DELETE_RECIPE:
    newState = state.recipes.filter(recipe => `${recipe.id}` !== `${action.id}`);
    return newState;
  default: 
    return state;

  }
}

export function recipe( state = [], action = {}) {
  switch(action.type){
  case GET_RECIPE_DETAILS:
    newState = action.payload;
    return newState;
  case VOTE:
    newState = action.payload;
    return newState;
  case EDIT_RECIPE:
    newState = action.payload;
    return newState;
  default:
    return state;
  }
}


