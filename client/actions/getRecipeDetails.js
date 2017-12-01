import axios from 'axios';
import { GET_RECIPE_DETAILS } from './types';
import { GET_RECIPE_REVIEW } from './types';

export function getRecipeDetailsSuccess(payload) {
  return {
    type: GET_RECIPE_DETAILS,
    payload
  };
}

export function getRecipeReviewSucess(payload) {
  return {
    type: GET_RECIPE_REVIEW,
    payload
  };
}

export const getRecipeDetails = (recipeId) => (dispatch) =>  {
  return  axios.get('/api/v1/recipes/'+recipeId).then(res => {
    dispatch(getRecipeDetailsSuccess(res.data));
    dispatch(getRecipeReviewSucess(res.data.reviews));
  });
};