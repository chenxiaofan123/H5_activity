
const router =  require('koa-router')();
const memberActivity  = require('../../apps/activity/memberActivity');
router.prefix('/member');

router.post('/memberGradeInfo', memberActivity.memberGradeInfo);
router.post('/memberTargetInfo', memberActivity.memberTargetInfo);

module.exports = router.routes();