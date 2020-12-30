

const router =  require('koa-router')();
const info  = require('../../apps/info/info');
router.prefix('/info');
router.post('/getDepositList4PrizeDraw', info.getDepositList4PrizeDraw);
router.post('/getNewUserGoldInfo', info.getNewUserGoldInfo);
router.post('/findHomeInfo', info.findHomeInfo);
module.exports = router.routes();
