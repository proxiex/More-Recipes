import axios from 'axios';
import { ADD_NEW_RECIPE, ADD_NEW_RECIPE_ERROR } from '../types';

/**
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
 * @export
 * @param {any} payload
 * @returns {void}
 */
export const addRecipeFailure = payload => ({
  type: ADD_NEW_RECIPE_ERROR,
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
  }, (error) => {
    dispatch(addRecipeFailure(error.response.data));
  });
