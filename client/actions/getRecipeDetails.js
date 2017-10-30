import axios from 'axios';

export function getRecipeDetails(recipeId) {
  return dispatch => {
    return  axios.get('/api/v1/recipes/'+recipeId);
  };
}