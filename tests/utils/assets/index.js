const uuidv1 = require('uuid/v1');

module.exports.BOOKS = [
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
    image: 'https://images.wallpaperscraft.com/image/night_city_buildings_bridge_150805_3840x2160.jpg',
  },
  {
    id: uuidv1(),
    title: 'book_3',
    date: '2019-01-01',
    description: 'book_description_3',
    image: 'https://images.wallpaperscraft.com/image/gorilla_black_primate_150803_3840x2160.jpg',
  },
];

module.exports.AUTHORS = [
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
];
