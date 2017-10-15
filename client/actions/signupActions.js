import axios from 'axios';

export function userSignupRequest(userData) {
  return dispatch => {
    return  axios.post('/api/v1/users/signup', userData );
  };
}