const Router = require('koa-router')
const router = new Router({prefix: '/users'})
const { createUser, getUsers, deleteUser, updateUser, getUser } = require('../controllers/users')

router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', createUser)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)

module.exports = router
