/**
 * Created by ckid_hjqb on 2016/11/22.
 * @desc
 * 处理用户注册
 */


let koa = require('koa');
let commom = require('../utils/common');
let userService = require('../service/userService');
const error = require('../utils/error');
const log = require('bunyan').createLogger({ name: 'app' });
const SUCCESSCODE = '0000';

const app = module.exports = {};


/*获取手机验证码
* telephone
* authCode 验证码发送方式 （1-- 短信， 2--语音）
* * */
app.getCode=function *() {
    let telephone = commom.getTelephone(this);
    let authCodetype = this.request.body.authCodeType;
    let originUrl = this.request.originalUrl;
    let type=this.request.body.type||0;
    let responseData = {
        success: true,
        code:'0000'
    };

    //防刷
    if (!originUrl.indexOf('dev.huangjinqianbao.com')){
        responseData.code = '9100';
        responseData.msg = '请求异常';
        log.info('suspicious request from ip ' + webIp);
        this.body = responseData;
        return;
    }
    //首先判断用户是否已经注册
    try {
        // 当异常时才有可能为新用户 在方法中进行了一次封装
        this.body = yield userService.checkPhoneNum(telephone, this);
    } catch (e){
        if(e instanceof error.InterfaceInvokeFail && e.code == '0023') {
            //用户未注册
            yield userService.insertUserSms(telephone, type, authCodetype, this);
            this.body = responseData;
        } else {
            //其他错误 继续抛出
            throw new error.InterfaceInvokeFail(e.code, e.msg);
        }
    }
};



/*
* desc 判断用户是否注册
* telephone 用户手机号
* */
app.checkPhoneNum = function *() {
    let telephone = commom.getTelephone(this);
    let responseData = {
        success: true,
        code:'0000'
    };
    //返回code 为 0023 时为未注册
    let regResponseData = yield userService.checkPhoneNum(telephone, this);
    this.body = regResponseData;
}

/*
* desc 判断用户是否注册 进行封装一次 返回统一的格式
* telephone 用户手机号
* */
app.checkPhoneNode = function *() {
    let telephone = commom.getTelephone(this);
    let responseData = {
        success: true,
        code:'0000',
        data:{}
    };
    //返回code 为 0023 时为未注册
    let result=''
    try{
         result = yield userService.checkPhoneNum(telephone, this);
    } catch(e){        
        if(e.code=='0023'){
            // 新用户
            responseData.data={isNewUser:true};
        }
    }
    if(result.code=='0000'){
        responseData.data={isNewUser:false};
    } 
    this.body = responseData;
}

/*
* desc 通过手机号和验证码注册
* @*/
app.userRegisterByValid = function *() {
    let telephone = commom.getTelephone(this);
    let openId = commom.getOpenId(this);
    let nickName = commom.getNickName(this);
    let headImageUrl = commom.getHeadimgurl(this);
    let channel = commom.getParam(this, 'channelCode');
    let password = commom.getParam(this, 'password');
    let rePassword = commom.getParam(this, 'rePassword');
    let userInviteCode = commom.getParam(this, 'userInviteCode');
    let authCode = commom.getParam(this, 'authCode');
    let registSource = commom.getParam(this, 'registSource');
    let salesmanCode = commom.getParam(this,'salesmanCode');
    // console.log("salesmanCode***********"+salesmanCode);
    //如果注册失败，通过统一的错误处理进行
    let userRegistResult = yield userService.insertUserRegisterByValid({
        telephone,
        openId,
        nickName,
        headImageUrl,
        channel,
        userInviteCode,
        authCode,
        password,
        rePassword,
        registSource,
        salesmanCode,
    }, this);  
    //接口调用成功，正常返回
    if(userRegistResult.code=='0000'){
        userRegistResult.success=true;
    }
    this.body = userRegistResult;
}
/***以下接口新添加接口 2017.9.6 wangzhenpeng*** */


/******
 * 获取验证码 
 * 2017/9/6
 */
app.getYzm=function *(){
    
     let telephone=this.request.body.telephone;
     let type=this.request.body.type; // 何种方式发送验证码
     let authCodetype=this.request.body.authCodetype||1;
     let responseData = {
        success: true,
        code:'0000'
    };
     let referer = this.request.accept.headers.referer;

        //防刷
    if (referer.indexOf('html/pages/')<0){
        responseData.code = '9100';
        responseData.msg = '请求异常';
        log.info('suspicious request from ip ' + this.webIp);
        this.body = responseData;
        return;
    }
     if(type!=undefined){
     	this.session.userType=type; // 用户是已注册还是未注册
       this.body= yield userService.insertUserSms(telephone, type, authCodetype, this);
       return;
     } else{
         // 需要判断该手机号是已注册还是未注册
         let registerResult= yield userService.checkPhoneNum(telephone, this); 
         if(registerResult.code=='0000'){
             // 已经注册
             type=4;
         } else if(registerResult.code=='0023'){
             //未注册
             type=0;
         } else {
             type=99;
         }
         if(type==99){
             this.body={
                 code:'9999',
                 msg:'系统繁忙,请稍后重试'
             }
             return;
         }
         this.session.userType=type;
         this.body=yield userService.insertUserSms(telephone, type, authCodetype, this);
     }
 
  } 
