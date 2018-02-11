import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as actions from '../../../actions/favorites/getFavoriteRecipe';
import * as types from '../../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getFavoriteRecipe', () => {
  it('should create an action to get all favorite recipes', () => {
    const payload = [
      {
        id: 1, 
        userId: 2,
        recipeId: 4,
        recipe: {
          id: 4,
          reicpeName: ''
        }
      },
      {
        id: 1, 
        userId: 2,
        recipeId: 4,
        recipe: {
          id: 4,
          reicpeName: ''
        }
      }
    ]
    const expectedAction = {
      type: types.GET_FAVORITE_RECIPES,
      payload
    }
    expect(actions.getFavoriteRecipeSucess(payload)).toEqual(expectedAction);
  });

  it('should dispatch GET_FAVORITE_RECIPES action', () => {
    const store = mockStore({});
    axios.get = jest.fn(() => Promise.resolve({
      data: [
        {
          id: 1, 
          userId: 2,
          recipeId: 4,
          recipe: {
            id: 4,
            reicpeName: ''
          }
        },
        {
          id: 1, 
          userId: 2,
          recipeId: 4,
          recipe: {
            id: 4,
            reicpeName: ''
          }
        }
      ]
    }));

    const payload = [
      {
        id: 1, 
        userId: 2,
        recipeId: 4,
        recipe: {
          id: 4,
          reicpeName: ''
        }
      },
      {
        id: 1, 
        userId: 2,
        recipeId: 4,
        recipe: {
          id: 4,
          reicpeName: ''
        }
      }
    ]
    const expectedAction = [{
      type: types.GET_FAVORITE_RECIPES,
      payload
    }]

    return store.dispatch(actions.getFavoriteRecipeAction({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction)
      })
  });
})
