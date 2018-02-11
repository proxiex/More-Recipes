import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as actions from '../../../actions/recipes/deleteRecipe';
import * as types from '../../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('deleteRecipeAction', () => {
  it('should create an action to delete a specific recipe', () => {
    const id = { id: 1 };
    const expectedAction =  {
      type: types.DELETE_RECIPE,
      id
    };
    expect(actions.deleteRecipeSucess(id)).toEqual(expectedAction);
  });

  it('should dispatch DELETE_RECIPE action', () => {
    const store = mockStore({});
    const id = 1;
    axios.delete = jest.fn(( id ) => Promise.resolve({
      message: 'recipe deleted!'
    }));

  const expectedAction = [
    {
      type: types.DELETE_RECIPE,
      id: 1
    }
  ];

  return store.dispatch(actions.deleteRecipeAction(id))
    .then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    })
  });

});
