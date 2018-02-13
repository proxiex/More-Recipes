import axios from 'axios';
import { GET_USER_PROFILE, GET_USER_PROFILE_ERROR } from '../types';

/**
 *
 * @param {any} payload
 * @returns {void}
 */
export const getUserProfileSucess = payload => ({
  type: GET_USER_PROFILE,
  payload
});

/**
 *
 * @param {any} payload
 * @returns {void}
 */
export const getUserProfileFailure = payload => ({
  type: GET_USER_PROFILE_ERROR,
  payload
});

/**
 * @returns {void}
 *
 * @param {any} res
 */
export const getUserProfileAction = () => dispatch =>
  axios.get('/api/v1/users/me').then((res) => {
    dispatch(getUserProfileSucess(res.data));
  }, (error) => {
    dispatch(getUserProfileFailure(error.response.data));
  });
