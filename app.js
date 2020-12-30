'use strict';

const koa = require('koa'),
    bunyan = require('bunyan'),
    path = require('path'),
    koaLogger = require('koa-bunyan'),
    json = require('koa-json'), 
    views = require('koa-views'),
    logger = require('koa-logger'),
    handlebars = require('koa-handlebars'),
    session = require('koa-session-redis'),
    error = require('./apps/utils/error.js'),
    commonQuery = require('./apps/utils/commonPost'),
    statics=require('koa-static'); // 静态文件

//---------------引用hession-----------------------    
const exceptProUtil = require('./apps/utils/exceptProUtil');
const  hessianCustomer = require('./apps/utils/hessian/hessianCustomer');//客户信息
//---------------引用hession-----------------------    

var jsonp = require('koa-safe-jsonp');
require('./apps/utils/global.js');//全局变量

const app = module.exports = koa(); // www app
// const log = bunyan.createLogger({ name: 'app' });
// app.use(koaLogger(log, {}));

//webpack 热更新相关
var webpack = require('webpack')
var webpackConfig = require('./webpack.config')

if (process.env.NODE_ENV == 'dev') {
    var compiler = webpack(webpackConfig);
    var devMiddleware = require('koa-webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        quiet: false,
        stats: {
            colors: true
        }
    })

    var hotMiddleware = require('koa-webpack-hot-middleware')(compiler, {
        // log: () => {}
    })

    app.use(devMiddleware);
    app.use(hotMiddleware);
}



jsonp(app, {
    callback: 'jsoncallback', // default is 'callback'
    limit: 50, // max callback name string length, default is 512
});



//异常处理
app.use(function* (next) {
    try {
        yield* next;
    } catch(e) {
        let status = e.status || 500;
        let message = e.message || '服务器错误';
        // log.error(e);
        if (e instanceof error.JsonError) { // 错误是 json 错误
            this.body = {
                'status': status,
                'code':e.code,
                'message': message
            };
            if (status == 500) {
                // 触发 koa 统一错误事件，可以打印出详细的错误堆栈 log
                this.app.emit('error', e, this);
            }
            return;
        } else if(e instanceof error.InterfaceInvokeFail) {
            //接口调用失败
            this.body = {
                success: false,
                msg: e.msg ,
                code: e.code
            };
            return;
        }
        yield this.render('error', {status:status,'err': e});
        this.app.emit('error', e, this);
    }
});
// handlebars templating
app.use(handlebars({
    extension:   ['html', 'handlebars'],
    viewsDir:    'web/html',
    partialsDir: 'html',
}));


// global middlewares

app.use(require('koa-compress')());
app.use(require('koa-bodyparser')());
app.use(json());
//app.use(logger());

//设置session
app.keys = ['www'];
var store;
store = {
    host: GLOBAL_REDISHOST,
    port: GLOBAL_REDISPORT,
    options: {
        auth_pass: GLOBAL_REDISPASS
    },
    db: 3,
    ttl: 60 * 60 * 24//单位为秒,设置过期为1天
};
app.use(session({
    store:store,
    key:'app_boot'
}));

app.use(function *(next) {

    var session = this.session;
    session.count = session.count || 0;
    session.count++;
    yield next;
})

app.use(commonQuery());

//---------------全局挂载hessian-------
app.use(exceptProUtil);
app.use(hessianCustomer());//客户列表
//---------------全局挂载hessian-------



// app.use(require('koa-history-api-fallback')({
//     index: '/index.html'
// }))

// 添加静态文件
app.use(statics(__dirname+'/web/'));


//添加路由
const router = require("./routes/router");
app.use(router);


