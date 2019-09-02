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
app.use(bodyparser());
routes(app)
app.listen(3000);
