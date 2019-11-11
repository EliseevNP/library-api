const validate = require('validate.js');
const moment = require('moment');
const books = require('./books');

validate.extend(validate.validators.datetime, {
  parse: (value, options) => {
    return moment(value, options.format).format(options.format) === value
      ? +moment.utc(value, options.format)
      : NaN;
  },
  format: (value, options) => { return moment.utc(value).format(options); },
});

validate.validators.validateField = (value, options) => {
  if (value === undefined) {
    return;
  }

  if (!validate.isString(value)) {
    return 'must be of type string';
  }

  if (!options.validator(value)) {
    return options.message;
  }
};

validate.validators.validateEachItem = (value, options) => {
  if (value === undefined) {
    return;
  }

  if (!validate.isArray(value)) {
    return 'must be of type array';
  }

  try {
    value.forEach(item => {
      if (!options.validator(item)) {
        throw new Error(options.message);
      }
    });
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  books,
};
