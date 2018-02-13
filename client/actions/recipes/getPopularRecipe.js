import axios from 'axios';
import { POPULAR_RECIPE, POPULAR_RECIPE_ERROR } from '../types';

/**
 *
 * @export
 * @param {any} payload
 * @returns {void}
 */
export const getPopularRecipeSuccess = payload => ({
  type: POPULAR_RECIPE,
  payload
});

/**
 *
 * @export
 * @param {any} payload
 * @returns {void}
 */
export const getPopularRecipeFailure = payload => ({
  type: POPULAR_RECIPE_ERROR,
  payload
});

/**
 * @returns {void}
 *
 * @param {any} dispatch
 */
export const getPopularRecipeAction = () => dispatch =>
  axios.get('/api/v1/recipes/popular').then((res) => {
    dispatch(getPopularRecipeSuccess(res.data.popularRecipes));
  }, (error) => {
    dispatch(getPopularRecipeFailure(error.response.data));
  });
