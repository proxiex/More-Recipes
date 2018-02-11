import axios from 'axios';
import { FAVORITE_RECIPE } from '../types';

/**
 *
 * @param {any} payload
 * @returns {void}
 */
export const favoriteRecipeSucess = payload => ({
  type: FAVORITE_RECIPE,
  payload
});

/**
 * @returns {void}
 *
 * @param {any} recipeId
 */
export const favoriteRecipeAction = recipeId => dispatch =>
  axios.post(`/api/v1/users/${recipeId}/favorites`)
    .then((response) => {
      dispatch(favoriteRecipeSucess(response.data));
    });
