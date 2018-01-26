import axios from 'axios';
import { GET_USER_PROFILE } from './types';

export function getUserProfileSucess(payload) {
  return {
    type: GET_USER_PROFILE,
    payload
  };
}

export const getUserProfileAction = () => (dispatch) => {
  return axios.get('/api/v1/users/me').then(res => {
    dispatch(getUserProfileSucess(res.data));
  });
};
