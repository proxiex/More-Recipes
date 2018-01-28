import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
  const errors = {};

  const errMsg = 'This field is required';

  if (!data.imageUrl) {
    errors.recipeImage = errMsg;
  }

  if (Validator.isNull(data.recipeName)) {
    errors.recipeName = errMsg;
  }

  if (Validator.isNull(data.description)) {
    errors.description = errMsg;
  }

  if (Validator.isNull(data.ingredients)) {
    errors.ingredients = errMsg;
  }

  if (Validator.isNull(data.method)) {
    errors.method = errMsg;
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
export default validateInput;

