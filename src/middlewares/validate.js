const { validate } = require('../helpers');
const { InvalidParamsError } = require('../errors');

module.exports = constraints => {
  return (ctx, next) => {
    const validationResult = validate(ctx.params, constraints);

    if (validationResult) {
      throw new InvalidParamsError(JSON.stringify(validationResult));
    }

    return next();
  };
};
