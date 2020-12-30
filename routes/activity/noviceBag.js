
const router =  require('koa-router')();
const noviceBag  = require('../../apps/activity/noviceBag');
// router.prefix('/activity');

router.get('/giftpacks/info/getGiftPacksInfo', noviceBag.getGiftPacksInfo);

module.exports = router.routes();