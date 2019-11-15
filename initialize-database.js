/* eslint-disable no-console */
/* eslint-disable no-await-in-loop  */

const Promise = require('bluebird');
const moment = require('moment');
const uuidv1 = require('uuid/v1');
const shuffle = require('shuffle-array');
const pool = require('./src/db');

const BOOKS_COUNT = process.env.BOOKS_COUNT || 100000;
const AUTHORS_COUNT = process.env.AUTHORS_COUNT || 500;
const MAX_COAUTHORS_COUNT = 3;
const INSERTION_STEP = 50000;

const random = (min = 0, max = 100) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

async function main() {
  try {
    const connection = Promise.promisifyAll(await pool.getConnectionAsync());

    console.log('[INIT_DATABASE] Reinitialize tables structure');

    await connection.queryAsync(`
      SET FOREIGN_KEY_CHECKS = 0;
      DROP TABLE IF EXISTS books;
      DROP TABLE IF EXISTS authors;
      DROP TABLE IF EXISTS books_authors;
      SET FOREIGN_KEY_CHECKS = 1;

      CREATE TABLE books (
        id BINARY(16) PRIMARY KEY,
        title VARCHAR(255) NOT NULL UNIQUE,
        date DATE NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(255) NOT NULL
      );

      CREATE TABLE authors (
        id BINARY(16) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        second_name VARCHAR(255) NOT NULL,
        patronymic VARCHAR(255) NOT NULL
      );

      CREATE TABLE books_authors (
        book_id BINARY(16),
        author_id BINARY(16),
        FOREIGN KEY (book_id) REFERENCES books (id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (author_id) REFERENCES authors (id) ON DELETE CASCADE ON UPDATE CASCADE,
        PRIMARY KEY (book_id, author_id)
      );
    `);

    if (process.argv.includes('--fill')) {
      console.log('[INIT_DATABASE] Fill database (it will take some time)');

      const images = [
        'https://images.wallpaperscraft.com/image/port_ships_masts_150807_3840x2160.jpg',
        'https://images.wallpaperscraft.com/image/night_city_buildings_bridge_150805_3840x2160.jpg',
        'https://images.wallpaperscraft.com/image/gorilla_black_primate_150803_3840x2160.jpg',
        'https://images.wallpaperscraft.com/image/fox_tongue_protruding_water_150800_3840x2160.jpg',
        'https://images.wallpaperscraft.com/image/night_city_dark_buildings_150799_3840x2160.jpg',
        'https://images.wallpaperscraft.com/image/bubbles_macro_texture_150796_3840x2160.jpg',
        'https://images.wallpaperscraft.com/image/man_mask_face_150795_3840x2160.jpg',
        'https://images.wallpaperscraft.com/image/hand_petals_red_150793_3840x2160.jpg',
        'https://images.wallpaperscraft.com/image/grass_spikelets_stems_150787_3840x2160.jpg',
        'https://images.wallpaperscraft.com/image/mountains_dark_night_150783_3840x2160.jpg',
      ];

      const books = [];
      const authors = [];
      const booksAuthors = [];
      const booksIds = [];
      const authorsIds = [];

      // Prepare books
      for (let i = 0; i < BOOKS_COUNT; i++) {
        const id = uuidv1();
        const date = moment(new Date(random(1000, 2019), random(0, 11), random(1, 31))).format('YYYY-MM-DD');

        booksIds.push(id);
        books.push(`(UUID_TO_BIN('${id}'), 'book_${i}', '${date}', 'book_description_${i}', '${images[random(0, 9)]}')`);
      }

      // Prepare authors
      for (let i = 0; i < AUTHORS_COUNT; i++) {
        const id = uuidv1();

        authorsIds.push(id);
        authors.push(`(UUID_TO_BIN('${id}'), 'author_name_${i}', 'author_second_name_${i}', 'author_patronymic_${i}')`);
      }

      // Prepare booksAuthors
      for (let i = 0; i < BOOKS_COUNT; i++) {
        const authorIdIndex = random(0, AUTHORS_COUNT - 1);

        booksAuthors.push(`(UUID_TO_BIN('${booksIds[i]}'), UUID_TO_BIN('${authorsIds[authorIdIndex]}'))`);

        // Each book can be written by the author together with the co-authors
        const coAuthorsCount = random(0, MAX_COAUTHORS_COUNT);

        const coAuthorsIdsIndexes = [];

        for (let j = 0; j < coAuthorsCount; j++) {
          let coAuthorIdIndex;

          // Avoid 'author === coAuthor' and 'duplicate primary key' situations
          do {
            coAuthorIdIndex = random(0, AUTHORS_COUNT - 1);
          } while (
            coAuthorIdIndex === authorIdIndex ||
            coAuthorsIdsIndexes.includes(coAuthorIdIndex)
          );

          coAuthorsIdsIndexes.push(coAuthorIdIndex);
        }

        // eslint-disable-next-line no-loop-func
        coAuthorsIdsIndexes.forEach(coAuthorIdIndex => {
          booksAuthors.push(`(UUID_TO_BIN('${booksIds[i]}'), UUID_TO_BIN('${authorsIds[coAuthorIdIndex]}'))`);
        });
      }

      // Mix data
      shuffle(booksAuthors);

      // Insert values
      console.log(`[INIT_DATABASE]   books inserting (${books.length} records) ...`);

      let totalBooks = 0;

      for (let offset = 0; offset < books.length; offset += INSERTION_STEP) {
        const values = books.slice(offset, offset + INSERTION_STEP);

        await connection.queryAsync(`
          INSERT INTO books(id, title, date, description, image)
          VALUES ${values.join(',')};
        `);

        totalBooks += values.length;
        console.log(`[INIT_DATABASE]     ${totalBooks} records was added`);
      }

      console.log(`[INIT_DATABASE]   authors inserting (${authors.length} records) ...`);

      let totalAuthors = 0;

      for (let offset = 0; offset < authors.length; offset += INSERTION_STEP) {
        const values = authors.slice(offset, offset + INSERTION_STEP);

        await connection.queryAsync(`
          INSERT INTO authors(id, name, second_name, patronymic)
          VALUES ${values.join(',')};
        `);

        totalAuthors += values.length;
        console.log(`[INIT_DATABASE]     ${totalAuthors} records was added`);
      }

      console.log(`[INIT_DATABASE]   books_authors inserting (${booksAuthors.length} records) ...`);

      let totalBooksAuthors = 0;

      for (let offset = 0; offset < booksAuthors.length; offset += INSERTION_STEP) {
        const values = booksAuthors.slice(offset, offset + INSERTION_STEP);

        await connection.queryAsync(`
          INSERT INTO books_authors(book_id, author_id)
          values ${values.join(',')};
        `);

        totalBooksAuthors += values.length;
        console.log(`[INIT_DATABASE]     ${totalBooksAuthors} records was added`);
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

main();
