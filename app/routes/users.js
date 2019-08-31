const Router = require('koa-router')
const router = new Router({prefix: '/users'})
const usersCtl = require('../controllers/users')



router.post('/', (ctx) => {
  usersCtl.createUser(ctx)
  // ctx.set('Allow', 'GET, POST')
})

router.get('/', (ctx) => {
  usersCtl.getUsers(ctx)
})

router.delete('/:id', (ctx) => {
  usersCtl.deleteUser(ctx)
})

router.put('/:id', (ctx) => {
  usersCtl.modifyUser(ctx)
})

router.get('/:id', (ctx) => {
  ctx.body = db[ctx.params.id-1];
  console.log(ctx.params);
})

module.exports = router
