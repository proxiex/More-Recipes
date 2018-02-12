import isEmpty from 'lodash/isEmpty';
import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_ERROR,
  SIGNUP_USER,
  SIGNUP_USER_ERROR
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  error: {},
  redirect: false
};

let newState;

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
        error: {}
      };
    case SET_CURRENT_USER_ERROR:
      return {
        error: action.error
      };
    case SIGNUP_USER:
      return {
        redirect: true
      };
    case SIGNUP_USER_ERROR:
      return {
        error: action.error
      };
    default: return state;
  }
};
