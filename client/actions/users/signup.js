import axios from 'axios';
import { SIGNUP_USER, SIGNUP_USER_ERROR } from '../types';

/**
 *
 *
 * @export
 * @param {any} user
 * @returns {void}
 */
export const signupUser = user => ({
  type: SIGNUP_USER,
  user
});

/**
 *
 *
 * @export
 * @param {any} user
 * @returns {void}
 */
export const signupUserFailure = error => ({
  type: SIGNUP_USER_ERROR,
  error
});

/**
 * @returns {void}
 *
 * @param {any} userData
 */
export const userSignupRequest = userData => dispatch =>
  axios.post('/api/v1/users/signup', userData).then((res) => {
    dispatch(signupUser(res.data));
  }, (error) => {
    dispatch(signupUserFailure(error.response.data));
  });

