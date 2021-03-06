/**
 * @api {post} /books Создание книги
 * @apiName Create book
 * @apiVersion 0.0.1
 * @apiGroup Books
 * @apiDescription Создание книги с заданными параметрами.
 *
 * @apiUse BookTitleParam
 * @apiUse BookDateParam
 * @apiUse BookDescriptionParam
 * @apiUse BookImageParam
 * @apiUse BookAuthorsParam
 *
 * @apiSuccessExample {json} 200:
 *   HTTP/1.1 200 OK
 *   {
 *     "id": "911ff158-06ef-11ea-8d71-362b9e155667"
 *   }
 *
 * @apiErrorExample {json} 400:
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "error": "Some author from 'authors' array not found",
 *     "error": "Book title already in use"
 *   }
 */

 /**
 * @api {patch} /books/:id Обновление книги
 * @apiName Update book
 * @apiVersion 0.0.1
 * @apiGroup Books
 * @apiDescription Обновление параметров книги в соответствии с параметрами, указанными в запросе. Будет обновлена книга с идентификатором, указанным в параметре 'id'.
 *
 * @apiUse BookIdParam
 * @apiUse BookTitleParam
 * @apiUse BookDateParam
 * @apiUse BookDescriptionParam
 * @apiUse BookImageParam
 * @apiUse BookAuthorsParam
 *
 * @apiSuccessExample {json} 200:
 *   HTTP/1.1 200 OK
 *   {
 *     "ok": true
 *   }
 *
 * @apiErrorExample {json} 400:
 *   HTTP/1.1 400 Bad Request
 *   {
 *     "error": "Book not found",
 *     "error": "Book title already in use",
 *     "error": "Some author from 'authors' array not found"
 *   }
 */

 /**
 * @api {get} /books Получение информации о книгах
 * @apiName Get books
 * @apiVersion 0.0.1
 * @apiGroup Books
 * @apiDescription Получение массива, содержащего информацио о книгах.
 *
 * @apiUse BookOffsetParam
 * @apiUse BookLimitParam
 * @apiUse BookSortParam
 * @apiUse BookWhereParam
 * @apiUse BookWhereOrParam
 * @apiUse BookWhereAndParam
 * @apiUse BookWhereTitleParam
 * @apiUse BookWhereTitleOperatorParam
 * @apiUse BookWhereTitleValueParam
 * @apiUse BookWhereDateParam
 * @apiUse BookWhereDateOperatorParam
 * @apiUse BookWhereDateValueParam
 * @apiUse BookWhereDescriptionParam
 * @apiUse BookWhereDescriptionOperatorParam
 * @apiUse BookWhereDescriptionValueParam
 * @apiUse BookWhereImageParam
 * @apiUse BookWhereImageOperatorParam
 * @apiUse BookWhereImageValueParam
 * @apiUse BookWhereNameParam
 * @apiUse BookWhereNameOperatorParam
 * @apiUse BookWhereNameValueParam
 * @apiUse BookWhereSecondNameParam
 * @apiUse BookWhereSecondNameOperatorParam
 * @apiUse BookWhereSecondNameValueParam
 * @apiUse BookWherePatronymicParam
 * @apiUse BookWherePatronymicOperatorParam
 * @apiUse BookWherePatronymicValueParam
 *
 * @apiExample {js} Пример запроса с помощью axios:
 * const axios = require('axios');
 * 
 * const { data } = await axios.get('http://localhost:3000/books', {
 *   params: {
 *     offset: 0,
 *     limit: 10,
 *     order: ['title DESC'],
 *     // WHERE
 *     //   title = 'book_2' OR
 *     //   description = 'book_description_3' OR
 *     //   (name >= 'author_name_4' AND name <= 'author_name_5');
 *     where: JSON.stringify({
 *       OR: [
 *         {
 *           title: {
 *             operator: '=',
 *             value: 'book_2',
 *           },
 *         },
 *         {
 *           description: {
 *             operator: '=',
 *             value: 'book_description_3',
 *           },
 *         },
 *         {
 *           AND: [
 *             {
 *               name: {
 *                 operator: '>=',
 *                 value: 'author_name_4',
 *               },
 *             },
 *             {
 *               name: {
 *                 operator: '<=',
 *                 value: 'author_name_5',
 *               },
 *             },
 *           ],
 *         },
 *       ],
 *     }),
 *   },
 * });
 *
 * console.log(data); // will be printed an array of objects, where each object represents a book
 *
 * @apiSuccessExample {json} 200:
 *   HTTP/1.1 200 OK
 *   [
 *     {
 *       "id": "911ff158-06ef-11ea-8d71-362b9e155667",
 *       "title": "book_1",
 *       "date": "2019-01-01",
 *       "description": "book_description_1",
 *       "image": "https://images.wallpaperscraft.com/image/port_ships_masts_150807_3840x2160.jpg",
 *       "authors": [
 *         {
 *           "id": "6c1df8d8-06f1-11ea-a806-f9d58772514a",
 *           "name": "author_name_1",
 *           "patronymic": "author_patronymic_1",
 *           "second_name": "author_second_name_1"
 *         }
 *       ]
 *     }
 *   ]
 */
