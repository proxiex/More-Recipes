import * as types from '../../actions/types';
import reviews from '../../reducers/review';

describe('Review Reducer', () => {
  it('should add review to a specific recipe', () => {
    const payload = {
      review: 'this is a review'
    }
    const action = {
      type: types.ADD_REVIEW,
      payload
    }
    const newState = reviews([], action);
    expect(newState).toEqual(payload);
  });

  it('should get reviews for a specific recipe', () => {
    const payload = [
      {
        id: 1,
        recipeId: 1,
        review: '',
        user: {
          id: 4, 
          username: '',
          avatar: ''
        }
      }
    ]
    const action = {
      type: types.GET_RECIPE_REVIEW,
      payload
    }
    const newState = reviews([], action);
    expect(newState).toEqual(payload)
  });
});
