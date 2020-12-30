/**
 * Created by ckid_hjqb on 2016/11/23.
 * 处理用户注册
 */
const router = require('koa-router')();
var registe = require('../../apps/user/userRegist');

router.prefix('/regist');
router.post('/getCode', registe.getCode);
router.post('/getYzm', registe.getYzm);
router.post('/checkPhoneNum', registe.checkPhoneNum);
router.post('/checkPhoneNode',registe.checkPhoneNode);
router.post('/userRegisterByValid', registe.userRegisterByValid);


module.exports = router.middleware();