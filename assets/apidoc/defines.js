/**
* @apiDefine BookIdParam
* @apiParam (Параметры (источник: url)) {string} id Идентификатор книги (допустимый формат идентификатора: uuid)
*/

/**
* @apiDefine BookTitleParam
* @apiParam (Параметры (источник: body)) {string{..255}} title Название книги
*/

/**
* @apiDefine BookDateParam
* @apiParam (Параметры (источник: body)) {string} date Дата публикации книги (допустимый формат даты: 'YYYY-MM-DD')
*/

/**
* @apiDefine BookDescriptionParam
* @apiParam (Параметры (источник: body)) {string{..65535}} description Описание книги
*/

/**
* @apiDefine BookImageParam
* @apiParam (Параметры (источник: body)) {string{..255}} image Обложка книги (URL)
*/

/**
* @apiDefine BookAuthorsParam
* @apiParam (Параметры (источник: body)) {string[]} [authors] Идентификаторы авторов (допустимый формат идентификатора: uuid)
*/

/**
* @apiDefine BookOffsetParam
* @apiParam (Параметры (источник: querystring)) {Number{0..}} [offset=0] Число, указывающее позицию, начиная с которой будет осуществляться выборка из базы данных
*/

/**
* @apiDefine BookLimitParam
* @apiParam (Параметры (источник: querystring)) {Number{0..100}} [limit=20] Максимальное количество книг, которые будут возвращены после обработки запроса
*/

/**
* @apiDefine BookSortParam
* @apiParam (Параметры (источник: querystring)) {string[]='title','date','description','image','authors','title ASC','date ASC','description ASC','image ASC','authors ASC','title DESC','date DESC','description DESC','image DESC','authors DESC} [sort] Поля, по которым необходимо отсортировать книги
*/

/**
* @apiDefine BookWhereParam
* @apiParam (Параметры (источник: querystring)) {string} [where] Условия фильтрации книг (параметр должен являться json-строкой, содержащей один из ключей, представленных ниже)
*/

/**
* @apiDefine BookWhereOrParam
* @apiParam (Параметры (источник: querystring)) {object[]{2..}} [where.OR] Логический оператор OR (массив объектов, аналогичных объекту where)
*/

/**
* @apiDefine BookWhereAndParam
* @apiParam (Параметры (источник: querystring)) {object[]{2..}} [where.AND] Логический оператор AND (массив объектов, аналогичных объекту where)
*/

/**
* @apiDefine BookWhereTitleParam
* @apiParam (Параметры (источник: querystring)) {object} [where.title] Объект, содержащий информацию для сравнения с полем title
*/

/**
* @apiDefine BookWhereTitleOperatorParam
* @apiParam (Параметры (источник: querystring)) {string='=','!=','>','>=','<','<=','!<','!>','<>'} [where.title.operator] Оператор сравнения
*/

/**
* @apiDefine BookWhereTitleValueParam
* @apiParam (Параметры (источник: querystring)) {string{..255}} [where.title.value] Значение для сравнения
*/

/**
* @apiDefine BookWhereDateParam
* @apiParam (Параметры (источник: querystring)) {object} [where.date] Объект, содержащий информацию для сравнения с полем date
*/

/**
* @apiDefine BookWhereDateOperatorParam
* @apiParam (Параметры (источник: querystring)) {string='=','!=','>','>=','<','<=','!<','!>','<>'} [where.date.operator] Оператор сравнения
*/

/**
* @apiDefine BookWhereDateValueParam
* @apiParam (Параметры (источник: querystring)) {string} [where.date.value] Значение для сравнения (допустимый формат даты: 'YYYY-MM-DD')
*/

/**
* @apiDefine BookWhereDescriptionParam
* @apiParam (Параметры (источник: querystring)) {object} [where.description] Объект, содержащий информацию для сравнения с полем description
*/

/**
* @apiDefine BookWhereDescriptionOperatorParam
* @apiParam (Параметры (источник: querystring)) {string='=','!=','>','>=','<','<=','!<','!>','<>'} [where.description.operator] Оператор сравнения
*/

/**
* @apiDefine BookWhereDescriptionValueParam
* @apiParam (Параметры (источник: querystring)) {string{..65535}} [where.description.value] Значение для сравнения
*/

/**
* @apiDefine BookWhereImageParam
* @apiParam (Параметры (источник: querystring)) {object} [where.image] Объект, содержащий информацию для сравнения с полем image
*/

/**
* @apiDefine BookWhereImageOperatorParam
* @apiParam (Параметры (источник: querystring)) {string='=','!=','>','>=','<','<=','!<','!>','<>'} [where.timage.operator] Оператор сравнения
*/

/**
* @apiDefine BookWhereImageValueParam
* @apiParam (Параметры (источник: querystring)) {string{..255}} [where.image.value] Значение для сравнения (URL)
*/
