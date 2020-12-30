/**
 * Created by ckid_hjqb on 2016/11/22.
 * @desc 基础用户系统服务
 */

const log = require('bunyan').createLogger({ name: 'app' });
const common = require('../utils/common.js');
let testdata={test:false};
const app = module.exports= {};

/*检查用户是否注册
* @params
* telephone 用户手机号
* result code 0000 手机号已经注册   0023 手机号未注册
* */
app.checkPhoneNum = function *(telephone, that) {
    let url = '/user/base/checkPhoneNum';
    return yield that.commonQuery.post(url, Object.assign({}, testdata, {telephone: telephone}), null);
};

/*
* 发送验证码
* @params
* telephone 手机号
* type 验证码类型（0为激活，1为重置登陆密码，2为重置支付密码，3pro版本店员校验用户手机号 4登录 5 绑定openid）
* authCodeType：验证码发送方式（1--短信；2--语音；）
* */
app.insertUserSms = function* (telephone, type, authCodeType, that) {
    let url = "/user/base/sendSms";
    let params = {
        telephone: telephone,
        type:type,
        authCodeType: authCodeType
    };
    return yield that.commonQuery.post(url, Object.assign({}, testdata,params), null);
};

/*
* 注册用户
* */
app.insertUserRegisterByValid = function *(userData, that) {
    return yield that.commonQuery.post('/user/base/registerByValid', Object.assign({}, testdata, userData), null);
}
