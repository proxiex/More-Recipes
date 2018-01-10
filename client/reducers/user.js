import { GET_USER_RECIPES } from '../actions/types';

let newState;

export function userRecipe( state = [], action = {}) {
  switch(action.type) {
  case GET_USER_RECIPES:
    newState = action.payload;
    return newState;
  default:
    return state;
  }
}