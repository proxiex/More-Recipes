import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as actions from '../../../actions/recipes/vote';
import * as types from '../../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('vote', () => { 
  it('should create an action to vote recipe', () => {
    const payload = {
      id: 1,
      recipeName: 'stuff',
      votes: 3
    }

    const expectedAction = {
      type: types.VOTE,
      payload
    }

    expect(actions.upVoteSucess(payload)).toEqual(expectedAction)
  });

  it('should dispatch VOTE actoin', () => {
    const store = mockStore({});

    axios.post = jest.fn(() => Promise.resolve({
      data: {
        id: 1,
        recipeName: 'stuff',
        vote: 4
      }
    }))
    const payload = {
      id: 1, 
      recipeName: 'stuff',
      vote: 4
    }
    const expectedAction = [
      {
        type: types.VOTE,
        payload
      }
    ]

    return store.dispatch(actions.voteAction({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction)
      })
  })
})