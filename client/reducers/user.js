import { GET_USER_RECIPES, DELETE_RECIPE } from '../actions/types';

let newState;

export function userRecipe( state = [], action = {}) {
  switch(action.type) {
  case GET_USER_RECIPES:
    newState = action.payload;
    return newState;
  case DELETE_RECIPE:
    newState = state.recipes.filter(recipe => `${recipe.id}` !== `${action.id}`);
    return newState;
  default:
    return state;
  }
}