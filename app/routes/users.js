const Router = require('koa-router')
const router = new Router({prefix: '/users'})
const jwt = require('koa-jwt')
const { secret } = require('../config')
const { createUser, getUsers, deleteUser, updateUser, getUser, login, checkOwner } = require('../controllers/users')

const auth = jwt({ secret })

router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', createUser)
router.delete('/:id', auth, checkOwner, deleteUser)
router.patch('/:id', auth, checkOwner, updateUser)
router.post('/login', login)

module.exports = router
