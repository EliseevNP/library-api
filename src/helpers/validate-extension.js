/* eslint-disable no-param-reassign */

const validate = require('validate.js');

/**
 * This helper is an extension of the 'validate.js' npm-package which solves the following problems:
 *
 * 1) Supporting validating a sub key only if the parent key is present
 *    (https://validatejs.org/#validate-nested);
 *
 * 2) Supporting for applying default values to the specified 'params' object.
 *
 * 3) Transform values before validating
 */

validate.validators.default = () => {};
validate.validators.transform = () => {};

const handleBeforeValidate = (object, key, constraints) => {
  const value = object[key];
  const { transform, default: defaultValue } = constraints;

  if (value === undefined && defaultValue !== undefined) {
    // Set default value
    object[key] = defaultValue;
  }

  if (value !== undefined && transform) {
    // Transform
    object[key] = transform()(object[key]);
  }
};

module.exports = (params, constraints, options) => {
  const constraintsCopy = { ...constraints };

  Object.keys(constraintsCopy)
    .map(key => { return key.split('.'); })
    .forEach(keysArray => {
      if (keysArray.length > 1) {
        // Nested constraint

        let param = params[keysArray[0]];
        let i = 1;

        while (param !== undefined && i < keysArray.length - 1) {
          param = param[keysArray[i]];
          i++;
        }

        if (param === undefined) {
          // Delete unnecessary nested constraint
          delete constraintsCopy[keysArray.join('.')];
        } else {
          handleBeforeValidate(param, keysArray[keysArray.length - 1], constraintsCopy[keysArray.join('.')]);
        }
      } else {
        handleBeforeValidate(params, keysArray[0], constraintsCopy[keysArray[0]]);
      }
    });

  return validate(params, constraintsCopy, { fullMessages: false, ...options });
};
