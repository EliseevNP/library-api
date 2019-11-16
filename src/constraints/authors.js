const authorFields = {
  name: {
    presence: true,
    type: 'string',
    length: {
      maximum: 255,
    },
  },
  second_name: {
    presence: true,
    type: 'string',
    length: {
      maximum: 255,
    },
  },
  patronymic: {
    presence: true,
    type: 'string',
    length: {
      maximum: 255,
    },
  },
};

module.exports.authorFields = authorFields;
