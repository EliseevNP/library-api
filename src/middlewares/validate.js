const { validateExtension } = require('../helpers');
const { InvalidParamsError } = require('../errors');

module.exports = constraints => {
  return (ctx, next) => {
    const validationResult = validateExtension(ctx.params, constraints);

    if (validationResult) {
      throw new InvalidParamsError(JSON.stringify(validationResult));
    }

    return next();
  };
};
