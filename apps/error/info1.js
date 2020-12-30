/**
 * Created by wangzhenpeng 2018.4.10
 */

const log = require('bunyan').createLogger({name: 'webapppage'});



/******
 * 前端页面发生异常错误, 在此记录一下 
 * 需要在前端页面 需要监控的地方 手动调用该接口
 * param  e 错误信息   info 本机信息
 */

 function * webapppageerror(){

    let errobj=this.request.body.e||'';
    let info=this.request.body.info||'';
    log.info({
        err:errobj,
        info:info,
        time:new Date().toString()
    })
    this.body={success:true}
 }
module.exports = {
    webapppageerror
}