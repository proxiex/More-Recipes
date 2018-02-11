import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as actions from '../../../actions/recipes/addRecipe';
import * as types from '../../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('addRecipeAction', () => {
  it('should create an action for create a recipe', () => {
    const payload = { id: 1, recipeName: 'butter', recipeImage: '' };
    const expectedAction = {
      type: types.ADD_NEW_RECIPE,
      payload
    };

    expect(actions.addRecipeSuccess(payload)).toEqual(expectedAction);
  });

  it('should dispatch ADD_NEW_RECIPE action', () => {
    
    const store = mockStore({});
    axios.post = jest.fn(() => Promise.resolve({
      data: 
        {
          id: 1, recipeName: 'butter', recipeImage: ''
        }
      
    }));

    const expectedAction = [
      {
        type: types.ADD_NEW_RECIPE,
        payload: {
          id: 1, recipeName: 'butter', recipeImage: ''
        }
      }
    ];

    return store.dispatch(actions.addRecipeAction({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
  });
});

