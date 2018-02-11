import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as actions from '../../../actions/favorites/favoriteRecipe';
import * as types from '../../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('favoriteRecipeAction', () => {
  it('should create action for favorite recipe', () => {
    const payload = {
      message: 'Recipe has been added to your favorite list'
    }
    const expectedAction = {
      type: types.FAVORITE_RECIPE,
      payload
    }
    expect(actions.favoriteRecipeSucess(payload)).toEqual(expectedAction);
  });

  it('should dispatch FAVORITE_RECIPE action', () => {
    const store = mockStore({});
    axios.post = jest.fn(() => Promise.resolve({
      data: {
        message: 'Recipe has been added to your favorite list'
      }
    }));
    const payload = {
      message: 'Recipe has been added to your favorite list'
    }
    const expectedAction = [{
      type: types.FAVORITE_RECIPE,
      payload
    }]

    return store.dispatch(actions.favoriteRecipeAction({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction)
      })
  })
})