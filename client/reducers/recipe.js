import { ADD_NEW_RECIPE } from '../actions/types';

let newState;

export default function reciepeReducer(state = [], action ) {
  switch(action.type) {
  case ADD_NEW_RECIPE: 
    newState = [...state, action.payload];
    return newState;
  default: 
    return state;

  }
}