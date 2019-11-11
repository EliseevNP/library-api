const isUUID = require('is-uuid');
const { getFiltersObject } = require('../helpers');

const bookFields = {
  title: {
    presence: true,
    type: 'string',
    length: {
      maximum: 255,
    },
  },
  date: {
    presence: true,
    type: 'string',
    datetime: {
      format: 'YYYY-MM-DD',
    },
  },
  description: {
    presence: true,
    type: 'string',
    length: {
      maximum: 65535,
    },
  },
  image: {
    presence: true,
    type: 'string',
    length: {
      maximum: 255,
    },
  },
  authors: {
    type: 'array',
    length: {
      minimum: 1,
      tooShort: 'must have at least one element',
    },
    validateEachItem: {
      validator: item => { return isUUID.v1(item); },
      message: 'must contain only uuid items',
    },
  },
};

const sortInclusion = [
  ...Object.keys(bookFields),
  ...Object.keys(bookFields).map(bookFieldKey => { return `${bookFieldKey} ASC`; }),
  ...Object.keys(bookFields).map(bookFieldKey => { return `${bookFieldKey} DESC`; }),
];

module.exports.createBooks = {
  ...bookFields,
};

module.exports.updateBooks = {
  id: {
    presence: true,
    type: 'string',
    validateField: {
      validator: field => { return isUUID.v1(field); },
      message: 'must have uuid format',
    },
  },
  ...bookFields,
};

module.exports.getBooks = {
  offset: {
    numericality: {
      onlyInteger: true,
      greaterThan: 0,
    },
  },
  limit: {
    numericality: {
      onlyInteger: true,
      greaterThan: 0,
      lessThanOrEqualTo: 100,
    },
  },
  sort: {
    type: 'array',
    length: {
      minimum: 1,
      tooShort: 'must have at least one element',
    },
    validateEachItem: {
      validator: item => { return sortInclusion.includes(item); },
      message: `must contain only permitted items, such as: [${sortInclusion.join(', ')}]`,
    },
  },
  ...getFiltersObject(bookFields),
};
