import axios from 'axios';
import { EDIT_RECIPE } from './types';

/**
 *
 * @param {any} payload
 * @returns {void}
 */
export const editRecipeSucess = payload => ({
  type: EDIT_RECIPE,
  payload
});

/**
 * @returns {void}
 *
 * @param {any} recipeData
 * @param {anh} recipeId
 */
export const editRecipeAction = (recipeData, recipeId) => dispatch =>
  axios.put(`/api/v1/recipes/${recipeId}`, recipeData).then((res) => {
    dispatch(editRecipeSucess(res.data));
  });
