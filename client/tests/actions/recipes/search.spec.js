import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as actions from '../../../actions/recipes/search';
import * as types from '../../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('searchAction', () => {
  it('should create an action for search recipe', () => {
    const payload = [
      {
        id: 1,
        recipeName: 'some recipe name'
      },
      {
        id: 2,
        recipeName: 'some recipe name'
      }
    ]

    const expectedAction = {
      type: types.SEARCH_RECIPE,
      payload
    }

    expect(actions.searchSucess(payload)).toEqual(expectedAction);
  });

  it('should dispatch SEARCH_RECIPE action', () => {
    const store = mockStore({});
    axios.get = jest.fn(() => Promise.resolve({
      data: [
        {
          id: 1,
          recipeName: 'some recipe name'
        },
        {
          id: 2,
          recipeName: 'some recipe name'
        }
      ]
    }));

    const payload = [
      {
        id: 1,
        recipeName: 'some recipe name'
      },
      {
        id: 2,
        recipeName: 'some recipe name'
      }
    ]

    const expectedAction = [
      {
        type: types.SEARCH_RECIPE,
        payload
      }
    ]
    return store.dispatch(actions.searchSucessAction({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction)
      })
  });

});
