import axios from 'axios';
import {
  UPDATE_USER_PROFILE,
  UPDATE_USER_PASSWORD
} from '../types';


/**
 * @returns {void}
 *
 * @param {any} payload
 */
export const updateUserProfileSucess = payload => ({
  type: UPDATE_USER_PROFILE,
  payload
});

/**
 * @returns {void}
 *
 * @param {any} payload
 */
export const updateUserPasswordSucess = payload => ({
  type: UPDATE_USER_PASSWORD,
  payload
});

/**
 *
 * @returns {void}
 * @param {any} userData
 */
export const updatetUserProfileAction = userData => dispatch =>
  axios.patch('/api/v1/users/me', userData).then((res) => {
    dispatch(updateUserProfileSucess(res.data));
  });

/**
 * @returns {void}
 *
 * @param {any} password
 */
export const updatetUserPasswordAction = password => dispatch =>
  axios.patch('/api/v1/users/me', password).then((res) => {
    dispatch(updateUserPasswordSucess(res.data));
  });
