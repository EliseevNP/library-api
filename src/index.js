const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./router');
const { collectParams } = require('./middlewares');

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const status = err.status || 500;

    ctx.status = status;
    ctx.body = {
      error: status < 500 && err.message ? err.message : 'Internal Server Error',
    };
  }
});

app.use(bodyParser());
app.use(collectParams);
app.use(router.routes());

module.exports = app.listen(process.env.APP_PORT);
