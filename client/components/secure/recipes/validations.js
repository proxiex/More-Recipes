import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput (data, errors={}) {

  const errMsg = 'This field is required';

  if (Validator.isNull(data.file)) {
    errors.file = errMsg;
  }

  if (Validator.isNull(data.recipeName)) {
    errors.recipeName = errMsg;

  } 
  
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isNull(data.password)) {
    errors.password = errMsg;
    
  } 
  
  if (data.password.length < 6) {
    errors.password = 'Password is Tooooo Short';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}



