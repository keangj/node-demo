const Koa = require('koa');
const Router = require('koa-router')
const app = new Koa();
const router = new Router();
const usersRouter = new Router({ prefix: '/users' })
const bodyparser = require('koa-bodyparser')
const routes = require('./routes')

// const auth = async (ctx, next) => {
//   if (ctx.url !== '/users') {
//     ctx.throw(404);
//   }
//   await next();
// }
// let db = [{db: 'db'}]

// usersRouter.post('/', (ctx) => {
//   ctx.body = ctx.request.body
//   // ctx.set('Allow', 'GET, POST')
// })

// app.use(async(ctx, next) => {
//   console.log(ctx.url);
//   console.log(ctx.url.match(/\/users/));
//   console.log(ctx.method);
//   // console.log(1);
//   // await next()
//   // console.log(2);
//   ctx.body = 'hi, jay!' + ctx.method;
// });
// app.use(async(ctx, next) => {
//   console.log(3);
//   await next()
//   console.log(4);
// })
// app.use(() => {
//   console.log(5);
// })
routes(app)
app.use(router.routes());
app.use(bodyparser());
app.use(usersRouter.routes());
app.use(usersRouter.allowedMethods());
app.listen(3000);
