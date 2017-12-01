import { GET_RECIPE_REVIEW } from '../actions/types';
import { ADD_REVIEW } from '../actions/types';

let newState;

export default function reciepeReducer(state = [], action = {} ) {
  switch(action.type) {
  case ADD_REVIEW:
    newState = [...state, action.payload];
    return newState;
  case GET_RECIPE_REVIEW:
    newState = action.payload;
    return newState;
  default: 
    return state;
    
  }
}