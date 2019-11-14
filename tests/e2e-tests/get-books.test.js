const chai = require('chai');
const chaiHttp = require('chai-http');
const qs = require('qs');
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
      .get(`/books? + ${qs.stringify({
        offset: 0,
        limit: 3,
        sort: ['title DESC'],
        where: { // WHERE title = 'book_3' OR description = 'book_description_2'
          OR: [
            {
              title: {
                operator: '=',
                value: 'book_3',
              },
            },
            {
              description: {
                operator: '=',
                value: 'book_description_2',
              },
            },
          ],
        },
      })}`);

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
    ];

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(expectedBooks);
  });
});
