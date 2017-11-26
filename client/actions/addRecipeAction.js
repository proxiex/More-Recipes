import axios from 'axios'; 
import { ADD_NEW_RECIPE } from './types';

 
export function addRecipeSuccess(payload) {
  return  {
    type: ADD_NEW_RECIPE,
    payload
  };
}

export const addRecipeAction = recipeData => (dispatch) => {
  return  axios.post('/api/v1/recipes/', recipeData ).then(res => {
    dispatch(addRecipeSuccess(res.data));
  });
};