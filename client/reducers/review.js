import { GET_RECIPE_REVIEW, ADD_REVIEW } from '../actions/types';

let newState;
/**
 *
 *
 * @export
 * @param {any} [state=[]]
 * @param {any} [action={}]
 * @returns {void}
 */
export default function reciepeReducer(state = [], action = {}) {
  switch (action.type) {
    case ADD_REVIEW:
      newState = action.payload;
      return newState;
    case GET_RECIPE_REVIEW:
      newState = action.payload;
      return newState;
    default:
      return state;
  }
}
