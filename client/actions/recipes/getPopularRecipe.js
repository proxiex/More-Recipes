import axios from 'axios';
import { POPULAR_RECIPE } from '../types';

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
 * @returns {void}
 *
 * @param {any} dispatch
 */
export const getPopularRecipeAction = () => dispatch =>
  axios.get('/api/v1/recipes/popular').then((res) => {
    dispatch(getPopularRecipeSuccess(res.data.popularRecipes));
  });
