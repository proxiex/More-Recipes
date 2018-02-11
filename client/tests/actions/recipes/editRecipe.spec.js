import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as actions from '../../../actions/recipes/editRecipe';
import * as types from '../../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('editRecipeAction', () => {
  it('should create an action for edit receipe', () => {
    const payload = { id: 1, reecipeName: 'some', method: 'stuff' };
    const expectedAction = {
      type: types.EDIT_RECIPE,
      payload
    };

    expect(actions.editRecipeSucess(payload)).toEqual(expectedAction);
  });

  it('should dispatch EDIT_RECIPE action ', () => {
    const store = mockStore({});
    
    axios.put =  jest.fn(() => Promise.resolve({
      data: {
        id: 1, recipeName: 'rice and beans', recipeImage: ''
      }
    }));

    const expectedAction = [
      {
        type: types.EDIT_RECIPE,
        payload: {
        id: 1, recipeName: 'rice and beans', recipeImage: ''          
        }
      }
    ];
    return store.dispatch(actions.editRecipeAction({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedAction)
      })
  });
})  
