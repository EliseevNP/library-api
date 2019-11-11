class BookNotFoundError extends Error {
  constructor(message) {
    super();

    this.status = 400;
    this.message = message || 'Book not found';
  }
}

module.exports = BookNotFoundError;
