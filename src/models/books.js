const uuidv1 = require('uuid/v1');
const { AuthorNotFoundError, BookNotFoundError, BookTitleAlreadyInUse } = require('../errors');
const { transaction } = require('../helpers');

module.exports.create = async ({ title, date, description, image, authors }) => {
  return transaction(async connection => {
    const bookId = uuidv1();

    await connection.queryAsync(`
      INSERT INTO books(id, title, date, description, image)
      VALUES (UUID_TO_BIN('${bookId}'), '${title}', '${date}', '${description}', '${image}');
    `);

    if (authors) {
      const booksAuthors = authors
        .map(authorId => { return `(UUID_TO_BIN('${bookId}'), UUID_TO_BIN('${authorId}'))`; })
        .join(',');

      try {
        await connection.queryAsync(`
          INSERT INTO books_authors(book_id, author_id)
          values ${booksAuthors};
        `);
      } catch (err) {
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
          throw new AuthorNotFoundError('Some author from \'authors\' array not found');
        }

        throw err;
      }
    }

    return { id: bookId };
  });
};

module.exports.update = async ({ id: bookId, title, date, description, image, authors }) => {
  return transaction(async connection => {
    try {
      const { changedRows } = (await connection.queryAsync(`
        UPDATE books 
        SET 
          title = '${title}',
          date = '${date}',
          description = '${description}',
          image = '${image}'
        WHERE
          id = UUID_TO_BIN('${bookId}');
      `));

      if (!changedRows) {
        throw new BookNotFoundError();
      }
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new BookTitleAlreadyInUse();
      }

      throw err;
    }

    if (authors) {
      await connection.queryAsync(`DELETE FROM books_authors WHERE book_id=UUID_TO_BIN('${bookId}');`);

      const booksAuthors = authors
        .map(authorId => { return `(UUID_TO_BIN('${bookId}'), UUID_TO_BIN('${authorId}'))`; })
        .join(',');

      try {
        await connection.queryAsync(`
          INSERT INTO books_authors(book_id, author_id)
          VALUES ${booksAuthors};
        `);
      } catch (err) {
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
          throw new AuthorNotFoundError('Some author from \'authors\' array not found');
        }

        throw err;
      }
    }

    return { id: bookId, title, date, description, image, authors };
  });
};

module.exports.get = async ({ offset, limit, sort, filter }) => {
  return { result: 'get book stub', params: { offset, limit, sort, filter } };
};
