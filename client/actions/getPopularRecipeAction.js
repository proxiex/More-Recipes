import axios from 'axios';
import { POPULAR_RECIPE } from './types';

export function getPopularRecipeSuccess(payload) {
  return  {
    type: POPULAR_RECIPE,
    payload
  };
}

export const getPopularRecipeAction  = () => (dispatch) => {
  return axios.get('/api/v1/recipes/popular').then(res => {
    dispatch(getPopularRecipeSuccess(res.data.popularRecipes));
  });
};