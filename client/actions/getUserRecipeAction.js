import axios from 'axios';
import { GET_USER_RECIPES, GET_USER_RECIPES_ERROR } from './types';
/**
 *
 *
 * @export
 * @param {any} payload
 * @returns {void}
 */
export function getUserRecipesSucess(payload) {
  return {
    type: GET_USER_RECIPES,
    payload
  };
}

/**
 *
 *
 * @export
 * @param {any} payload
 * @returns {void}
 */
export function getUserRecipesFaliure(payload) {
  return {
    type: GET_USER_RECIPES_ERROR,
    payload
  };
}

/**
 * @returns {void}
 *
 * @param {any} userId
 * @param {any} page
 */
export const getUserRecipesActon = (userId, page) => (dispatch) => {
  const usersId = userId || '';
  return axios.get(`/api/v1/users/recipe?page=${page}&userId=${usersId}`)
    .then((response) => {
      dispatch(getUserRecipesSucess(response.data));
    }, (error) => {
      dispatch(getUserRecipesFaliure(error.response.data));
    });
};
