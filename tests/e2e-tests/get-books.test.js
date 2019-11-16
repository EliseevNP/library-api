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
        limit: 5,
        sort: ['title DESC'],
        // WHERE
        //   title = 'book_2' OR
        //   description = 'book_description_3' OR
        //   (name >= 'author_name_4' AND name <= 'author_name_5');
        where: JSON.stringify({
          OR: [
            {
              title: {
                operator: '=',
                value: 'book_2',
              },
            },
            {
              description: {
                operator: '=',
                value: 'book_description_3',
              },
            },
            {
              AND: [
                {
                  name: {
                    operator: '>=',
                    value: 'author_name_4',
                  },
                },
                {
                  name: {
                    operator: '<=',
                    value: 'author_name_5',
                  },
                },
              ],
            },
          ],
        }),
      });

    const expectedBooks = [
      {
        ...BOOKS[3],
        authors: [
          {
            ...AUTHORS[4],
          },
        ],
      },
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
