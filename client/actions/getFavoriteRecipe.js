import axios from 'axios';
import { GET_FAVORITE_RECIPES } from './types';

export function getFavoriteRecipeSucess(payload) {
  return {
    type: GET_FAVORITE_RECIPES,
    payload
  };
}



export const getFavoriteRecipeAction = (userId) => (dispatch) => {
  return axios.get(`/api/v1/users/${userId}/favorites`)
    .then( response => {
      dispatch(getFavoriteRecipeSucess(response.data));
    });
};
