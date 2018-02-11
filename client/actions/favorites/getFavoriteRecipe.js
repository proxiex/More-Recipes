import axios from 'axios';
import { GET_FAVORITE_RECIPES } from '../types';
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
 * @returns {void}
 *
 * @param {any} userId
 * @param {any} page
 */

export const getFavoriteRecipeAction = (userId, page) => dispatch =>
  axios.get(`/api/v1/users/${userId}/favorites?page=${page}`)
    .then((response) => {
      console.log(' ***************** ', response.data);
      dispatch(getFavoriteRecipeSucess(response.data));
    });
