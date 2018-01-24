import axios from 'axios';
import {
  UPDATE_USER_PROFILE,
  UPDATE_USER_PASSWORD
} from './types';

export function updateUserProfileSucess(payload) {
  return {
    type: UPDATE_USER_PROFILE,
    payload
  };
}

export function updateUserPasswordSucess(payload) {
  return {
    type: UPDATE_USER_PASSWORD,
    payload
  };
}

export const updatetUserProfileAction = userData => dispatch =>
  axios.patch('/api/v1/users/me', userData).then((res) => {
    dispatch(updateUserProfileSucess(res.data));
  });

export const updatetUserPasswordAction = password => dispatch =>
  axios.patch('/api/v1/users/me', password).then((res) => {
    dispatch(updateUserPasswordSucess(res.data));
  });
