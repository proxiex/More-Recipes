import axios from 'axios';
import { GET_ALL_RECIPES } from './types';

export function getAllRecipeSuccess(payload) {
  return  {
    type: GET_ALL_RECIPES,
    payload
  };
}

export const getAllRecipeAction  = (page) => (dispatch) => {
  return axios.get('/api/v1/recipes?page='+page).then(res => {
    dispatch(getAllRecipeSuccess(res.data));
  });
};