import axios from 'axios';
import { VOTE, VOTE_ERROR } from '../types';

/**
 *
 *
 * @export
 * @param {any} payload
 * @returns {void}
 */
export const VoteSucess = payload => ({
  type: VOTE,
  payload
});

/**
 *
 *
 * @export
 * @param {any} payload
 * @returns {void}
 */
export const VoteFailure = payload => ({
  type: VOTE_ERROR,
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
    dispatch(VoteSucess(res.data));
  }, (error) => {
    dispatch(VoteFailure(error.response.data));
  });
