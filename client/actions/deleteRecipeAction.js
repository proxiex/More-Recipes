import axios from 'axios';
import { DELETE_RECIPE } from './types';

export function deleteRecipeSucess(id) {
  return {
    type: DELETE_RECIPE,
    id
  };
}

export const deleteRecipeAction =  (recipeId) => (dispatch) => {
  return axios.delete('/api/v1/recipes/'+recipeId).then(res => {
    dispatch(deleteRecipeSucess(recipeId));
  });
};
