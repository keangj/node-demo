const Koa = require('koa');
const routes = require('./routes')
const bodyparser = require('koa-bodyparser')  // 获取 body
const error = require('koa-json-error') // 错误处理
const parameter = require('koa-parameter')  // 校验参数
const app = new Koa();

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
app.use(parameter(app))
app.use(error({
  postFormat: (err, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : {stack, ...rest}
}))
routes(app)
app.listen(3000);
