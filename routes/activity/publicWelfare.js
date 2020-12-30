
const router =  require('koa-router')();
const publicWelfare  = require('../../apps/activity/publicWelfare');
//公益活动 
 router.prefix('/activity');
//进展
router.post('/query/getPublicBenefitInfo', publicWelfare.getPublicBenefitInfo); 
 //爱心数
router.post('/query/getMyParticipationInfo', publicWelfare.getMyParticipationInfo);

module.exports = router.routes();