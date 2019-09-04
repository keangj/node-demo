const User = require('../models/users')

class UsersCtl {
  async getUsers (ctx) {
    const users = await User.find();
    ctx.body = users
  }
  async getUser (ctx) {
    const { id } = ctx.params
    const user = await User.findById(id)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.body = user
  }
  async createUser (ctx) {
    ctx.verifyParams({
      name: {
        type: 'string',
        required: true
      }
    })
    const user = await new User(ctx.request.body).save()
    ctx.body = user
  }
  async deleteUser (ctx) {
    const { id } = ctx.params
    const user = await User.findByIdAndRemove(id)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.status = 204;
    // ctx.body = 
  }
  async updateUser (ctx) {
    ctx.verifyParams({
      name: {
        type: 'string',
        required: true
      }
    })
    const { id } = ctx.params
    const { body } = ctx.request
    console.log(id, body);
    const user = await User.findByIdAndUpdate(id, body)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.body = body
  }
}

module.exports = new UsersCtl()