const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const search = require('./routes/search')
const publish = require('./routes/publish')
const {
  getRedis
} = require('./utils/redis')

app.use(async (ctx, next) => {
  const config = {
    port: 6379,
    host: '127.0.0.1',
    family: 4,
  }
  ctx.redis = getRedis(config)
  await next()
})

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

app.use(async (ctx, next) => {
  ctx.set('X-XSS-Protection', 0)
  await next()
})

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(search.routes(), search.allowedMethods())
app.use(publish.routes(), publish.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
