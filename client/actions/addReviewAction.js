import axios from 'axios';

export function addReviewAction(recipeId, reviewData) {
  console.log(reviewData);
  
  return dispatch => {
    return  axios.post('/api/v1/recipes/'+recipeId+'/reviews', reviewData );
  };
}