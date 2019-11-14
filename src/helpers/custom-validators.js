const validate = require('validate.js');
const { WHERE_OPERATORS } = require('../constants');
const validateExtension = require('./validate-extension');

const validateField = (value, options) => {
  if (value === undefined) {
    return;
  }

  switch (options.type) {
    case 'string':
      if (!validate.isString(value)) {
        return 'must be of type string';
      }
      break;
    case 'object':
      if (!validate.isObject(value) || validate.isArray(value) || value === null) {
        return 'must be of type object';
      }
      break;
    default:
      throw new Error('[VALIDATORS][validateField] Unknown type');
  }

  if (!options.validator(value)) {
    return options.message;
  }
};

const validateEachItem = (value, options) => {
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

const duplicates = (value, options) => {
  if (value === undefined || options.allow) {
    return;
  }

  if (!validate.isArray(value)) {
    return 'must be of type array';
  }

  if ((new Set(value)).size !== value.length) {
    return 'must not contain duplicates';
  }
};

const validateWhere = (value, options, key) => {
  const errors = [];
  const knownKeys = [...WHERE_OPERATORS.LOGICALS, ...Object.keys(options.fieldsConstraints)];

  const validateWhereRecursive = (currentWhereObject, path) => {
    if (currentWhereObject === undefined) {
      return;
    }

    const isObject =
      validate.isObject(currentWhereObject) &&
      !validate.isArray(currentWhereObject) &&
      currentWhereObject !== null;

    if (!isObject) {
      errors.push(`${path} must be of type object`);
      return;
    }

    const keys = Object.keys(currentWhereObject);

    if (keys.length !== 1) {
      errors.push(`${path} object must have one key`);
      return;
    }

    const key = keys[0]; // eslint-disable-line no-shadow

    if (!knownKeys.includes(key)) {
      errors.push(`${path} contain unknown key '${key}' (known keys: [${knownKeys.join(',')}])`);
      return;
    }

    if (WHERE_OPERATORS.LOGICALS.includes(key)) {
      if (!validate.isArray(currentWhereObject[key])) {
        errors.push(`${path}.${key} must be of type array`);
        return;
      }

      if (currentWhereObject[key].length < 2) {
        errors.push(`${path}.${key} array must contain at least 2 items`);
        return;
      }

      currentWhereObject[key].forEach((item, index) => { validateWhereRecursive(item, `${path}.${key}[${index}]`); });
    } else {
      const leafConstraints = {
        [key]: { type: 'object' },
        [`${key}.value`]: options.fieldsConstraints[key],
        [`${key}.operator`]: {
          presence: true,
          type: 'string',
          inclusion: WHERE_OPERATORS.COMPARISONS,
        },
      };

      const validationResult = validateExtension(currentWhereObject, leafConstraints);

      if (validationResult) {
        errors.push(...Object.keys(validationResult).map(keyWithErrors => {
          return `${path}.${keyWithErrors}: [${validationResult[keyWithErrors].join(', ')}]`;
        }));
      }
    }
  };

  validateWhereRecursive(value, key);

  return errors.length !== 0 ? errors : undefined;
};

module.exports = {
  validateField,
  validateEachItem,
  duplicates,
  validateWhere,
};
