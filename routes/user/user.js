const router = require('koa-router')();
const user = require('../../apps/user/user.js');

router.prefix('/user');
router.get('/login', user.login);
router.post('/login',user.postLogin);
router.get('/logout',user.logout);
//清除session 登出
router.get('/newlogout',user.newlogout);
router.get('/getSessionId', user.getSessionId);
router.post('/getRealInfo',user.getRealInfo);

//验证码登录
router.post('/loginByValid',user.loginByValid);
//验证码注册
router.post('/registerByValid',user.registerByValid);
router.post('/confirmAuthorization',user.confirmAuthorization);
router.post('/hasRealInfo',user.hasRealInfo);

module.exports = router.middleware();
