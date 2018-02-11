import * as types from '../../actions/types';
import favorites from '../../reducers/favorites';

const state = [];

describe('Favorites Reducer', () => {
  it('should favorite a recipe', () => {
    const payload = {
      message: 'Recipe has been added to your favorite list'
    }
    const action = {
      type: types.FAVORITE_RECIPE,
      payload
    }
    const newState = favorites(state, action)
    expect(newState).toEqual(payload)
  });

  it('should get all user favorite recipes', () => {
    const payload = [
      {
        id: 1, 
        recipeId: 1,
        userId: 1, 
        reicpe: {
          id: 1,
          recipeName: ''
        }
      }
    ]
    const action = {
      type: types.GET_FAVORITE_RECIPES,
      payload
    }
    const newState = favorites(state, action);
    expect(newState).toEqual(payload);
  });
})