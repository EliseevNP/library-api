define({ "api": [
  {
    "type": "post",
    "url": "/books",
    "title": "Создание книги",
    "name": "Create_book",
    "version": "0.0.1",
    "group": "Books",
    "description": "<p>Создание книги с заданными параметрами.</p>",
    "success": {
      "examples": [
        {
          "title": "200:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"911ff158-06ef-11ea-8d71-362b9e155667\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "400:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"Some author from 'authors' array not found\",\n  \"error\": \"Book title already in use\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "assets/apidoc/index.js",
    "groupTitle": "Books",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "size": "..255",
            "optional": false,
            "field": "title",
            "description": "<p>Название книги</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "date",
            "description": "<p>Дата публикации книги (допустимый формат даты: 'YYYY-MM-DD')</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "size": "..65535",
            "optional": false,
            "field": "description",
            "description": "<p>Описание книги</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "size": "..255",
            "optional": false,
            "field": "image",
            "description": "<p>Обложка книги (URL)</p>"
          },
          {
            "group": "Parameter",
            "type": "string[]",
            "optional": true,
            "field": "authors",
            "description": "<p>Идентификаторы авторов (допустимый формат идентификатора: uuid)</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/books",
    "title": "Получение информации о книгах",
    "name": "Get_books",
    "version": "0.0.1",
    "group": "Books",
    "description": "<p>Получение массива, содержащего информацио о книгах.</p>",
    "examples": [
      {
        "title": "Пример запроса с помощью axios:",
        "content": "const axios = require('axios');\nconst qs = require('qs'); // Use 'qs' npm-package to stringify object with query parameters\n\nconst { data } = await axios.get(`http://localhost:3000/books?${qs.stringify({\n  offset: 0,\n  limit: 10,\n  order: ['title DESC'],\n  where: { // WHERE title = 'book_3' OR description = 'book_description_2'\n    OR: [\n      {\n        title: {\n          operator: '=',\n          value: 'book_3',\n        },\n      },\n      {\n        description: {\n          operator: '=',\n          value: 'book_description_2',\n        },\n      },\n    ],\n  }\n})}`);\n\nconsole.log(data); // will be printed an array of objects, where each object represents a book",
        "type": "js"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "200:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": \"911ff158-06ef-11ea-8d71-362b9e155667\",\n    \"title\": \"book_1\",\n    \"date\": \"2019-01-01\",\n    \"description\": \"book_description_1\",\n    \"image\": \"https://images.wallpaperscraft.com/image/port_ships_masts_150807_3840x2160.jpg\",\n    \"authors\": [\n      {\n        \"id\": \"6c1df8d8-06f1-11ea-a806-f9d58772514a\",\n        \"name\": \"author_name_1\",\n        \"patronymic\": \"author_patronymic_1\",\n        \"second_name\": \"author_second_name_1\"\n      }\n    ]\n  }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "assets/apidoc/index.js",
    "groupTitle": "Books",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "size": "0..",
            "optional": true,
            "field": "offset",
            "defaultValue": "0",
            "description": "<p>Число, указывающее позицию, начиная с которой будет осуществляться выборка из базы данных</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "size": "0..100",
            "optional": true,
            "field": "limit",
            "defaultValue": "20",
            "description": "<p>Максимальное количество книг, которые будут возвращены после обработки запроса</p>"
          },
          {
            "group": "Parameter",
            "type": "string[]",
            "allowedValues": [
              "'title'",
              "'date'",
              "'description'",
              "'image'",
              "'authors'",
              "'title ASC'",
              "'date ASC'",
              "'description ASC'",
              "'image ASC'",
              "'authors ASC'",
              "'title DESC'",
              "'date DESC'",
              "'description DESC'",
              "'image DESC'"
            ],
            "optional": true,
            "field": "sort",
            "description": "<p>Поля, по которым необходимо отсортировать книги</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": true,
            "field": "where",
            "description": "<p>Условия фильтрации книг (подробнее о параметре смотри в примере запроса)</p>"
          }
        ]
      }
    }
  },
  {
    "type": "patch",
    "url": "/books/:id",
    "title": "Обновление книги",
    "name": "Update_book",
    "version": "0.0.1",
    "group": "Books",
    "description": "<p>Обновление параметров книги в соответствии с параметрами, указанными в запросе. Будет обновлена книга с идентификатором, указанным в параметре 'id'.</p>",
    "success": {
      "examples": [
        {
          "title": "200:",
          "content": "HTTP/1.1 200 OK\n{\n  \"ok\": true\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "400:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"error\": \"Book not found\",\n  \"error\": \"Book title already in use\",\n  \"error\": \"Some author from 'authors' array not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "assets/apidoc/index.js",
    "groupTitle": "Books",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>Идентификатор книги (допустимый формат идентификатора: uuid)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "size": "..255",
            "optional": false,
            "field": "title",
            "description": "<p>Название книги</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "date",
            "description": "<p>Дата публикации книги (допустимый формат даты: 'YYYY-MM-DD')</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "size": "..65535",
            "optional": false,
            "field": "description",
            "description": "<p>Описание книги</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "size": "..255",
            "optional": false,
            "field": "image",
            "description": "<p>Обложка книги (URL)</p>"
          },
          {
            "group": "Parameter",
            "type": "string[]",
            "optional": true,
            "field": "authors",
            "description": "<p>Идентификаторы авторов (допустимый формат идентификатора: uuid)</p>"
          }
        ]
      }
    }
  }
] });
