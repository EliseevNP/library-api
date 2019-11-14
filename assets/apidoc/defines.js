/**
* @apiDefine BookIdParam
* @apiParam {string} id Идентификатор книги (допустимый формат идентификатора: uuid)
*/

/**
* @apiDefine BookTitleParam
* @apiParam {string{..255}} title Название книги
*/

/**
* @apiDefine BookDateParam
* @apiParam {string} date Дата публикации книги (допустимый формат даты: 'YYYY-MM-DD')
*/

/**
* @apiDefine BookDescriptionParam
* @apiParam {string{..65535}} description Описание книги
*/

/**
* @apiDefine BookImageParam
* @apiParam {string{..255}} image Обложка книги (URL)
*/

/**
* @apiDefine OptionalBookAuthorsParam
* @apiParam {string[]} [authors] Идентификаторы авторов (допустимый формат идентификатора: uuid)
*/

/**
* @apiDefine BookOffsetParam
* @apiParam {Number{0..}} [offset=0] Число, указывающее позицию, начиная с которой будет осуществляться выборка из базы данных
*/

/**
* @apiDefine BookLimitParam
* @apiParam {Number{0..100}} [limit=20] Максимальное количество книг, которые будут возвращены после обработки запроса
*/

/**
* @apiDefine BookSortParam
* @apiParam {string[]='title','date','description','image','authors','title ASC','date ASC','description ASC','image ASC','authors ASC','title DESC','date DESC','description DESC','image DESC','authors DESC} [sort] Поля, по которым необходимо отсортировать книги
*/

/**
* @apiDefine BookWhereParam
* @apiParam {object} [where] Условия фильтрации книг (подробнее о параметре смотри в примере запроса)
*/
