/**
 * Created by ckid_hjqb on 2016/12/23.
 */

const superagent = require('superagent');
const fs = require('co-fs');
const error = require('../utils/error.js');
const Mock=require('mockjs');
const log = require('bunyan').createLogger({
    name: 'app'
});

const COMPLAINCODE = new Set([
    '0000', '0054', '0055', '0081'
]);//定义正常的返回码

const commonRequestHeader = {
    "X-API-Key": 'foobar',
    "Accept": 'application/json',
    "VERSION": '3.2.0',
    'deviceId': 'WEB',
    'platform': 'Phone',
    'scene': 'Wap',
    'userAgent': 'Wap',
    'channel': 'Wap'
};
const SPEAPI = new Set(["/account/info/getAccountInfo",
    "/account/info/getGoldInfo", "/account/water/getGoldWater", "/server/info/getMediaInfoTopList",
    "/server/info/getMediaInfoList", "/server/info/getMediaInfoDetail", "/user/info/getUserInformationDetail",
    "/server/info/getDepositPromotionList", "/server/info/getDepositInfoViewDetail",
    "/server/info/getDepositInfoViewList", "/server/info/getDepositInfo","server/info/getDepositList4PrizeDraw"]);
class CommonPost {
    constructor(ctx) {
            this._ctx = ctx;
            //this.testOption = testOption;
        }
        // 预处理 url
    urlPreProcess(url) {
        if (url.startsWith('/')) {
            return url;
        } else {
            return '/' + url;
        }
    }

    /*处理测试请求*/
    *
    queryPreProcess(url) {
        let name = url.substring(url.lastIndexOf('/') + 1);
       /* let path = './apps/json/' + name + '.json';
        let result = JSON.parse(yield fs.readFile(path, 'utf-8'));*/
        let path='../mock/'+name+'.js';
        let template=require(path);
        let result=Mock.mock(template);
        return result;
    };

    /*处理host测试*/
     hostPreProcess(url) {
        let host = GLOBAL_SERVERHOST;
        if (url == '/server/price/query' || url == '/comment/guessGoldPriceInfo') {
            host = GLOBAL_SERVERHOST2;
        }
         if (url == '/live/query/queryRankList') {
             host = GLOBAL_SERVERHOST3;
         }
        return host;
    }

    /*处理通用header*/
    headerPreProcess(postData,requestUrl,sessionId) {
        let completeHeader = {};
        if (this._ctx.session&&this._ctx.session.sessionId){
            completeHeader.sessionId = this._ctx.session.sessionId;
        }
         if (sessionId){
            completeHeader.sessionId = sessionId;
        }
        if(SPEAPI.has(requestUrl)){
            completeHeader.apiVersion = "3.0.0";
        }
        if (this._ctx.webIp) {
            completeHeader.webIp = this._ctx.webIp;
        }
        if (this._ctx.sessionId) {
            completeHeader.blackBox = 'hjqb' + this._ctx.sessionId;
        }
        //获取cookie中的deviceId
        
        let deviceId=this._ctx.cookies.get('deviceId');
        if(deviceId){
            completeHeader.deviceId=deviceId;
        }
        return Object.assign({}, commonRequestHeader,completeHeader);

    }

    /*统一处理接口返回异常数据*/
    baseExceptionHandler(res) {
        let responseCode = res.body.code;
        if (!COMPLAINCODE.has(responseCode)) {
            //没有返回正确的返回码
            throw new error.InterfaceInvokeFail(responseCode, res.body.msg);
        } else {
            return res.body;
        }
    }

    *
    post(url, postData, sessionId = null) {
        let requestUrl = this.urlPreProcess(url);

        //如果是测试，则直接返回数据
        if (postData.test) {
            return yield this.queryPreProcess(requestUrl);
        }
        let host = this.hostPreProcess(requestUrl);
        let header = this.headerPreProcess(postData,requestUrl,sessionId);
        log.info({
            host: host,
            service: requestUrl,
            webIp: header.webIp
        });
        let res = yield superagent.post(host + requestUrl)
            .set(header)
            .type('application/json')
            .send(postData);
        if (res.status == 200) {
            log.info({
                req: {
                    url: url,
                    header:header,
                    postData: postData,
                    sessionId: sessionId
                },
                res: res.body
            });
            return this.baseExceptionHandler(res);

        } else {
            throw new error.JsonError(res.status);
        }
    }


    *
    get(url, getData, sessionId = null) {
        let requestUrl = this.urlPreProcess(url);

        //如果是测试，则直接返回数据
        if (getData.test) {
            return yield this.queryPreProcess(requestUrl);
        }
        let host = this.hostPreProcess(requestUrl);
        let header = this.headerPreProcess(getData,requestUrl,sessionId);
        log.info({
            host: host,
            service: requestUrl,
            webIp: header.webIp
        })
        let res = yield superagent.get(host + requestUrl)
            .set(header)
            .query(getData);
        if (res.status == '200') {
            log.info({
                req: {
                    url: url,
                    header:header,
                    getData: getData,
                    sessionId: sessionId
                },
                res: res.body
            });
            return this.baseExceptionHandler(res);
        } else {
            throw new error.JsonError(res.status);
        }

    }

}


module.exports = function () {
    return function* (next) {
        let _ctx = this;
        this.webIp = this.headers['x-forwarded-for'] ||this.headers['x-real-ip'] ||this.socket.remoteAddress;
        //this注入post对象
        this.commonQuery = new CommonPost(_ctx);
        try {
            yield * next;
        } catch(e){
            //此处可以进行异常处理
            if(e instanceof error.InterfaceInvokeFail) {
                //接口调用失败
                this.body = {
                    success: false,
                    msg: e.msg ,
                    code: e.code
                };
                return;
            } else{
                //如果不能处理则继续抛出
                throw e;
            }
        }
    }
}