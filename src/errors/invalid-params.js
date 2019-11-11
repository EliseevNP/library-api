class InvalidParamsError extends Error {
  constructor(message) {
    super();

    this.status = 400;
    this.message = message || 'Invalid parameters';
  }
}

module.exports = InvalidParamsError;
