import axios from 'axios';
import { FAVORITE_RECIPE } from './types';

export function favoriteRecipeSucess(payload) {
  return {
    type: FAVORITE_RECIPE,
    payload
  };
}

export const favoriteRecipeAction = (recipeId) => (dispatch) => {
  return axios.post(`/api/v1/users/${recipeId}/favorites`)
    .then(response => {
      dispatch(favoriteRecipeSucess(response.data));
    });
};