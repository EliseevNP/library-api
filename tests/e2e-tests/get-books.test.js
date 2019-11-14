const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src');
const { BOOKS, AUTHORS, BOOKS_AUTHORS } = require('../utils/assets');
const {
  cleanup,
  insertAuthors,
  insertBooks,
  insertBooksAuthors,
} = require('../utils/helpers');

chai.use(chaiHttp);

const { expect, request } = chai;

describe('GET /books', () => {
  before(async () => {
    await cleanup();
    await insertAuthors(AUTHORS);
    await insertBooks(BOOKS);
    await insertBooksAuthors(BOOKS_AUTHORS);
  });

  after(cleanup);

  it('should get books', async () => {
    const { status, body } = await request(app)
      .get('/books')
      .query({
        offset: 0,
        limit: 3,
        sort: ['title DESC'],
        where: {
          OR: [
            {
              title: {
                operator: '>=',
                value: 'book_3',
              },
            },
            {
              description: {
                operator: '<=',
                value: 'book_description_2',
              },
            },
          ],
        },
      });

    const expectedBooks = [
      {
        ...BOOKS[2],
        authors: [
          {
            ...AUTHORS[3],
          },
        ],
      },
      {
        ...BOOKS[1],
        authors: [
          {
            ...AUTHORS[1],
          },
          {
            ...AUTHORS[2],
          },
        ],
      },
      {
        ...BOOKS[0],
        authors: [
          {
            ...AUTHORS[0],
          },
          {
            ...AUTHORS[1],
          },
        ],
      },
    ];

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(expectedBooks);
  });
});
