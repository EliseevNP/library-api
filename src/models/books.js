const uuidv1 = require('uuid/v1');
const pool = require('../db');
const { AuthorNotFoundError, BookNotFoundError, BookTitleAlreadyInUse } = require('../errors');
const { transaction, buildWhereSQL } = require('../helpers');

module.exports.create = async ({ title, date, description, image, authors }) => {
  return transaction(pool, async connection => {
    const bookId = uuidv1();

    try {
      await connection.queryAsync(`
        INSERT INTO books(id, title, date, description, image)
        VALUES (UUID_TO_BIN('${bookId}'), '${title}', '${date}', '${description}', '${image}');
      `);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new BookTitleAlreadyInUse();
      }

      throw err;
    }

    if (authors && authors.length) {
      const booksAuthors = authors
        .map(authorId => { return `(UUID_TO_BIN('${bookId}'), UUID_TO_BIN('${authorId}'))`; })
        .join(',');

      try {
        await connection.queryAsync(`
          INSERT INTO books_authors(book_id, author_id)
          values ${booksAuthors};
        `);
      } catch (err) {
        if (['ER_NO_REFERENCED_ROW', 'ER_NO_REFERENCED_ROW_2'].includes(err.code)) {
          throw new AuthorNotFoundError('Some author from \'authors\' array not found');
        }

        throw err;
      }
    }

    return { id: bookId };
  });
};

module.exports.update = async ({ id: bookId, title, date, description, image, authors }) => {
  return transaction(pool, async connection => {
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
      await connection.queryAsync(`
        DELETE FROM books_authors WHERE book_id=UUID_TO_BIN('${bookId}');
      `);

      if (authors.length) {
        const booksAuthors = authors
          .map(authorId => { return `(UUID_TO_BIN('${bookId}'), UUID_TO_BIN('${authorId}'))`; })
          .join(',');

        try {
          await connection.queryAsync(`
            INSERT INTO books_authors(book_id, author_id)
            VALUES ${booksAuthors};
          `);
        } catch (err) {
          if (['ER_NO_REFERENCED_ROW', 'ER_NO_REFERENCED_ROW_2'].includes(err.code)) {
            throw new AuthorNotFoundError('Some author from \'authors\' array not found');
          }

          throw err;
        }
      }
    }

    return { ok: true };
  });
};

module.exports.get = async ({ offset, limit, sort, where }) => {
  let selectQuery = `
    SELECT
      BIN_TO_UUID(books.id) id,
      books.title,
      DATE_FORMAT(books.date, '%Y-%m-%d') date,
      books.description,
      books.image,
      GROUP_CONCAT (
        JSON_OBJECT (
          'id', BIN_TO_UUID(authors.id),
          'name', authors.name,
          'second_name', authors.second_name,
          'patronymic', authors.patronymic
        )
      ) AS authors
    FROM
      books
    JOIN
      (
        SELECT id FROM books
        ORDER BY id
        LIMIT ${offset}, ${limit}
      ) AS book_page
    ON
      book_page.id = books.id
    LEFT JOIN
      authors
    ON
      authors.id IN (
        SELECT
          author_id
        FROM
          books_authors
        WHERE
          book_id = books.id
      )
  `;

  if (where) {
    selectQuery += `${buildWhereSQL('books', where)}\n`;
  }

  selectQuery += 'GROUP BY books.id\n';

  if (sort) {
    selectQuery += `ORDER BY ${sort.join(', ')}`;
  }

  const result = await pool.queryAsync(selectQuery).map(book => {
    const authors = JSON.parse(`[${book.authors}]`);

    return {
      ...book,
      authors: authors[0].id === null ? [] : authors,
    };
  });

  return result;
};
