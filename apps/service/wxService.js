const logger = require('bunyan').createLogger({
    name: 'app'
});
const error = require('../utils/error.js');
const superagent = require('superagent');

let wxConfig  = require('../configs/wx.config')
let errCode = require('../configs/staticString') 

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



module.exports = {
    getWxOpenId,
    getWxUserInfo,
    refreshToken
}