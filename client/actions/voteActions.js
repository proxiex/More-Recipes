import axios from 'axios';

export function voteAction(recipeId, type) {

  return dispatch => {
    return  axios.post('/api/v1/recipes/'+recipeId+'/votes?vote='+type );
  };
}