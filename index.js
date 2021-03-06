// require('./schema');
const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
const koaRouter = require('koa-router');
const router = koaRouter();

// const {exportPriceInfo} = require('./service/price');
//
// (async()=>{
//     await exportPriceInfo();
// })();

app.use(koaBody());
// response
app.use(router.routes());
app.use(router.allowedMethods());

// const http = app.listen(4003);
// console.info('==> Server now is listening on port 4003');