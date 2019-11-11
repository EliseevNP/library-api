class BookTitleAlreadyInUse extends Error {
  constructor(message) {
    super();

    this.status = 400;
    this.message = message || 'Book title already in use';
  }
}

module.exports = BookTitleAlreadyInUse;
