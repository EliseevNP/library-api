
module.exports = (ctx, next) => {
  ctx.params = {
    ...ctx.request.body,
    ...ctx.query,
    ...ctx.params,
  };

  return next();
};
