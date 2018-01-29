import axios from 'axios';
import { GET_USER_PROFILE } from './types';

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
 * @returns {void}
 *
 * @param {any} res
 */
export const getUserProfileAction = () => dispatch =>
  axios.get('/api/v1/users/me').then((res) => {
    dispatch(getUserProfileSucess(res.data));
  });
