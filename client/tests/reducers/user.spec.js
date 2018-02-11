import * as types from '../../actions/types';
import {
  userRecipe,
  profile
} from '../../reducers/user';

describe('User Reducer', () => {
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
  describe('Recipes', () => {
    it('should get user recipe', () => {
      const action = {
        type: types.GET_USER_RECIPES,
        payload
      }
      const newState = userRecipe([], action);

      expect(newState).toEqual(payload);
    });

    it('should delete a recipe', () => {
      const action = {
        type: types.DELETE_RECIPE,
        id: 1
      }
      const newState = userRecipe(payload, action)
      expect(newState).toEqual([{
        id: 2, 
        recipeName: '',
        recipeImage: ''
      }])
    })
  });

  describe('Profile', () => {
    it('should update user Profile', () => {
      const state = {
        UserDetails: {
          username: '',
          avatar: ''
        }
      }
      const payload = {
        UserDetails: {
          username: 'Proxie',
          avatar: 'face-icon'
        }
      }
      const action = {
        type: types.UPDATE_USER_PROFILE,
        payload
      }

      const newState = profile(state, action);
      expect(newState).toEqual(payload);

    });

    it('should get user profile', () => {
      const payload = {
        user: {
          username: '',
          avatar: ''
        },
        totalRecipes: 4,
        myFavorites: 4
      }
      const action = {
        type: types.GET_USER_PROFILE,
        payload
      }
      const newState = profile([], action);
      expect(newState).toEqual(payload);
    });
  })
  
});
