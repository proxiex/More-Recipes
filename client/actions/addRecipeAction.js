import axios from 'axios';

export function addRecipeAction(recipeData) {
  return dispatch => {
    return  axios.post('/api/v1/recipes/', recipeData );
  };
}