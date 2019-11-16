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
* @apiParam (Параметры (источник: querystring)) {object} [where.title] Объект, содержащий информацию для сравнения с названием книги
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
* @apiParam (Параметры (источник: querystring)) {object} [where.date] Объект, содержащий информацию для сравнения с датой публикации книги
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
* @apiParam (Параметры (источник: querystring)) {object} [where.description] Объект, содержащий информацию для сравнения с описанием книги
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
* @apiParam (Параметры (источник: querystring)) {object} [where.image] Объект, содержащий информацию для сравнения со ссылкой на картинку обложки книги
*/

/**
* @apiDefine BookWhereImageOperatorParam
* @apiParam (Параметры (источник: querystring)) {string='=','!=','>','>=','<','<=','!<','!>','<>'} [where.image.operator] Оператор сравнения
*/

/**
* @apiDefine BookWhereImageValueParam
* @apiParam (Параметры (источник: querystring)) {string{..255}} [where.image.value] Значение для сравнения (URL)
*/

/**
* @apiDefine BookWhereNameParam
* @apiParam (Параметры (источник: querystring)) {object} [where.name] Объект, содержащий информацию для сравнения с именем автора книги
*/

/**
* @apiDefine BookWhereNameOperatorParam
* @apiParam (Параметры (источник: querystring)) {string='=','!=','>','>=','<','<=','!<','!>','<>'} [where.name.operator] Оператор сравнения
*/

/**
* @apiDefine BookWhereNameValueParam
* @apiParam (Параметры (источник: querystring)) {string{..255}} [where.name.value] Значение для сравнения
*/

/**
* @apiDefine BookWhereSecondNameParam
* @apiParam (Параметры (источник: querystring)) {object} [where.second_name] Объект, содержащий информацию для сравнения с фамилией автора книги
*/

/**
* @apiDefine BookWhereSecondNameOperatorParam
* @apiParam (Параметры (источник: querystring)) {string='=','!=','>','>=','<','<=','!<','!>','<>'} [where.second_name.operator] Оператор сравнения
*/

/**
* @apiDefine BookWhereSecondNameValueParam
* @apiParam (Параметры (источник: querystring)) {string{..255}} [where.second_name.value] Значение для сравнения
*/

/**
* @apiDefine BookWherePatronymicParam
* @apiParam (Параметры (источник: querystring)) {object} [where.patronymic] Объект, содержащий информацию для сравнения с отчеством автора книги
*/

/**
* @apiDefine BookWherePatronymicOperatorParam
* @apiParam (Параметры (источник: querystring)) {string='=','!=','>','>=','<','<=','!<','!>','<>'} [where.patronymic.operator] Оператор сравнения
*/

/**
* @apiDefine BookWherePatronymicValueParam
* @apiParam (Параметры (источник: querystring)) {string{..255}} [where.patronymic.value] Значение для сравнения
*/
