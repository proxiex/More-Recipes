import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as actions from '../../../actions/recipes/getRecipeDetails';
import * as types from '../../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getRecipeDetails', () => {
  it('should create an action to get details for a specific recipe', () => {
    const payload = {
        id: 1,
        recipeName: 'Rice and Beans',
        recipeImage: ''
      }
    const expectedActon = {
      type: types.GET_RECIPE_DETAILS,
      payload
    }

    expect(actions.getRecipeDetailsSuccess(payload)).toEqual(expectedActon)
  });

  it('should create an action to get details for a specific recipe reviews', () => {
    const payload = [
     {
        id: 1,
        review: 'Rice and Beans',
        user: {
          userId: 1,
          username: 'Proxie'
        }
      }
    ]
    const expectedActon = {
      type: types.GET_RECIPE_REVIEW,
      payload
    }


    expect(actions.getRecipeReviewSucess(payload)).toEqual(expectedActon)
  });

  it('should dispatch GET_RECIPE_DETAILS', () => {
     const store = mockStore({});
     axios.get = jest.fn(() => Promise.resolve({
        data: {
          id: 1,
          recipeName: 'Rice and Beans',
          recipeImage: '',
          reviews: [
            {
              id: 1,
              review: 'sdsd',
              user: {
                id: 1,
                username: 'me'
              }
            }
          ]
        }
     }));

     const payload = {
      id: 1,
      recipeName: 'Rice and Beans',
      recipeImage: '',
      reviews: [
        {
          id: 1,
          review: 'sdsd',
          user: {
            id: 1,
            username: 'me'
          }
        }
      ]
     }
  
    const expectedActon = [
      {
        type: types.GET_RECIPE_DETAILS,
        payload
      },
      {
        type: types.GET_RECIPE_REVIEW,
        payload: [
            {
              id: 1,
              review: 'sdsd',
              user: {
                id: 1,
                username: 'me'
              }
            }
          ]
        }
    ]
  
    return store.dispatch(actions.getRecipeDetails({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActon)
      });

  });

});