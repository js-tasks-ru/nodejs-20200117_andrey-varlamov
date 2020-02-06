const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')('public'));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

const subscribers = {};
let id = 0;

router.get('/subscribe', async (ctx, next) => {
  const _id = id;
  id++;
  ctx.res.on('close', () => {
    delete subscribers[_id];
  });
  const message = await new Promise((resolve) => {
    subscribers[_id] = resolve;
  });
  delete subscribers[_id];
  ctx.body = message;
  next();
});


router.post('/publish', async (ctx, next) => {
  const message = ctx.request.body.message;
  if (!message) {
    ctx.status = 200;
    return;
  }
  for (const id in subscribers) {
    if (subscribers[id]) {
      const resolve = subscribers[id];
      resolve(message);
      ctx.status = 200;
    }
  }
});

app.use(router.routes());


module.exports = app;
