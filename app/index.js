const Koa = require('koa');
const routes = require('./routes')
const koaBody = require('koa-body')  // 获取 body
const error = require('koa-json-error') // 错误处理
const parameter = require('koa-parameter')  // 校验参数
const mongoose = require('mongoose')
const path = require('path')
const app = new Koa();
const { connectionStr } = require('./config')

mongoose.connect(connectionStr, { useNewUrlParser: true, useFindAndModify: false }, () => console.log('MongoDB 连接成功'))
mongoose.connection.on('error', console.error)

app.use(koaBody({
  multipart: true,  // 支持文件上传
  formidable: { // 配置 multipart 选项
    uploadDir: path.join(__dirname, '/public/uploads'),  // 上传文件路径
    keepExtensions: true  // 保留文件后缀
  }
}));
app.use(parameter(app))
app.use(error({
  postFormat: (err, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : {stack, ...rest}
}))
routes(app)
app.listen(3000);
