import axios from 'axios';
import { FAVORITE_RECIPE, FAVORITE_RECIPE_ERROR } from '../types';

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
 *
 * @param {any} payload
 * @returns {void}
 */
export const favoriteRecipeFailure = payload => ({
  type: FAVORITE_RECIPE_ERROR,
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
    }, (error) => {
      dispatch(favoriteRecipeFailure(error.response.data));
    });
