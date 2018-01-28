import axios from 'axios';
import { GET_RECIPE_DETAILS, GET_RECIPE_REVIEW } from './types';

/**
 * @returns {void}
 *
 * @param {any} payload
 */
export const getRecipeDetailsSuccess = payload => ({
  type: GET_RECIPE_DETAILS,
  payload
});

/**
 * @returns {void}
 *
 * @param {any} payload
 */
export const getRecipeReviewSucess = payload => ({
  type: GET_RECIPE_REVIEW,
  payload
});

/**
 * @returns {void}
 *
 * @param {any} recipeId
 */
export const getRecipeDetails = recipeId => dispatch =>
  axios.get(`/api/v1/recipes/${recipeId}`).then((res) => {
    dispatch(getRecipeDetailsSuccess(res.data));
    dispatch(getRecipeReviewSucess(res.data.reviews));
  });
