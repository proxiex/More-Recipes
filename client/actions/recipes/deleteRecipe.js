import axios from 'axios';
import { DELETE_RECIPE } from '../types';
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
 * @returns {void}
 * @param {any} recipeId
 */
export const deleteRecipeAction = recipeId => dispatch =>
  axios.delete(`/api/v1/recipes/${recipeId}`).then(() => {
    dispatch(deleteRecipeSucess(recipeId));
  });
