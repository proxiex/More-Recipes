import axios from 'axios';
import { VOTE } from './types';

export function upVoteSucess(payload) {
  return {
    type: VOTE,
    payload
  };
}

export const voteAction = (recipeId, type) => (dispatch) => {
  return  axios.post('/api/v1/recipes/'+recipeId+'/votes?vote='+type ).then( res => {
    dispatch(upVoteSucess(res.data));
  });
};
