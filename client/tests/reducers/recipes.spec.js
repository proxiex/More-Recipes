import * as types from '../../actions/types';
import { 
  recipe as singleRecipeReducer, 
  recipes as allRecipeReducer,
  popularRecipe 
} from '../../reducers/recipe';
import { access } from 'fs';

describe('Recipe Reducer', () => {
  describe('All recipe reducer', () => {
    it('should add a new recipe', () => {
      const payload = {
        id: 1, 
        recipeName: '',
        recipeImage: ''
      }
      const action = {
        type: types.ADD_NEW_RECIPE,
        payload
      }
      const newState = allRecipeReducer([], action);
      expect(newState).toEqual([payload])
    });

    const payload = {
      recipes: [
          {
          id: 1, 
          recipeName: '',
          recipeImage: ''
        },
        {
          id: 2, 
          recipeName: '',
          recipeImage: ''
        }
      ]
    }
    const state = payload;

    it('should get all recipes', () => {
      const action = {
        type: types.GET_ALL_RECIPES,
        payload
      }
      const newState = allRecipeReducer([], action);
      expect(newState).toEqual(payload)
    });

    it('should delete a specific recipe', () => {
      const action = {
        type: types.DELETE_RECIPE,
        id: 1
      }
      const newState = allRecipeReducer(state, action);
      expect(newState).toEqual([{
        id: 2, 
        recipeName: '',
        recipeImage: '' 
      }]);
    });

    it('should search for reicpes', () => {
      const action = {
        type: types.SEARCH_RECIPE,
        payload
      }
      const newState = allRecipeReducer([], action);
      expect(newState).toEqual(payload)
    });
  });

  describe('Single recipe Reducer', () => {
    const payload = {
      id: 1, 
      userId: 3,
      recipeName: '',
      recipeImage: '',
      upVote: 1
    }
    it('should get details of a specific recipe', () => {
      const action = {
        type: types.GET_RECIPE_DETAILS,
        payload
      }
      const newState = singleRecipeReducer([], action);
      expect(newState).toEqual(payload);
    });

    it('should vote a recipe', () => {
      const action = {
        type: types.VOTE,
        payload
      }
      const newState = singleRecipeReducer([], action);
      expect(newState).toEqual(payload);
    });

    it('should edit recipe', () => {
      const action = {
        type: types.EDIT_RECIPE,
        payload
      }
      const newState = singleRecipeReducer([], action);
      expect(newState).toEqual(payload);
    });
  });

  describe('Popular Recipes', () => {
    it('should get popuar recipes', () => {
      const payload = [
        {
          id: 1, 
          userId: 3,
          reicpeName: '',
        }
      ]
      const action = {
        type: types.POPULAR_RECIPE,
        payload
      }

      const newState = popularRecipe([], action);
      expect(newState).toEqual(payload);
    })
  })
});
