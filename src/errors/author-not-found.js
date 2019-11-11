class AuthorNotFoundError extends Error {
  constructor(message) {
    super();

    this.status = 400;
    this.message = message || 'Author not found';
  }
}

module.exports = AuthorNotFoundError;
