const Router = require('koa-router');
const constraints = require('./constraints');
const controllers = require('./controllers');
const { validate } = require('./middlewares');

const router = new Router();

router.post('/books', validate(constraints.books.createBooks), controllers.books.createBooks);
router.get('/books', validate(constraints.books.getBooks), controllers.books.getBooks);
router.patch('/books/:id', validate(constraints.books.updateBooks), controllers.books.updateBooks);

module.exports = router;
