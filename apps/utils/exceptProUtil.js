
/**
 * 统一错误处理
 */
const error = require('./error');
const log = require('bunyan').createLogger({
    name: 'app'
});

module.exports = function* (next) {
    try {
        yield* next;
    } catch(e) {
        let status = e.status || 500;
        let message = e.message || '服务器错误';
        log.error(e);
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
        // this.app.emit('error', e, this);
        yield this.render('error', {status:status, err: e});
        
    }
}