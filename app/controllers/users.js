const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/users')
const { secret } = require('../config')

class UsersCtl {
  async checkOwner (ctx, next) {
    console.log('id ' + ctx.params, 'user ' + ctx.state.user);
    const { id } = ctx.params
    const { _id } = ctx.state.user
    if (id !== _id) { ctx.throw(403, '没有权限') }
    await next()
  }

  async getUsers (ctx) {
    const users = await User.find();
    console.log(users);
    ctx.body = users
  }

  async getUser (ctx) {
    const { id } = ctx.params
    const { fields } = ctx.query
    console.log(fields);
    const fieldsSelect = !fields ? '' : fields.split(';').filter(f => f).map(f=> '+'+f).join(' ')
    const user = await User.findById(id).select(fieldsSelect)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.body = user
  }

  async createUser (ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true }
    })
    const { name } = ctx.request.body
    const repeatedUser = await User.findOne({ name })
    if (repeatedUser) { ctx.throw(409, '用户已存在')}
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
  }

  async updateUser (ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      password: { type: 'string', required: false },
      avatar_url: { type: 'string', required: false },
      gender: { type: 'string', required: false },
      headline: { type: 'string', required: false },
      locations: { type: 'array', itemType: 'string', required: false },
      business: { type: 'string', required: false },
      employments: { type: 'array', itemType: 'object', required: false },
      educations: { type: 'array', itemType: 'object', required: false }
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

  async login (ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true }
    })
    const user = await User.findOne(ctx.request.body)
    if (!user) { ctx.throw(401, '用户名或密码不正确') }
    const { _id, name } = user
    const token = jsonwebtoken.sign({ _id, name }, secret, { expiresIn: '1d' })
    ctx.body = { token }
  }

  async getFollowingList (ctx) {
    const { id } = ctx.params
    const user = await User.findById(id).select('+following').populate('following')
    ctx.body = user
  }
  async getFollowedList (ctx) {
    const { id } = ctx.params
    const followed = await User.find({ following: id })
    ctx.body = followed
  }
  async checkUserExist (ctx, next) {
    const user = await User.findById(ctx.params.id)
    !user && ctx.throw(404, '用户不存在')
    await next()
  }
  async follow (ctx) {
    const { id } = ctx.params
    const curUser = await User.findById(ctx.state.user._id).select('+following')
    const repeat = curUser.following.map(id => id.toString()).includes(id)
    if (!repeat) {
      curUser.following.unshift(id)
      curUser.save()
    }
    ctx.body = curUser
  }
  async unfollow (ctx) {
    const { id } = ctx.params
    const curUser = await User.findById(ctx.state.user._id).select('+following')
    const repeat = curUser.following.map(id => id.toString()).includes(id)
    if (repeat) {
      curUser.following = curUser.following.filter(item => item === id)
      curUser.save()
    }
    ctx.status = 204
  }
}

module.exports = new UsersCtl()