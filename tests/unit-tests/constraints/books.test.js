const chai = require('chai');
const randomstring = require('randomstring');
const { books } = require('../../../src/constraints');
const { validate } = require('../../../src/helpers');

const { expect } = chai;

describe('books constraints', () => {
  describe('createBooks', () => {
    it('blank parameters', () => {
      const expectedErrors = {
        title: ['Title can\'t be blank'],
        date: ['Date can\'t be blank'],
        description: ['Description can\'t be blank'],
        image: ['Image can\'t be blank'],
      };

      expect(validate({}, books.createBooks)).to.be.deep.equal(expectedErrors);
    });

    it('incorrect types', () => {
      const values = {
        title: { error: 'should be string' },
        date: { error: 'should be string' },
        description: { error: 'should be string' },
        image: { error: 'should be string' },
        authors: { error: 'should be array' },
      };

      const expectedErrors = {
        title: ['Title must be of type string', 'Title has an incorrect length'],
        date: ['Date must be of type string', 'Date must be a valid date'],
        description: ['Description must be of type string', 'Description has an incorrect length'],
        image: ['Image must be of type string', 'Image has an incorrect length'],
        authors: ['Authors must be of type array', 'Authors has an incorrect length'],
      };

      expect(validate(values, books.createBooks)).to.be.deep.equal(expectedErrors);
    });

    it('incorrect length', () => {
      const values = {
        date: '2019-01-01', // correct value
        title: randomstring.generate(256),
        description: randomstring.generate(65536),
        image: randomstring.generate(256),
        authors: [],
      };

      const expectedErrors = {
        title: ['Title is too long (maximum is 255 characters)'],
        description: ['Description is too long (maximum is 65535 characters)'],
        image: ['Image is too long (maximum is 255 characters)'],
        authors: ['Authors must have at least one element'],
      };

      expect(validate(values, books.createBooks)).to.be.deep.equal(expectedErrors);
    });

    it('incorrect date format', () => {
      const values = {
        title: randomstring.generate(), // correct value
        description: randomstring.generate(), // correct value
        image: randomstring.generate(), // correct value
        date: 'date must be in the \'YYYY-MM-DD\' format',
      };

      const expectedErrors = {
        date: ['Date must be a valid date'],
      };

      expect(validate(values, books.createBooks)).to.be.deep.equal(expectedErrors);
    });

    it('not uuid item in authors array', () => {
      const values = {
        title: randomstring.generate(), // correct value
        description: randomstring.generate(), // correct value
        image: randomstring.generate(), // correct value
        date: '2019-01-01', // correct value
        authors: ['not uuid value'],
      };

      const expectedErrors = {
        authors: ['Authors must contain only uuid items'],
      };

      expect(validate(values, books.createBooks)).to.be.deep.equal(expectedErrors);
    });
  });

  describe('updateBooks', () => {
    it('blank parameters', () => {
      const values = {
        title: randomstring.generate(), // correct value
        description: randomstring.generate(), // correct value
        image: randomstring.generate(), // correct value
        date: '2019-01-01', // correct value
      };

      const expectedErrors = {
        id: ['Id can\'t be blank'],
      };

      expect(validate(values, books.updateBooks)).to.be.deep.equal(expectedErrors);
    });

    it('incorrect types', () => {
      const values = {
        title: randomstring.generate(), // correct value
        description: randomstring.generate(), // correct value
        image: randomstring.generate(), // correct value
        date: '2019-01-01', // correct value
        id: { erorr: 'should be uuid' },
      };

      const expectedErrors = {
        id: ['Id must be of type string'],
      };

      expect(validate(values, books.updateBooks)).to.be.deep.equal(expectedErrors);
    });

    it('id is not uuid', () => {
      const values = {
        title: randomstring.generate(), // correct value
        description: randomstring.generate(), // correct value
        image: randomstring.generate(), // correct value
        date: '2019-01-01', // correct value
        id: 'not uuid format',
      };

      const expectedErrors = {
        id: ['Id must have uuid format'],
      };

      expect(validate(values, books.updateBooks)).to.be.deep.equal(expectedErrors);
    });
  });

  describe('getBooks', () => {
    it('incorrect types', () => {
      const values = {
        offset: 'should be number',
        limit: 'should be number',
        sort: 'should be array',
        filter: 'should be object',
      };

      const expectedErrors = {
        limit: ['Limit is not a number'],
        offset: ['Offset is not a number'],
        sort: ['Sort must be of type array'],
        filter: ['Filter must be of type object'],
      };

      expect(validate(values, books.getBooks)).to.be.deep.equal(expectedErrors);
    });

    it('incorrect length', () => {
      const values = {
        sort: [],
      };

      const expectedErrors = {
        sort: ['Sort must have at least one element'],
      };

      expect(validate(values, books.getBooks)).to.be.deep.equal(expectedErrors);
    });

    it('not integer offset/limit', () => {
      const values = {
        offset: 1.5,
        limit: 1.5,
      };

      const expectedErrors = {
        limit: ['Limit must be an integer'],
        offset: ['Offset must be an integer'],
      };

      expect(validate(values, books.getBooks)).to.be.deep.equal(expectedErrors);
    });

    it('too small offset/limit', () => {
      const values = {
        offset: 0,
        limit: 0,
      };

      const expectedErrors = {
        limit: ['Limit must be greater than 0'],
        offset: ['Offset must be greater than 0'],
      };

      expect(validate(values, books.getBooks)).to.be.deep.equal(expectedErrors);
    });

    it('too big limit', () => {
      const values = {
        limit: 101,
      };

      const expectedErrors = {
        limit: ['Limit must be less than or equal to 100'],
      };

      expect(validate(values, books.getBooks)).to.be.deep.equal(expectedErrors);
    });

    it('unknown item in sort array', () => {
      const values = {
        sort: ['unknown item'],
      };

      const expectedErrors = {
        sort: ['Sort must contain only permitted items, such as: [title, date, description, image, authors, title ASC, date ASC, description ASC, image ASC, authors ASC, title DESC, date DESC, description DESC, image DESC, authors DESC]'],
      };

      expect(validate(values, books.getBooks)).to.be.deep.equal(expectedErrors);
    });
  });
});
