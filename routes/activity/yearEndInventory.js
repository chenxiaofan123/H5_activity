
const router =  require('koa-router')();
const yearEnd  = require('../../apps/activity/yearEnd');
// router.prefix('/activity');

router.post('/user/yearEnd/check', yearEnd.getYearEndDetail);

module.exports = router.routes();