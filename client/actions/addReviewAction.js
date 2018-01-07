import axios from 'axios';
import { ADD_REVIEW } from './types';

export function addReviewSucess(payload) {
  return {
    type: ADD_REVIEW,
    payload
  };
}

export const addReviewAction = (recipeId, reviewData) => (dispatch) => {
  return  axios.post('/api/v1/recipes/'+recipeId+'/reviews', reviewData ).then(res => {
    const review = res.data.sort(function(a, b){ return b.id - a.id; });
    dispatch(addReviewSucess(review));
  });
};