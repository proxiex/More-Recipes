import axios from 'axios';
import { SEARCH_RECIPE, SEARCH_RECIPE_ERROR } from '../types';

/**
 *
 *
 * @export
 * @param {any} payload
 * @returns {void}
 */
export const searchSucess = payload => ({
  type: SEARCH_RECIPE,
  payload
});

/**
 *
 *
 * @export
 * @param {any} payload
 * @returns {void}
 */
export const searchFailure = payload => ({
  type: SEARCH_RECIPE_ERROR,
  payload
});

/**
 * @returns {void}
 *
 * @param {any} search
 * @param {any} page
 */
export const searchSucessAction = (search, page) => dispatch =>
  axios.get(`/api/v1/recipes?search=${search}&page=${page}`).then((res) => {
    dispatch(searchSucess(res.data));
  }, (error) => {
    dispatch(searchFailure(error.response.data));
  });
