import axios from 'axios';
import { GET_ALL_RECIPES } from './types';

/**
 *
 * @param {any} payload
 * @returns {void}
 */
export const getAllRecipeSuccess = payload => ({
  type: GET_ALL_RECIPES,
  payload
});

/**
 *
 * @returns {void}
 * @param {any} page
 */
export const getAllRecipeAction = page => dispatch =>
  axios.get(`/api/v1/recipes?page=${page}`).then((res) => {
    dispatch(getAllRecipeSuccess(res.data));
  });
