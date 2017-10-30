import axios from 'axios';

export function getAllRecipeAction() {
  return dispatch => {
    return  axios.get('/api/v1/recipes/');
  };
}