const qs = require('qs');

module.exports = (ctx, next) => {
  ctx.params = {
    ...ctx.request.body,
    ...qs.parse(ctx.query),
    ...ctx.params,
  };

  return next();
};
