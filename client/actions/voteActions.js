import axios from 'axios';
import { VOTE } from './types';

/**
 *
 *
 * @export
 * @param {any} payload
 * @returns {void}
 */
export const upVoteSucess = payload => ({
  type: VOTE,
  payload
});

/**
 * @returns {void}
 *
 * @param {any} recipeId
 * @param {any} type
 */
export const voteAction = (recipeId, type) => dispatch =>
  axios.post(`/api/v1/recipes/${recipeId}/votes?vote=${type}`).then((res) => {
    dispatch(upVoteSucess(res.data));
  });
