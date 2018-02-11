import * as types from '../../actions/types';
import auth from '../../reducers/auth';

const initialState = {
  isAuthenticated: false,
  user: {}
};

describe('Auth Reducer', () => {
  it('it should log a user in', () => {
    const user = {
      id: 1,
      username: '',
      avatar: ''
    }
    const action = {
      type: types.SET_CURRENT_USER,
      user
    }
    const newState = auth(initialState, action)
    expect(newState).toEqual({ 
      ...initialState, ...{ 
        user, isAuthenticated: true }
    })
  });
})

