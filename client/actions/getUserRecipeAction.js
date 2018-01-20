import axios from 'axios';
import { GET_USER_RECIPES, GET_USER_RECIPES_ERROR } from './types';

export function getUserRecipesSucess(payload) {
  return {
    type: GET_USER_RECIPES,
    payload
  };
}

export function getUserRecipesFaliure(payload) {
  return {
    type: GET_USER_RECIPES_ERROR,
    payload
  };
}

export const getUserRecipesActon = (userId, page) => (dispatch) => {
  const usersId = userId ? userId : '';
  return axios.get('/api/v1/users/recipe?page='+page+'&userId='+usersId)
    .then(response => {
      dispatch(getUserRecipesSucess(response.data));
    }, error => {
      dispatch(getUserRecipesFaliure(error.response.data));
    });
};