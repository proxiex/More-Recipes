import axios from 'axios';
/**
 *
 * @export
 * @param {any} token
 * @returns {void}
 */
export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['x-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-token'];
  }
}
