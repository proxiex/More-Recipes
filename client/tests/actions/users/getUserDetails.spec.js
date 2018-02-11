import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as actions from '../../../actions/users/getUserDetails';
import * as types from '../../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
 
describe('getUserDetails', () => {
  it('should create an action for get user detaails', () => {
    const payload = {
      userDetails: {
        username: 'Proxie',
        avater: 'url'
      }
    }
    const expectedAction = {
      type: types.GET_USER_PROFILE,
      payload
    }
    expect(actions.getUserProfileSucess(payload)).toEqual(expectedAction);
  });

  it('should dispatch GET_USER_PROFILE action', () => {
    const store = mockStore({});
    axios.get = jest.fn(() => Promise.resolve({
      data: {
        username: 'Proxie',
        avater: 'url'
      }
    }));

    const payload = {
      username: 'Proxie',
      avater: 'url'
    }

    const expectedAction = [
      {
        type: types.GET_USER_PROFILE,
        payload
      }
    ]
    return store.dispatch(actions.getUserProfileAction({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction)
      })
  })
})