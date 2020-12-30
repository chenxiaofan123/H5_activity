/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/* 'login' app                                            */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

'use strict';


const koa = require('koa');
const log = require('bunyan').createLogger({ name: 'app' });
const common = require('../utils/common.js');

const app = module.exports = {};

app.login = function* (){
	
	log.info("login begin");
	this.flash = {telephone: this.session.telephone || ''};
	yield this.render('user/login', this.flash);
	log.info("login end");
};

app.postLogin = function* (){
	log.info("postLogin");
	log.info(this.request.body.telephone);
	let url = 'user/base/login';
	let  postData = this.request.body;
	this.body = yield common.post(url,postData,null);
	let sessionid  = this.body.data.sessionid;
	this.session.telephone = this.request.body.telephone;
	this.session.sessionid = sessionid;
	log.info(sessionid);
	log.info("postLogin end ");
};
app.logout = function* (){
	log.info("logout");
	let url = 'user/base/logout';
	let  postData = {telephone:this.session.telephone};
	yield common.post(url,postData,this.session.sessionid);
	this.session = null;
	this.redirect('login');
};

app.getSessionId = function *() {
	this.session.id= '';
    this.body = {
        sessionId: this.sessionId
    };
}
app.getRealInfo = function*(){
	let url = 'user/realName/getRealInfo';
	let sessionTelephone = this.request.body.telephone || this.session.telephone
    let sessionId = this.request.body.sessionId || this.session.sessionId
	let  postData = {telephone:sessionTelephone};

	this.body = yield common.post(url,postData,sessionId);
}
app.hasRealInfo = function*(){
    let url = 'user/realName/hasRealInfo';
    let sessionTelephone = this.request.body.telephone || this.session.telephone;
    let sessionId = this.request.body.sessionId || this.session.sessionId;
    let  postData = {telephone:sessionTelephone};
    this.body = yield common.post(url,postData,sessionId);
}

/***以下接口为新添加接口 2017.9.6 wangzhenpeng*** */
/**
 * 验证码登录 
 */
app.loginByValid=function * (){
	let telephone =this.request.body.telephone;
	let authCode=this.request.body.authCode;
	let url="/user/base/loginByValid";
	let result= yield this.commonQuery.post(url, Object.assign({}, {
	  authCode,telephone
  }), null)
   if(result.code=='0000'){
	   //登录成功
	   this.session.orderNo='';
	   this.session.telephone=telephone;
	   this.session.sessionId=result.data.sessionid;
	   this.body={
		   code:'0000'
	   }
   }  else{
	   this.body=result;
   }
}

/**
 * 验证码注册 
 */
app.registerByValid=function * (){
	let telephone =this.request.body.telephone;
	let authCode=this.request.body.authCode;
	let channel=this.request.body.channel||'';
	let url="/user/base/registerByValid";
	let result= yield this.commonQuery.post(url, Object.assign({}, {
	  authCode,telephone,channel
  }), null)
   if(result.code=='0000'){
	   //登录成功
	   this.session.orderNo='';
	   this.session.telephone=telephone;
	   this.session.sessionId=result.data.sessionid;
	   this.body={
		   code:'0000'
	   }
   }  else{
	   this.body=result;
   }
}
app.confirmAuthorization = function*(){
    let url = 'user/depositary/confirmAuthorization';
    let sessionTelephone = this.request.body.telephone || this.session.telephone
    let sessionId = this.request.body.sessionId || this.session.sessionId
    let  postData = {telephone:sessionTelephone};

    this.body = yield this.commonQuery.post(url,postData,sessionId);
}
//登出
app.newlogout = function* (){
	log.info("logout");
	this.session = null;	
	this.body={
		code:'0000'
	}
};