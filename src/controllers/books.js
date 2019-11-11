const models = require('../models');

module.exports.createBooks = async ctx => {
  ctx.body = await models.books.create(ctx.params);
  ctx.status = 200;
};

module.exports.getBooks = async ctx => {
  ctx.body = await models.books.get(ctx.params);
  ctx.status = 200;
};

module.exports.updateBooks = async ctx => {
  ctx.body = await models.books.update(ctx.params);
  ctx.status = 200;
};
