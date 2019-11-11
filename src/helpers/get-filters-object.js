const { FILTER_OPERATORS } = require('../constants');

/**
 * Transform <fieldsObj> to the form necessary for 'validate.js' npm-package.
 * (https://validatejs.org/#validate-nested)
 *
 * param fieldsObj:
 * {
 *   property1: 'value1',
 *   property2: 'value2',
 * }
 *
 * returned value:
 * {
 *   filter: {
 *     type: 'object',
 *   },
 *   'filter.property1': {
 *     type: 'object',
 *   },
 *   'filter.property1.value': 'value1',
 *   'filter.property1.operator': {
 *     presence: true,
 *     type: 'string',
 *     inclusion: <FILTER_OPERATORS>,
 *   },
 *   'filter.property2': {
 *     type: 'object',
 *   },
 *   'filter.property2.value': 'value2',
 *   'filter.property2.operator': {
 *     presence: true,
 *     type: 'string',
 *     inclusion: <FILTER_OPERATORS>,
 *   },
 * }
 */
module.exports = fieldsObj => {
  return Object.assign(
    { filter: { type: 'object' } },
    ...Object.keys(fieldsObj).map(fieldKey => {
      return {
        [`filter.${fieldKey}`]: {
          type: 'object',
        },
        [`filter.${fieldKey}.value`]: fieldsObj[fieldKey],
        [`filter.${fieldKey}.operator`]: {
          presence: true,
          type: 'string',
          inclusion: FILTER_OPERATORS,
        },
      };
    }),
  );
};
