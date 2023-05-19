const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const log4js = require('./utils/log4j')
const router = require('koa-router')()
const util = require('./utils/util')
const users = require('./routes/users')
const koajwt = require('koa-jwt')
const index = require('./routes/index')
// error handler
onerror(app)

require('./config/db')

// middlewares
app.use(bodyparser({
  enableTypes:['json','form','text']
}))
app.use(json())
 app.use(logger())
 app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views',{
extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  log4js.info(`get params:${JSON.stringify(ctx.request.query )}`)
  log4js.info(`post params:${JSON.stringify(ctx.request.body )}`)
await next().catch((err)=>{
  if(err.status == '401'){
    ctx.status = 200;
    ctx.body = util.fail('Token认证失败',util.CODE.AUTH_ERROR)
  }
})
 
  })
  //任何接口进来都需要中间件先进行校验 
//app.use(koajwt({secret:'miyao'}).unless({ path:[/^\/api\/users\/login/] }))
//    //除了这个接口不校验以外 其他都要校验
 

router.prefix("/api")

index.use(index.routes(),index.allowedMethods())
router.use(users.routes(),users.allowedMethods())
app.use(router.routes(),router.allowedMethods())
app.use(index.routes(),index.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  log4js.error(`${err.stack}`)
});

module.exports = app