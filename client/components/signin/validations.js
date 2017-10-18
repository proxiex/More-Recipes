import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput (data) {
  let errors = {};
  const errMsg = 'This field is required';

  if (Validator.isNull(data.username)) {
    errors.username = errMsg;
  }

  if (Validator.isNull(data.password)) {
    errors.password = errMsg;
    
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}



