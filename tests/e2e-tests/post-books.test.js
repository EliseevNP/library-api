const chai = require('chai');
const chaiHttp = require('chai-http');
const isUUID = require('is-uuid');
const uuidv1 = require('uuid/v1');
const app = require('../../src');
const pool = require('../../src/db');
const { cleanup, insertAuthors, getBooksWithAuthors } = require('../utils/helpers');
const { BOOKS, AUTHORS } = require('../utils/assets');

chai.use(chaiHttp);

const { expect, request } = chai;

describe('POST /books', () => {
  beforeEach(cleanup);
  after(cleanup);

  it('should not create book (unknown author id)', async () => {
    const { status, body } = await request(app)
      .post('/books')
      .send({ authors: [uuidv1()], ...BOOKS[0] });

    const { booksCount } = (await pool.queryAsync('SELECT COUNT(*) AS booksCount FROM books;'))[0];

    expect(status).to.be.equal(400);
    expect(booksCount).to.be.equal(0);
    expect(body).to.be.deep.equal({ error: 'Some author from \'authors\' array not found' });
  });

  it('should create book', async () => {
    await insertAuthors(AUTHORS);

    const { status, body } = await request(app)
      .post('/books')
      .send({ authors: [AUTHORS[0].id], ...BOOKS[0] });

    const books = (await getBooksWithAuthors());

    expect(status).to.be.equal(200);
    expect(isUUID.v1(body.id)).to.be.true;
    expect(books[0]).to.be.deep.equal({
      authors: [AUTHORS[0].id],
      ...BOOKS[0],
      id: body.id,
    });
  });
});
