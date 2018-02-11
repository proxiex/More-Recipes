import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as actions from '../../../actions/users/updateUserProfile';
import * as types from '../../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('updateUserProfile', () => {
  it('should create an action for update user profile', () => {
    const payload = {
      message: 'Profile updated sucessfully',
      userDetails: {
        username: '',
        avatar: '',
        firstName: '',
        lastName: ''
      }
    }
    const expectedAction = {
      type: types.UPDATE_USER_PROFILE,
      payload      
    }
    expect(actions.updateUserProfileSucess(payload)).toEqual(expectedAction);
  });

  it('should create an action for update password', () => {
    const payload = {
      message: 'Password updated sucessfully',
    }
    const expectedAction = {
      type: types.UPDATE_USER_PASSWORD,
      payload      
    }
    expect(actions.updateUserPasswordSucess(payload)).toEqual(expectedAction);
  });

  it('shoould dispatch UPDATE_USER_PROFILE action', () => {
    const store = mockStore({});
    axios.patch = jest.fn(() => Promise.resolve({
      data: {
        message: 'Profile updated sucessfully',
        userDetails: {
          username: '',
          avatar: '',
          firstName: '',
          lastName: ''
        }
      }
    }));

    const payload = {
      message: 'Profile updated sucessfully',
      userDetails: {
        username: '',
        avatar: '',
        firstName: '',
        lastName: ''
      }
    }
    const expectedAction = [{
      type: types.UPDATE_USER_PROFILE,
      payload
    }]

    return store.dispatch(actions.updatetUserProfileAction(payload))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction)
      })
  })

  it('shoould dispatch UPDATE_USER_PASSWORD action', () => {
    const store = mockStore({});
    axios.patch = jest.fn(() => Promise.resolve({
      data: {
        message: 'Password updated sucessfully'
      }
    }));

    const payload = {
      message: 'Password updated sucessfully'
    }
    const expectedAction = [{
      type: types.UPDATE_USER_PASSWORD,
      payload
    }]

    return store.dispatch(actions.updatetUserPasswordAction(payload))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction)
      })
  })
})