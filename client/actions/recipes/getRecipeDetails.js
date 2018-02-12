import axios from 'axios';
import {
  GET_RECIPE_DETAILS,
  GET_RECIPE_DETAILS_ERROR,
  GET_RECIPE_REVIEW,
  GET_RECIPE_REVIEW_ERROR
} from '../types';

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
export const getRecipeDetailsFailure = payload => ({
  type: GET_RECIPE_DETAILS_ERROR,
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
 * @param {any} payload
 */
export const getRecipeReviewFailure = payload => ({
  type: GET_RECIPE_REVIEW_ERROR,
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
  }, (error) => {
    dispatch(getRecipeDetailsFailure(error.response.data));
    dispatch(getRecipeReviewFailure(error.response.data));
  });
