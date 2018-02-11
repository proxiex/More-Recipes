import axios from 'axios';
import { ADD_NEW_RECIPE } from '../types';

/**
 *
 *
 * @export
 * @param {any} payload
 * @returns {void}
 */
export const addRecipeSuccess = payload => ({
  type: ADD_NEW_RECIPE,
  payload
});

/**
 *
 * @returns {void}
 * @param {any} recipeData
 */
export const addRecipeAction = recipeData => dispatch =>
  axios.post('/api/v1/recipes/', recipeData).then((res) => {
    dispatch(addRecipeSuccess(res.data));
  });
