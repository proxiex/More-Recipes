import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as actions from '../../../actions/recipes/getAllRecipe';
import * as types from '../../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getAllRecipeAction', () => {
  it('should create an action for get all recipes', () => {
    const payload = [
      {
        id: 1,
        recipeName: 'rice and beans'
      }
    ]
    const expectedAction = {
      type: types.GET_ALL_RECIPES,
      payload
    };
    expect(actions.getAllRecipeSuccess(payload)).toEqual(expectedAction);
  });

  it('should dispatch GET_ALL_RECIPES', () => {
    const store = mockStore({});
    axios.get = jest.fn(() => Promise.resolve({
      data: [
        {
          id: 1,
          recipeName: 'rice and beans'
        },
        {
          id: 2,
          recipeName: 'yam and eggs'
        }
      ]
    }));
    
    const payload = [
      {
        id: 1,
        recipeName: 'rice and beans'
      },
      {
        id: 2,
        recipeName: 'yam and eggs'
      }
    ];
    
    const expectedAction = [
      {
        type: types.GET_ALL_RECIPES,
        payload
      }
    ];

    return store.dispatch(actions.getAllRecipeAction({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction)
      })


  });

});
