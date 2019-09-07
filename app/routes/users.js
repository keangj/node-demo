const Router = require('koa-router')
const router = new Router({prefix: '/users'})
const jsonwebtoken = require('jsonwebtoken')
const { secret } = require('../config')
const { createUser, getUsers, deleteUser, updateUser, getUser, login, checkOwner } = require('../controllers/users')

const auth = async (ctx, next) => {
  const { authorization = '' } = ctx.request.headers
  const token = authorization.replace('Bearer ', '')
  try {
    const user = jsonwebtoken.verify(token, secret)
    console.log(user);
    ctx.state.user = user
  } catch (err) {
    ctx.throw(401, err.message)
  }
  await next()
}

router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', createUser)
router.delete('/:id', auth, checkOwner, deleteUser)
router.patch('/:id', auth, checkOwner, updateUser)
router.post('/login', login)

module.exports = router
