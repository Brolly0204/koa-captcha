const router = require('koa-router')()

router.prefix('/search')

router.all('*', async (ctx, next) => {
  ctx.set('X-XSS-Protection', 0)
  await next()
})

router.get('/', async ctx => {
  await ctx.render('search', {
    title: 'Hello Koa 2!',
    keyword: ctx.query.keyword
  })
})

module.exports = router
