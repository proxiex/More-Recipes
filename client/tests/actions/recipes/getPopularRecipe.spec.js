import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as actions from '../../../actions/recipes/getPopularRecipe';
import * as types from '../../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getPopularRecipeAction', () => {
  it('should create an action to get popular recipes', () => {
    const payload = [
      {
        id: 1,
        recipeName: 'rice and beans'
      }
    ]
    const expectedAction = {
      type: types.POPULAR_RECIPE,
      payload
    };
    expect(actions.getPopularRecipeSuccess(payload)).toEqual(expectedAction);
  });

  it('should dispatch POPULAR_RECIPE', () => {
    const store = mockStore({});
    axios.get = jest.fn(() => Promise.resolve({
      data:{
        popularRecipes: [
          {
            id: 1,
            recipeName: 'rice and beans'
          },
          {
            id: 2,
            recipeName: 'yam and eggs'
          }
        ]
      } 
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
        type: types.POPULAR_RECIPE,
        payload
      }
    ];

    return store.dispatch(actions.getPopularRecipeAction({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction)
      })


  });
})
