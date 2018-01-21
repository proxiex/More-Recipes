import axios from 'axios';
import { SEARCH_RECIPE } from './types';


export function searchSucess(payload) {
  return  {
    type: SEARCH_RECIPE,
    payload
  };
}

export const searchSucessAction  = (search, page) => (dispatch) => {
  return axios.get('/api/v1/recipes?search='+search+'&page='+page).then(res => {
    console.log('action search', res.data)
    dispatch(searchSucess(res.data));
  });
};