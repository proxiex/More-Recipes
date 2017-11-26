import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput (data) {
  
  let errors={};
  const errMsg = 'This field is required';

  if (Validator.isNull(data.username)) {
    errors.username = errMsg;
  }

  if (Validator.isNull(data.email)) {
    errors.email = errMsg;

  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isNull(data.password)) {
    errors.password = errMsg;
    
  } else if (data.password.length < 6) {
    errors.password = 'Password is Tooooo Short';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}



