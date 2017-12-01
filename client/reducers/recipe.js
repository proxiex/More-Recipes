import { ADD_NEW_RECIPE } from '../actions/types';
import { GET_ALL_RECIPES } from '../actions/types';
import { GET_RECIPE_DETAILS } from '../actions/types';


let newState;

export default function reciepeReducer(state = [], action = {} ) {
  switch(action.type) {
  case ADD_NEW_RECIPE: 
    newState = [...state, action.payload];
    return newState;
  case GET_ALL_RECIPES:
    newState = action.payload;
    return newState;
  case GET_RECIPE_DETAILS:
    newState = action.payload;
    return newState;
  default: 
    return state;

  }
}