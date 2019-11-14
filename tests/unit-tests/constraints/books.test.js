const chai = require('chai');
const randomstring = require('randomstring');
const { books } = require('../../../src/constraints');
const { validateExtension } = require('../../../src/helpers');

const { expect } = chai;

describe('books constraints', () => {
  describe('createBooks', () => {
    it('blank parameters', () => {
      const expectedErrors = {
        title: ['can\'t be blank'],
        date: ['can\'t be blank'],
        description: ['can\'t be blank'],
        image: ['can\'t be blank'],
      };

      expect(validateExtension({}, books.createBooks)).to.be.deep.equal(expectedErrors);
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
        title: ['must be of type string', 'has an incorrect length'],
        date: ['must be of type string', 'must be a valid date'],
        description: ['must be of type string', 'has an incorrect length'],
        image: ['must be of type string', 'has an incorrect length'],
        authors: ['must be of type array'],
      };

      expect(validateExtension(values, books.createBooks)).to.be.deep.equal(expectedErrors);
    });

    it('incorrect length', () => {
      const values = {
        date: '2019-01-01', // correct value
        authors: [], // correct value
        title: randomstring.generate(256),
        description: randomstring.generate(65536),
        image: randomstring.generate(256),
      };

      const expectedErrors = {
        title: ['is too long (maximum is 255 characters)'],
        description: ['is too long (maximum is 65535 characters)'],
        image: ['is too long (maximum is 255 characters)'],
      };

      expect(validateExtension(values, books.createBooks)).to.be.deep.equal(expectedErrors);
    });

    it('incorrect date format', () => {
      const values = {
        title: randomstring.generate(), // correct value
        description: randomstring.generate(), // correct value
        image: randomstring.generate(), // correct value
        date: 'date must be in the \'YYYY-MM-DD\' format',
      };

      const expectedErrors = {
        date: ['must be a valid date'],
      };

      expect(validateExtension(values, books.createBooks)).to.be.deep.equal(expectedErrors);
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
        authors: ['must contain only uuid items'],
      };

      expect(validateExtension(values, books.createBooks)).to.be.deep.equal(expectedErrors);
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
        id: ['can\'t be blank'],
      };

      expect(validateExtension(values, books.updateBooks)).to.be.deep.equal(expectedErrors);
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
        id: ['must be of type string'],
      };

      expect(validateExtension(values, books.updateBooks)).to.be.deep.equal(expectedErrors);
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
        id: ['must have uuid format'],
      };

      expect(validateExtension(values, books.updateBooks)).to.be.deep.equal(expectedErrors);
    });
  });

  describe('getBooks', () => {
    it('incorrect types', () => {
      const values = {
        offset: 'should be number',
        limit: 'should be number',
        sort: { error: 'should be array' },
      };

      const expectedErrors = {
        limit: ['is not a number'],
        offset: ['is not a number'],
        sort: ['must be of type array', 'has an incorrect length'],
      };

      expect(validateExtension(values, books.getBooks)).to.be.deep.equal(expectedErrors);
    });

    it('incorrect length', () => {
      const values = {
        sort: [],
      };

      const expectedErrors = {
        sort: ['must have at least one element'],
      };

      expect(validateExtension(values, books.getBooks)).to.be.deep.equal(expectedErrors);
    });

    it('not integer offset/limit', () => {
      const values = {
        offset: 1.5,
        limit: 1.5,
      };

      const expectedErrors = {
        limit: ['must be an integer'],
        offset: ['must be an integer'],
      };

      expect(validateExtension(values, books.getBooks)).to.be.deep.equal(expectedErrors);
    });

    it('too small offset/limit', () => {
      const values = {
        offset: -1,
        limit: 0,
      };

      const expectedErrors = {
        limit: ['must be greater than 0'],
        offset: ['must be greater than or equal to 0'],
      };

      expect(validateExtension(values, books.getBooks)).to.be.deep.equal(expectedErrors);
    });

    it('too big limit', () => {
      const values = {
        limit: 101,
      };

      const expectedErrors = {
        limit: ['must be less than or equal to 100'],
      };

      expect(validateExtension(values, books.getBooks)).to.be.deep.equal(expectedErrors);
    });

    it('unknown item in sort array', () => {
      const values = {
        sort: ['unknown item'],
      };

      const expectedErrors = {
        sort: ['must contain only permitted items, such as: [title, date, description, image, authors, title ASC, date ASC, description ASC, image ASC, authors ASC, title DESC, date DESC, description DESC, image DESC, authors DESC]'],
      };

      expect(validateExtension(values, books.getBooks)).to.be.deep.equal(expectedErrors);
    });

    it('duplicate items in sort array', () => {
      const values = {
        sort: ['title', 'title'],
      };

      const expectedErrors = {
        sort: ['must not contain duplicates'],
      };

      expect(validateExtension(values, books.getBooks)).to.be.deep.equal(expectedErrors);
    });

    it('where is null', () => {
      const values = {
        where: null,
      };

      const expectedErrors = {
        where: ['where must be of type object'],
      };

      expect(validateExtension(values, books.getBooks)).to.be.deep.equal(expectedErrors);
    });

    it('empty where', () => {
      const values = {
        where: {},
      };

      const expectedErrors = {
        where: ['where object must have one key'],
      };

      expect(validateExtension(values, books.getBooks)).to.be.deep.equal(expectedErrors);
    });

    it('unknown key in where', () => {
      const values = {
        where: { unknownKey: 'error' },
      };

      const expectedErrors = {
        where: ['where contain unknown key \'unknownKey\' (known keys: [AND,OR,title,date,description,image,authors])'],
      };

      expect(validateExtension(values, books.getBooks)).to.be.deep.equal(expectedErrors);
    });

    it('logical operator key in where is not an array', () => {
      const values = {
        where: { AND: { error: 'should be array' } },
      };

      const expectedErrors = {
        where: ['where.AND must be of type array'],
      };

      expect(validateExtension(values, books.getBooks)).to.be.deep.equal(expectedErrors);
    });

    it('logical operator array contain less than 2 items', () => {
      const values = {
        where: { AND: [] },
      };

      const expectedErrors = {
        where: ['where.AND array must contain at least 2 items'],
      };

      expect(validateExtension(values, books.getBooks)).to.be.deep.equal(expectedErrors);
    });

    it('incorrect field in where', () => {
      const values = {
        where: {
          title: 'should be object',
        },
      };

      const expectedErrors = {
        where: [
          'where.title: [must be of type object]',
          'where.title.value: [can\'t be blank]',
          'where.title.operator: [can\'t be blank]',
        ],
      };

      expect(validateExtension(values, books.getBooks)).to.be.deep.equal(expectedErrors);
    });

    it('nested where validation', () => {
      const values = {
        where: {
          AND: [
            {
              OR: [
                {
                  title: {
                    value: randomstring.generate(), // correct value
                  },
                },
                {},
              ],
            },
            {
              OR: [],
            },
          ],
        },
      };

      const expectedErrors = {
        where: [
          'where.AND[0].OR[0].title.operator: [can\'t be blank]',
          'where.AND[0].OR[1] object must have one key',
          'where.AND[1].OR array must contain at least 2 items',
        ],
      };

      expect(validateExtension(values, books.getBooks)).to.be.deep.equal(expectedErrors);
    });

    it('correct where example', () => {
      // ((title >= 'book_5' AND title <= 'book_10') OR title > 'book_15') AND date > '2000-01-01'
      const values = {
        where: {
          AND: [
            {
              OR: [
                {
                  title: {
                    operator: '>',
                    value: 'book_15',
                  },
                },
                {
                  AND: [
                    {
                      title: {
                        operator: '>=',
                        value: 'book_5',
                      },
                    },
                    {
                      title: {
                        operator: '<=',
                        value: 'book_10',
                      },
                    },
                  ],
                },
              ],
            },
            {
              date: {
                operator: '>',
                value: '2000-01-01',
              },
            },
          ],
        },
      };

      const expectedErrors = undefined;

      expect(validateExtension(values, books.getBooks)).to.be.deep.equal(expectedErrors);
    });
  });
});
