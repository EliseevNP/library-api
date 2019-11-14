const pool = require('../../../src/db');

module.exports.cleanup = async () => {
  await pool.queryAsync(`
    SET FOREIGN_KEY_CHECKS = 0;
    TRUNCATE TABLE books;
    TRUNCATE TABLE authors;
    TRUNCATE TABLE books_authors;
    SET FOREIGN_KEY_CHECKS = 1;
  `);
};

module.exports.insertAuthors = async authors => {
  const values = authors
    .map(author => { return `(UUID_TO_BIN('${author.id}'), '${author.name}', '${author.second_name}', '${author.patronymic}')`; })
    .join(',');

  await pool.queryAsync(`
    INSERT INTO authors(id, name, second_name, patronymic)
    VALUES ${values};
  `);
};

module.exports.insertBooks = async books => {
  const values = books
    .map(book => { return `(UUID_TO_BIN('${book.id}'), '${book.title}', '${book.date}', '${book.description}', '${book.image}')`; })
    .join(',');

  await pool.queryAsync(`
    INSERT INTO books(id, title, date, description, image)
    VALUES ${values};
  `);
};

module.exports.insertBooksAuthors = async booksAuthors => {
  const values = booksAuthors
    .map(bookAuthor => { return `(UUID_TO_BIN('${bookAuthor.book_id}'), UUID_TO_BIN('${bookAuthor.author_id}'))`; })
    .join(',');

  await pool.queryAsync(`
    INSERT INTO books_authors(book_id, author_id)
    VALUES ${values};
  `);
};

module.exports.getBooksWithAuthors = async () => {
  let books = await pool.queryAsync(`
      SELECT
        BIN_TO_UUID(id) id,
        title,
        DATE_FORMAT(date, '%Y-%m-%d') date,
        description,
        image,
        (SELECT
          GROUP_CONCAT(BIN_TO_UUID(author_id))
          FROM
            books_authors
          WHERE
            book_id = books.id
        ) AS authors
      FROM
        books
    `);

  books = books.map(book => {
    return {
      ...book,
      authors: book.authors !== null
        ? book.authors.split(',')
        : null,
    };
  });

  return books;
};
