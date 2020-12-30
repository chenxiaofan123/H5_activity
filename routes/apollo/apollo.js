

const router =  require('koa-router')();
const apollo  = require('../../apps/apollo/apollo');
router.prefix('/apollo');
router.get('/getProcessInfo', apollo.getProcessInfo);
router.get('/liveMain', apollo.liveMain);
router.get('/sourceDetail', apollo.sourceDetail);
router.get('/walletCollege', apollo.walletCollege);
router.get('/getPublicDetail', apollo.getPublicDetail);
router.get('/getLiveBroadcastTime', apollo.getLiveBroadcastTime);
router.get('/getActivityRules', apollo.getActivityRules);
module.exports = router.routes();
