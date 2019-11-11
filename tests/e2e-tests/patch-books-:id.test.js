const chai = require('chai');
const chaiHttp = require('chai-http');
const uuidv1 = require('uuid/v1');
const app = require('../../src');
const { cleanup, insertAuthors, insertBooks, getBooksWithAuthors } = require('../utils/helpers');
const { BOOKS, AUTHORS } = require('../utils/assets');

chai.use(chaiHttp);

const { expect, request } = chai;

describe('PATCH /books/:id', () => {
  beforeEach(cleanup);
  after(cleanup);

  it('should not update book (unknown book id)', async () => {
    await insertBooks(BOOKS);

    const { status, body } = await request(app)
      .patch(`/books/${uuidv1()}`)
      .send(BOOKS[0]);

    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({ error: 'Book not found' });
  });

  it('should not update book (book title already in use)', async () => {
    await insertBooks(BOOKS);

    const { status, body } = await request(app)
      .patch(`/books/${BOOKS[0].id}`)
      .send(BOOKS[1]);

    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({ error: 'Book title already in use' });
  });

  it('should not update book (unknown author id)', async () => {
    await insertBooks(BOOKS);

    const { status, body } = await request(app)
      .patch(`/books/${BOOKS[0].id}`)
      .send({
        authors: [uuidv1()],
        ...BOOKS[1],
        title: 'new awesome title',
      });

    expect(status).to.be.equal(400);
    expect(body).to.be.deep.equal({ error: 'Some author from \'authors\' array not found' });
  });

  it('should update book', async () => {
    await insertBooks(BOOKS);
    await insertAuthors(AUTHORS);

    const { status, body } = await request(app)
      .patch(`/books/${BOOKS[0].id}`)
      .send({
        authors: [
          AUTHORS[0].id,
          AUTHORS[1].id,
        ],
        ...BOOKS[1],
        title: 'new awesome title',
      });

    const updatedBook = (await getBooksWithAuthors()).filter(book => {
      return book.id === BOOKS[0].id;
    })[0];

    expect(status).to.be.equal(200);
    expect(updatedBook.id).to.be.equal(BOOKS[0].id);
    expect(updatedBook).to.be.deep.equal({
      ...BOOKS[1],
      title: 'new awesome title',
      authors: [
        AUTHORS[0].id,
        AUTHORS[1].id,
      ],
      id: BOOKS[0].id,
    });
    expect(body).to.be.deep.equal(updatedBook);
  });
});
