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
  ctx.body = message;
});


router.post('/publish', async (ctx, next) => {
  const message = ctx.request.body.message;
  for (const id in subscribers) {
    if (subscribers[id] && (message !== '')) {
      subscribers[id](message);
    }
  }
});

app.use(router.routes());


module.exports = app;
