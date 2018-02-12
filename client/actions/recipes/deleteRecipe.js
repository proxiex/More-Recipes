import axios from 'axios';
import { DELETE_RECIPE, DELETE_RECIPE_ERROR } from '../types';

/**
 *
 *
 * @param {any} id
 * @returns {void}
 */
export const deleteRecipeSucess = id => ({
  type: DELETE_RECIPE,
  id
});

/**
 *
 *
 * @param {any} id
 * @returns {void}
 */
export const deleteRecipeFailure = id => ({
  type: DELETE_RECIPE_ERROR,
  id
});

/**
 *
 * @returns {void}
 * @param {any} recipeId
 */
export const deleteRecipeAction = recipeId => dispatch =>
  axios.delete(`/api/v1/recipes/${recipeId}`).then(() => {
    dispatch(deleteRecipeSucess(recipeId));
  }, (error) => {
    dispatch(deleteRecipeFailure(error.response.data));
  });
