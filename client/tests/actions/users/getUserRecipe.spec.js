import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as actions from '../../../actions/users/getUserRecipe';
import * as types from '../../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getUserRecipe', () => {
  it('should create an action for get user recipe', () => {
    const payload = [
      {
        id: 1,
        recipeName: 'rice',
        recipeImage: ''
      }
    ]
    const expectedAction = {
      type: types.GET_USER_RECIPES,
      payload
    }

    expect(actions.getUserRecipesSucess(payload)).toEqual(expectedAction)
  });

  it('should create an action for get user recipe faliure', () => {
    const payload = {
      message: 'error here'
    }
    const expectedAction = {
      type: types.GET_USER_RECIPES_ERROR,
      payload
    }

    expect(actions.getUserRecipesFaliure(payload)).toEqual(expectedAction)
  });

  it('should dispatch GET_USER_RECIPES action', () => {
    const store = mockStore({})
    axios.get = jest.fn(() => Promise.resolve({ 
      data: [
        {
          id: 1,
          recipeName: 'rice',
          recipeImage: ''
        }
      ]
    }));

    const payload = [
      {
        id: 1,
        recipeName: 'rice',
        recipeImage: ''
      }
    ]

    const expectedAction = [
      {
        type: types.GET_USER_RECIPES,
        payload
      }
    ]
    return store.dispatch(actions.getUserRecipesActon({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction)
      })
  })

  it('should dispatch GET_USER_RECIPES_ERROR action', () => {
    const store = mockStore({})
    axios.get = jest.fn(() => Promise.resolve({
      response: {
        data: {
          message: 'error'
        }
      }
    }));

    const payload = {
      message: 'error'
    }

    const expectedAction = [
      {
        type: types.GET_USER_RECIPES_ERROR,
        payload
      }
    ]
    return store.dispatch(actions.getUserRecipesActon({}))
      .catch(() => {
        expect(store.getActions()).toEqual(expectedAction)
      })
  })

});
