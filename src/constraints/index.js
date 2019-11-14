const validate = require('validate.js');
const moment = require('moment');
const books = require('./books');
const { CUSTOM_VALIDATORS } = require('../helpers');

validate.extend(validate.validators.datetime, {
  parse: (value, options) => {
    return moment(value, options.format).format(options.format) === value
      ? +moment.utc(value, options.format)
      : NaN;
  },
  format: (value, options) => { return moment.utc(value).format(options); },
});

validate.validators.validateField = CUSTOM_VALIDATORS.validateField;
validate.validators.validateEachItem = CUSTOM_VALIDATORS.validateEachItem;
validate.validators.duplicates = CUSTOM_VALIDATORS.duplicates;
validate.validators.validateWhere = CUSTOM_VALIDATORS.validateWhere;

module.exports = {
  books,
};
