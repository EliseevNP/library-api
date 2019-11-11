const validate = require('validate.js');

/**
 * 'validate.js' npm-package doesn't support things like only validating
 * a sub key if the parent key is present. This helper resolve that.
 * (https://validatejs.org/#validate-nested)
 */
module.exports = (params, constraints) => {
  const constraintsCopy = { ...constraints };

  Object.keys(constraintsCopy)
    .filter(key => { return key.includes('.'); })
    .map(dottedKey => { return dottedKey.split('.'); })
    .forEach(keysArray => {
      let param = params[keysArray[0]];
      let i = 1;

      while (param !== undefined && i < keysArray.length - 1) {
        param = param[keysArray[i]];
        i++;
      }

      if (param === undefined) {
        delete constraintsCopy[keysArray.join('.')];
      }
    });

  return validate(params, constraintsCopy);
};
