/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/* 'common' app                                            */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */


'use strict';


const koa = require('koa');// koa framework
const superagent = require('superagent');
const fs = require('co-fs');
const error = require('../utils/error.js');
const log = require('bunyan').createLogger({name: 'app'});
const app = module.exports = {};
const COMPLAINCODE = new Set([
    '0000', '0054', '0055', '0081'
]);//定义正常的返回码

var commonRequestHeader = {
    "X-API-Key": 'foobar',
    "Accept": 'application/json',
    "VERSION": '3.2.0',
    'deviceId': 'WEB',
    'platform': 'Phone',
    'scene': 'Wap',
    'userAgent': 'Wap',
    'channel': 'Wap'
};

/*
 * 预处理url 补足'/' */
app.urlPreProcess = function (url) {
    if (url.startsWith('/')) {
        return url;
    } else {
        return '/' + url;
    }
};

/*处理测试请求*/
app.queryPreProcess = function *(url) {
    var name = url.substring(url.lastIndexOf('/') + 1);
    var path = './apps/json/' + name + '.json';
    var result = JSON.parse(yield fs.readFile(path, 'utf-8'));
    return result;
};

/*处理host测试*/
app.hostPreProcess = function (url) {
    var host = GLOBAL_SERVERHOST;
    if (url == '/server/price/query' || url == '/comment/guessGoldPriceInfo') {
        host = GLOBAL_SERVERHOST2;
    }
    return host;
};

/*处理通用header*/
app.headerPreProcess = function (postData, sessionId) {
    let completeHeader = {};
    if(sessionId) {
        completeHeader.sessionId = sessionId;
    }
    if(postData.webIp){
        completeHeader.webIp = postData.webIp;
    }
    if(postData.headerSessionId){
        completeHeader.blackBox = 'hjqb' + postData.headerSessionId;
    }
    return Object.assign({}, commonRequestHeader,completeHeader);

};

/*统一处理接口返回异常数据*/
app.baseExceptionHandler = function (res) {
    let responseCode = res.body.code;
    if (!COMPLAINCODE.has(responseCode)) {
        //没有返回正确的返回码
        throw new error.InterfaceInvokeFail(responseCode, res.body.msg);
    } else {
        return res.body;
    }
}


app.post = function*(url, postData, sessionId=null) {
    var requestUrl = app.urlPreProcess(url);

    //如果是测试，则直接返回数据
    if (postData.test) {
        return yield app.queryPreProcess(requestUrl);
    }
    var host = app.hostPreProcess(requestUrl);
    var header = app.headerPreProcess(postData, sessionId);

    log.info({host: host, service: requestUrl, webIp: header.webIp});
    var res = yield superagent.post(host + requestUrl)
        .set(header)
        .type('application/json')
        .send(postData);
    if (res.status == 200) {
        log.info({req: {url: url, postData: postData, sessionId: sessionId}, res: res.body});
        //登录信息不存在则清空session
        // if(res.body.code === '0002' || res.body.code === '0003'){
        // 	this.session.telephone = null;
        // 	this.session.sessionid = null;
        // }

        let responseData = app.baseExceptionHandler(res);
        return responseData;
    } else {
        throw new error.JsonError(res.status);
    }

};

app.get = function *(url, getData, sessionId = null) {
    var requestUrl = app.urlPreProcess(url);
    if (getData.test) {
        return yield app.queryPreProcess(requestUrl);
    }
    let host = app.hostPreProcess(requestUrl);
    let header = app.headerPreProcess(getData, sessionId);
    log.info({
        host: host,
        service: requestUrl,
        webIp: header.webIp
    })
    let res = yield  superagent.get(host + requestUrl)
        .set(header)
        .query(getData);
    if (res.status == '200') {
        log.info({req: {url: url, getData: getData, sessionId: sessionId}, res: res.body});
        return app.baseExceptionHandler(res);
    } else {
        throw  new error.JsonError(res.status);
    }

}

app.getTelephone = function (request) {
    if (request.request.body.telephone) {
        return request.request.body.telephone;
    }
    return request.session.telephone;
};

app.getOpenId=function(request){
    if (request.request.body.openid) {
        return request.request.body.openid;
    }
    let openId = ''; //微信openid
    // 在微信环境中 需要传入session中的openId
    if (request.session.wxUserInfo && request.session.wxUserInfo.openid) {
        openId = request.session.wxUserInfo.openid;
    } else {
        openId = '';
    }

    return openId;
}
app.getNickName = function(request){
    if (request.request.body.nickname) {
        return request.request.body.nickname;
    }
    let nickName = ''; //微信openid
    // 在微信环境中 需要传入session中的openId
    if (request.session.wxUserInfo && request.session.wxUserInfo.nickname) {
        nickName = request.session.wxUserInfo.nickname;
    } else {
        nickName = '';
    }

    return nickName;
}
app.getHeadimgurl = function(request){
    if (request.request.body.headimgurl) {
        return request.request.body.headimgurl;
    }
    let headimgurl = ''; //微信openid
    // 在微信环境中 需要传入session中的openId
    if (request.session.wxUserInfo && request.session.wxUserInfo.headimgurl) {
        headimgurl = request.session.wxUserInfo.headimgurl;
    } else {
        headimgurl = '';
    }

    return headimgurl;
}
app.getSessionId = function (request) {
    if (request.request.body.sessionId) {
        return request.request.body.sessionId;
    }
    return request.session.sessionId;
};
app.getClientIp = function (req) {
    log.info("x-forwarded-for:"+req.headers['x-forwarded-for']+"x-real-ip:"+req.headers['x-real-ip']+"remoteAddress:"
        +req.socket.remoteAddress)
    return req.headers['x-forwarded-for'] ||
        req.headers['x-real-ip'] ||
        req.socket.remoteAddress;
};

app.getParam = function (req, param) {
	if (req.request.body[param]){
		//post请求
		return req.request.body[param];
	}
	//get请求
	return req.request.query[param];
};

app.wrapperPost = function (that) {
    let webIp = that.webIp;
    let headerSessionId = that.sessionId;
    return function *(url, postData, sessionId=null) {
        return yield app.post(url, Object.assign({}, postData, {webIp, headerSessionId}), sessionId = null)
    }
}