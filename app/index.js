const Koa = require('koa');
const routes = require('./routes')
const bodyparser = require('koa-bodyparser')  // 获取 body
const error = require('koa-json-error') // 错误处理
const parameter = require('koa-parameter')  // 校验参数
const app = new Koa();

app.use(bodyparser());
app.use(parameter(app))
app.use(error({
  postFormat: (err, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : {stack, ...rest}
}))
routes(app)
app.listen(3000);
