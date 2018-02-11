import axios from 'axios';

/**
 * @returns {void}
 *
 * @param {any} userData
 */
export const userSignupRequest = userData => dispatch =>
  axios.post('/api/v1/users/signup', userData);
