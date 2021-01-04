const router = require('koa-router')()
const {
  getCaptcha
} = require('../utils/index')

router.prefix('/publish')

router.get('/', async ctx => {
  await ctx.render('publish', {
    title: '发布文章'
  })
})

router.get('/captcha', async ctx => {
  ctx.type = 'image/svg+xml'
  const {
    text,
    data
  } = getCaptcha()
  ctx.redis.set('captcha', text, 'EX', 60)
  ctx.body = data
})


router.post('/article', async ctx => {
  console.log(ctx.request.body)
  const {
    captcha
  } = ctx.request.body
  const captchaId = await ctx.redis.get('captcha') || ''
  if (captcha && (captcha.toLowerCase() !== captchaId.toLowerCase())) {
    ctx.body = {
      code: -1,
      msg: '验证码错误'
    }
    return
  }
  await ctx.redis.del('captcha')
  ctx.body = {
    code: 0,
    msg: 'success'
  }
})

module.exports = router
