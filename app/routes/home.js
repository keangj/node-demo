const Router = require('koa-router')
const router = new Router()
const homeCtl = require('../controllers/home')

router.get('/', (ctx) => {
  homeCtl.home(ctx)
})

module.exports = router
