import { ADD_NEW_RECIPE } from '../actions/types';
import { GET_ALL_RECIPES } from '../actions/types';
import { GET_RECIPE_DETAILS } from '../actions/types';
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
  default:
    return state;
  }
}


