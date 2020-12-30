/**
 * Created by wanglin on 2017/10/31.
 */
const logger = require('bunyan').createLogger({
    name: 'app'
});
const error = require('../utils/error.js');
const superagent = require('superagent');
let sha1 = require('node-sha1');
let wxConfig  = require('../configs/wx.config')
let errCode = require('../configs/staticString')

function* getWxToken() {
    let res = yield superagent.get(wxConfig.WX_REQUEST_TOKEN_URL)
        .accept('application/json')
        .query({
            grant_type:'client_credential',
            secret: wxConfig.WX_SECRET,
            appid: wxConfig.WX_APPID
        })
    if (+res.status === 200) {
        var wxRes = JSON.parse(res.text);
        logger.info(wxRes);
        if (!wxRes.errcode) {
            return wxRes
        }
        throw new error.JsonError(
            errCode.WX_GETOPENID_ERR, wxRes.errmsg
        );

    }

    throw new Error('网络错误!');
}


function* getWxTicket(accessToken) {
    let res = yield superagent.get(wxConfig.WX_REQUEST_TICKET)
        .accept('application/json')
        .query({
            access_token: accessToken,
            type: 'jsapi'
        })
    if (+res.status == 200) {
        var wxRes = JSON.parse(res.text);
        if (!wxRes.errcode) return wxRes;
        throw new error.JsonError(wxRes);
    }

    throw  new error.JsonError(wxRes);
}
function * handleTokenTicket(page){
        let tokenInfo =  yield getWxToken();
        /*this.session.token = "45454";*/
        let wxTicket = yield getWxTicket(tokenInfo.access_token);
        /*this.session.ticket = wxTicket;*/
        let timestamp = new Date().getTime();
        let jschars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        function generateMixed(n) {
            let res = "";
            for(var i = 0; i < n ; i ++) {
             var id = Math.ceil(Math.random()*35);
             res += jschars[id];
          }
          return res;
        }
        let noncestr = generateMixed(10);
        let string = 'jsapi_ticket=' + wxTicket.ticket + '&noncestr=' + noncestr + '&timestamp=' + timestamp + '&url=' + page;
        let signature=sha1(string); //获得签名
        let wxObj = {
            "timestamp":timestamp,
            "noncestr":noncestr,
            "jsapi_ticket":wxTicket.ticket,
            "signature":signature
        }
      return wxObj;
    /*return {token:this.session.token};*/
}

function* refreshToken(refreshToken){
    let res = yield superagent.get(wxConfig.WX_REQUEST_REFRESH_TOKEN)
        .accept('application/json')
        .query({
            appid:wxConfig.WX_APPID,
            grant_type: "refresh_token",
            refresh_token: refreshToken
        })
    if(+res.status == 200) {
        var wxRes = JSON.parse(res.text);
        logger.info(wxRes);
        if(!wxRes.errcode) return wxRes;
        throw new error.JsonError(errCode.WX_REFRESHOPENID_ERR, wxRes.errcode)
    }

    throw new error.JsonError(errCode.NETWORK_ERR);
}
function* getWxUserInfo(accessToken, openId) {
    let res = yield superagent.get(wxConfig.WX_REQUEST_USERINFO_URL)
        .accept('application/json')
        .query({
            access_token: accessToken,
            openid: openId,
            lang: 'zh_CN'
        })
    if (+res.status == 200) {
        var wxRes = JSON.parse(res.text);
        logger.info(wxRes);
        if (!wxRes.errcode) return wxRes;
        throw new error.JsonError(errCode.WX_GETUSERINFO_ERR, wxRes.errcode);
    }

    throw  new error.JsonError(errCode.NETWORK_ERR);
}
function* getWxOpenId(code) {
    if (!code) {
        logger.warn('code must not be null');
        throw new Error('code must not be null');
    }

    let res = yield superagent.get(wxConfig.WX_REQUEST_OPENID_URL)
        .accept('application/json')
        .query({
            code,
            secret: wxConfig.WX_SECRET,
            appid: wxConfig.WX_APPID,
            grant_type: 'authorization_code'
        })
    if (+res.status === 200) {
        var wxRes = JSON.parse(res.text);
        logger.info(wxRes);
        if (!wxRes.errcode) {
            return wxRes
        }
        throw new error.JsonError(
            errCode.WX_GETOPENID_ERR, wxRes.errmsg
        );

    }

    throw new Error('网络错误!');
}

module.exports = {
    getWxToken,
    getWxTicket,
    refreshToken,
    handleTokenTicket,
    getWxUserInfo,
    getWxOpenId
}