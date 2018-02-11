import axios from 'axios';
import { ADD_REVIEW } from '../types';

/**
 *
 * @export
 * @param {any} payload
 * @returns {void}
 */
export const addReviewSucess = payload => ({
  type: ADD_REVIEW,
  payload
});

/**
 *
 * @returns {void}
 * @param {any} recipeId
 * @param {any} reviewData
 */
export const addReviewAction = (recipeId, reviewData) => dispatch =>
  axios.post(`/api/v1/recipes/${recipeId}/reviews`, reviewData).then((res) => {
    const review = res.data.review.sort((a, b) => b.id - a.id);
    dispatch(addReviewSucess(review));
  });
