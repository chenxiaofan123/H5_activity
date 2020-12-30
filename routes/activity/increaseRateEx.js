
const router = require('koa-router')();
const dailyBid = require('../../apps/activity/increaseRateEx');
router.prefix('/activity');
//活动首页
router.post('/ActivityHome', dailyBid.ActivityHome);
//更新提醒记录
router.post('/addRemind', dailyBid.addRemind);
//取消提醒记录
router.post('/cancelRemind', dailyBid.cancelRemind);
//查询抢购记录
router.post('/queryPanicBuyRecord', dailyBid.queryPanicBuyRecord);

module.exports = router.routes();