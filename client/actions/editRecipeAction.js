import axios from 'axios';
import { EDIT_RECIPE } from './types';

export function editRecipeSucess(payload) {
  return {
    type: EDIT_RECIPE,
    payload
  };
}

export const editRecipeAction = (recipeData, recipeId) => (dispatch) => {
  return axios.put(`/api/v1/recipes/${recipeId}`, recipeData).then( res => {
    dispatch(editRecipeSucess(res.data));
  });
};