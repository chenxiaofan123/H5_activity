/**
 * Created by wanglin on 2016/9/6.
 */

const router = require('koa-router')();
const pageerr = require('../../apps/error/info1.js');


/**页面错误信息***/
router.post('/webapp/pageerr', pageerr.webapppageerror);


module.exports = router.middleware();