const chai = require('chai');
const { validateExtension } = require('../../../src/helpers');

const { expect } = chai;

describe('validate extension', () => {
  it('should set default values', () => {
    const values = {
      info: {},
    };

    const constraints = {
      author: {
        default: 'Nikita Eliseev',
      },
      'info.birthday': {
        default: '19.03.97',
      },
      'not.specified.param': {
        default: 'this must not present in values after validation',
      },
    };

    expect(validateExtension(values, constraints)).to.be.undefined;
    expect(values).to.be.deep.equal({
      author: 'Nikita Eliseev',
      info: {
        birthday: '19.03.97',
      },
    });
  });

  it('should transform values', () => {
    const values = {
      author: 'Nikita',
      info: {
        birthday: '19.03',
      },
    };

    const constraints = {
      author: {
        transform: () => {
          return (value => {
            return `${value} Eliseev`;
          });
        },
      },
      'info.birthday': {
        transform: () => {
          return (value => {
            return `${value}.97`;
          });
        },
      },
      'not.specified.param': {
        transform: () => {
          return (() => {
            return 'this must not present in values after validation';
          });
        },
      },
    };

    expect(validateExtension(values, constraints)).to.be.undefined;
    expect(values).to.be.deep.equal({
      author: 'Nikita Eliseev',
      info: {
        birthday: '19.03.97',
      },
    });
  });
});
