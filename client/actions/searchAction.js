import axios from 'axios';
import { SEARCH_RECIPE } from './types';

/**
 *
 *
 * @export
 * @param {any} payload
 * @returns {void}
 */
export function searchSucess(payload) {
  return {
    type: SEARCH_RECIPE,
    payload
  };
}

/**
 * @returns {void}
 *
 * @param {any} search
 * @param {any} page
 */
export const searchSucessAction = (search, page) => dispatch =>
  axios.get(`/api/v1/recipes?search=${search}&page=${page}`).then((res) => {
    console.log('action search', res.data);
    dispatch(searchSucess(res.data));
  });
