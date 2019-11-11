const InvalidParamsError = require('./invalid-params');
const AuthorNotFoundError = require('./author-not-found');
const BookNotFoundError = require('./book-not-found');
const BookTitleAlreadyInUse = require('./book-title-already-in-use');

module.exports = {
  AuthorNotFoundError,
  BookNotFoundError,
  InvalidParamsError,
  BookTitleAlreadyInUse,
};
