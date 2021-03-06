import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import { SET_CURRENT_USER, SET_CURRENT_USER_ERROR } from '../types';

/**
 *
 *
 * @export
 * @param {any} user
 * @returns {void}
 */
export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

/**
 *
 *
 * @export
 * @param {any} user
 * @returns {void}
 */
export const setCurrentUserFailure = error => ({
  type: SET_CURRENT_USER_ERROR,
  error
});

/**
 * @returns {void}
 *
 * @param {any} dispatch
 */
export const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthorizationToken(false);
  dispatch(setCurrentUser({}));
};


/**
 *
 * @returns {void}
 *
 * @param {any} userData
 */
export const userSigninRequest = userData => dispatch =>
  axios.post('/api/v1/users/signin', userData).then((res) => {
    const token = res.data.Token;
    const decToken = jwtDecode(token);
    localStorage.setItem('jwtToken', token);
    setAuthorizationToken(token);
    dispatch(setCurrentUser(decToken));
  }, (error) => {
    dispatch(setCurrentUserFailure(error.response.data));
  });
