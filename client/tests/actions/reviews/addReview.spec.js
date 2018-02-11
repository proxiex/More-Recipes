import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as actions from '../../../actions/reviews/addReview';
import * as types from '../../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('addReviewAction', () => {
  it('should create an action to add review to a specific recipe', () => {
    const payload = [{ id: 1, review: 'some revie here'}];
    const expectedAction = {
      type: types.ADD_REVIEW,
      payload
    };

    expect(actions.addReviewSucess(payload)).toEqual(expectedAction);
  });

  it('should dispatch ADD_REVIEW action', () => {
    const store = mockStore({});
    axios.post = jest.fn(() => Promise.resolve({
      data: {
        review: [
          {
            id: 1,
            recipeId: 2,
            userId: 5,
            review: 'some stuff'
          },
          {
            id: 2,
            recipeId: 2,
            userId: 4,
            review: 'some stuff'
          }
        ]
      }
    }));

    const expectedAction = [{
      type: types.ADD_REVIEW,
      payload: [
        {
          id: 2,
          recipeId: 2,
          userId: 4,
          review: 'some stuff'
        },
        {
          id: 1,
          recipeId: 2,
          userId: 5,
          review: 'some stuff'
        }
      ]
    }];

    return store.dispatch(actions.addReviewAction([])).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
