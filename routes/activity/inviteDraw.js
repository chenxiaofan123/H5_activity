
const router =  require('koa-router')();
const inviteDraw  = require('../../apps/activity/inviteDraw');
router.prefix('/activity');
//邀请20名列表 (轮播)
router.post('/getCurrentMonthLastHundredList', inviteDraw.getCurrentMonthLastHundredList);
/*四周年20名列表*/
router.post('/getLatestInviteList', inviteDraw.getLatestInviteList);
//邀请好友记录
router.post('/getUserInviteInfo', inviteDraw.getUserInviteInfo);
//抽奖
router.post('/lotteryDraw', inviteDraw.lotteryDraw);
// 邀请收益
router.post('/getUserBasicActInfo', inviteDraw.getUserBasicActInfo);

//邀请奖励详情
router.post('/getUserRewardInfo', inviteDraw.getUserRewardInfo);
//人脉pk 个人奖励排名
router.post('/getPersonPKRewardRank',inviteDraw.getPersonPKRewardRank);
//四周年个人奖励排名
router.post('/getPersionInviteRank',inviteDraw.getPersionInviteRank);
//当月前3名
router.post('/getCurrentMonthTopList',inviteDraw.getCurrentMonthTopList);
//达人榜100名
router.post('/getCurrentMonthHundredTopList',inviteDraw.getCurrentMonthHundredTopList);
//四周年达人榜
router.post('/getCurrentHundredTopList',inviteDraw.getCurrentHundredTopList);
//四周年获取第一名
router.post('/getFirstReward',inviteDraw.getFirstReward);
//邀请活动-开启天降豪礼
router.post('/openFirstReward',inviteDraw.openFirstReward);

module.exports = router.routes();