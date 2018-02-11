import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as actions from '../../../actions/users/signin';
import * as types from '../../../actions/types';
import localStorageMock from '../../__mocks__/localStorageMock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsInVzZXJuYW1lIjoidGVzdGluZyIsImlhdCI6MTUxNzc0MjgwOSwiZXhwIjoxNTE3ODI5MjA5fQ.IvHzqut0GUPfhBQXanQhrLjJ3PdZwwrw5OmAdOonMkI'
window.localStorage = localStorageMock;

describe('signin', () => {
  it('should craete an action for signin user', () => {
    const user = {
      id: 1,
      userName: 'username',
      avatar: '',
      Token
    }
    const expectedAction = {
      type: types.SET_CURRENT_USER,
      user
    }

    expect(actions.setCurrentUser(user)).toEqual(expectedAction);
  });
  
  it('should dispatch SET_CURRENT_USER action', () => {
    const store = mockStore({});
    axios.post = jest.fn(() => Promise.resolve({
      data:{
        id: 1,
        userName: 'username',
        avatar: '',
        Token
      }
    }));
    const user = {
      "exp": 1517829209, 
      "iat": 1517742809, 
      "id": 23, 
      "username": "testing"
    }
    const expectedAction = [{
      type: types.SET_CURRENT_USER,
      user
    }]

    return store.dispatch(actions.userSigninRequest(Token))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction)
      }) 
  });

  it('should dispatch logout action', () => {
    const store = mockStore({});

    const expectedAction = [
      {
        type: types.SET_CURRENT_USER, 
        user: {}
      }
    ]
    store.dispatch(actions.logout());
    expect(store.getActions()).toEqual(expectedAction);
    
  })

});
