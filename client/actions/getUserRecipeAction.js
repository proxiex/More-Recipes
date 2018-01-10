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

export const getUserRecipesActon = (userId) => (dispatch) => {
  const usersId = userId ? userId : '';
  return axios.get('/api/v1/users/recipe?userId='+usersId)
    .then(response => {
      console.log('from action', response.data.recipe)
      dispatch(getUserRecipesSucess(response.data.recipe));
    }, error => {
      dispatch(getUserRecipesFaliure(error.response.data));
    });
};