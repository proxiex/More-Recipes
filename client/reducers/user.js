import {
  GET_USER_RECIPES,
  DELETE_RECIPE,
  GET_USER_PROFILE,
  UPDATE_USER_PROFILE
} from '../actions/types';

let newState;

/**
 *
 *
 * @export
 * @param {any} [state=[]]
 * @param {any} [action={}]
 * @returns {void}
 */
export function userRecipe(state = [], action = {}) {
  switch (action.type) {
    case GET_USER_RECIPES:
      newState = action.payload;
      return newState;
    case DELETE_RECIPE:
      newState = state.recipes
        .filter(recipe => `${recipe.id}` !== `${action.id}`);
      return newState;
    default:
      return state;
  }
}

/**
 *
 *
 * @export
 * @param {any} [state=[]]
 * @param {any} [action={}]
 * @returns {void}
 */
export function profile(state = [], action = {}) {
  switch (action.type) {
    case UPDATE_USER_PROFILE:
      newState = { ...state, UserDetails: action.payload.UserDetails };
      return newState;
    case GET_USER_PROFILE:
      newState = action.payload;
      return newState;
    default:
      return state;
  }
}
