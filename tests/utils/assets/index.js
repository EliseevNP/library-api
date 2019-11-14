const uuidv1 = require('uuid/v1');

const BOOKS = [
  {
    id: uuidv1(),
    title: 'book_1',
    date: '2019-01-01',
    description: 'book_description_1',
    image: 'https://images.wallpaperscraft.com/image/port_ships_masts_150807_3840x2160.jpg',
  },
  {
    id: uuidv1(),
    title: 'book_2',
    date: '2019-01-01',
    description: 'book_description_2',
    image: 'https://images.wallpaperscraft.com/image/port_ships_masts_150807_3840x2160.jpg',
  },
  {
    id: uuidv1(),
    title: 'book_3',
    date: '2019-01-01',
    description: 'book_description_3',
    image: 'https://images.wallpaperscraft.com/image/port_ships_masts_150807_3840x2160.jpg',
  },
  {
    id: uuidv1(),
    title: 'book_4',
    date: '2019-01-01',
    description: 'book_description_4',
    image: 'https://images.wallpaperscraft.com/image/port_ships_masts_150807_3840x2160.jpg',
  },
  {
    id: uuidv1(),
    title: 'book_5',
    date: '2019-01-01',
    description: 'book_description_5',
    image: 'https://images.wallpaperscraft.com/image/port_ships_masts_150807_3840x2160.jpg',
  },
];

const AUTHORS = [
  {
    id: uuidv1(),
    name: 'author_name_1',
    second_name: 'author_second_name_1',
    patronymic: 'author_patronymic_1',
  },
  {
    id: uuidv1(),
    name: 'author_name_2',
    second_name: 'author_second_name_2',
    patronymic: 'author_patronymic_2',
  },
  {
    id: uuidv1(),
    name: 'author_name_3',
    second_name: 'author_second_name_3',
    patronymic: 'author_patronymic_3',
  },
  {
    id: uuidv1(),
    name: 'author_name_4',
    second_name: 'author_second_name_4',
    patronymic: 'author_patronymic_4',
  },
  {
    id: uuidv1(),
    name: 'author_name_5',
    second_name: 'author_second_name_5',
    patronymic: 'author_patronymic_5',
  },
];

const BOOKS_AUTHORS = [
  {
    book_id: BOOKS[0].id,
    author_id: AUTHORS[0].id,
  },
  {
    book_id: BOOKS[0].id,
    author_id: AUTHORS[1].id,
  },
  {
    book_id: BOOKS[1].id,
    author_id: AUTHORS[1].id,
  },
  {
    book_id: BOOKS[1].id,
    author_id: AUTHORS[2].id,
  },
  {
    book_id: BOOKS[2].id,
    author_id: AUTHORS[3].id,
  },
  {
    book_id: BOOKS[3].id,
    author_id: AUTHORS[4].id,
  },
];

module.exports = {
  BOOKS,
  AUTHORS,
  BOOKS_AUTHORS,
};
