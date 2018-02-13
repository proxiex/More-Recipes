import axios from 'axios';
import { GET_FAVORITE_RECIPES, GET_FAVORITE_RECIPES_ERROR } from '../types';

/**
 *
 * @export
 * @param {any} payload
 * @returns {void}
 */
export const getFavoriteRecipeSucess = payload => ({
  type: GET_FAVORITE_RECIPES,
  payload
});


/**
 *
 * @export
 * @param {any} payload
 * @returns {void}
 */
export const getFavoriteRecipeFailure = payload => ({
  type: GET_FAVORITE_RECIPES_ERROR,
  payload
});

/**
 * @returns {void}
 *
 * @param {any} userId
 * @param {any} page
 */

export const getFavoriteRecipeAction = (userId, page) => dispatch =>
  axios.get(`/api/v1/users/${userId}/favorites?page=${page}`)
    .then((response) => {
      dispatch(getFavoriteRecipeSucess(response.data));
    }, (error) => {
      dispatch(getFavoriteRecipeFailure(error.response.data));
    });
