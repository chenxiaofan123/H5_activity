
const router =  require('koa-router')();
const prizeDraw  = require('../../apps/activity/prizeDraw.js');
router.prefix('/prizeDraw');
//用户抽奖记录  新年活动
router.post('/getUserPrizeListInfo',prizeDraw.getUserPrizeListInfo);
//用户新年活动首页信息 
router.post('/getUserDrawPrizeInfo',prizeDraw.getUserDrawPrizeInfo);
//用户领取每日翻盘机会 
router.post('/drawChance',prizeDraw.drawChance);
//查询中奖信息列表
router.post('/getWinningList',prizeDraw.getWinningList);
// 用户抽奖
router.post('/luckDraw',prizeDraw.luckDraw);
// 用户信息查询
router.post('/getNewUserPrizeInfo',prizeDraw.getNewUserPrizeInfo);
//活动信息查询
router.post('/getActInfo',prizeDraw.getActInfo);
//用户奖品详细信息
router.post('/getUserDrawPrizeDetailInfo',prizeDraw.getUserDrawPrizeDetailInfo);
module.exports = router.routes();