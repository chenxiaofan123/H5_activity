// let WXLOGIN_URL = "https://activity.g-banker.com/wxLogin?redirectUrl=";
// let WXOPENLOGIN_URL="https://activity.g-banker.com/wxOpenLogin?redirectUrl=";
let {
    getWxOpenId,
    getWxUserInfo,
    refreshToken
} = require('../wxInfo/wxInfo')
let wxConfig  = require('../configs/wx.config')
let errCode = require('../configs/staticString')

let url = require('url');

/***
 * 获取openId 及 nickname
 * **/

function* wxLogin(next) {
    var search = this.request.url;
    //console.log(ctx.request.query.redirectUrl); 单独 的 query 取出来的数据不完整
    var redirectUrl = search.split('redirectUrl=')[1];
    var code = this.request.query.code || '';
    var debug = this.request.query.debug || false;
    var that = this;
    if (process.env.env !== 'online' && (!debug)) {
        yield devWxlogin(this);
        return;
    }
    if (this.session && this.session.wxSession) {
        //已经存在登陆信息，获取用户信息
        let userWxInfo = {};
        //刷新access_token
        try {
            this.session.wxSession = yield refreshToken(this.session.wxSession.refresh_token);
        } catch (e) {
            if (e.code === errCode.WX_REFRESHOPENID_ERR) {
                //刷新失败 清除wxSession重新登陆
                this.session.wxSession = null;
                redirectGetCode();
                return;
            } else {
                throw e;
            }
        }
        //session有效 获取用户信息
        this.session.wxUserInfo = yield getWxUserInfo(this.session.wxSession.access_token, this.session.wxSession.openid)
        redirectToUrl()
    } else if (!code) {
        redirectGetCode();
    } else {
        //登陆后带回code参数，通过参数获取用户openId和sessionKey
        try {
            this.session.wxSession = yield getWxOpenId(code);
        } catch (e) {
            //获取失败 重新获取code
            if (e.code === errCode.WX_GETOPENID_ERR) {
                redirectGetCode();
                return;
            } else {
                throw e
            }
        }
        this.session.wxUserInfo = yield getWxUserInfo(this.session.wxSession.access_token, this.session.wxSession.openid)
        redirectToUrl();
    }

    //重定向获取code
    function redirectGetCode() {
        if (process.env.env === 'online') {
            let newUrl = encodeURIComponent(redirectUrl);
            var  url1=`https://${that.host}/wxLogin?redirectUrl=${newUrl}`;
            let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxConfig.WX_APPID}&redirect_uri=${url1}&response_type=code&scope=snsapi_userinfo&state=STATE`;
            that.redirect(url);
        } else {
            that.redirect(`https://${that.host}/wxLogin?redirectUrl=${redirectUrl}`);
        }

    }

    //重定向到redirectUrl
    function redirectToUrl() {
       /* let urlNew = decodeURIComponent();*/
        that.redirect(redirectUrl)
    }
}

/***
 * 只获取获取openId
 * **/
function* wxLoginOpen(next) {
    var search = this.request.url;
    //console.log(ctx.request.query.redirectUrl); 单独 的 query 取出来的数据不完整
    var redirectUrl = search.split('redirectUrl=')[1];
    var code = this.request.query.code || '';
    var debug = this.request.query.debug || false;
    var that = this;
    if (process.env.env !== 'online' && (!debug)) {
        yield devWxlogin(this);
        return;
    }
    if (this.session && this.session.wxSession) {
        //已经存在登陆信息，获取用户信息
        let userWxInfo = {};
        //刷新access_token
        try {
            this.session.wxSession = yield refreshToken(this.session.wxSession.refresh_token);
        } catch (e) {
            if (e.code === errCode.WX_REFRESHOPENID_ERR) {
                //刷新失败 清除wxSession重新登陆
                this.session.wxSession = null;
                redirectGetCode();
                return;
            } else {
                throw e;
            }
        }
        redirectToUrl()
    } else if (!code) {
        redirectGetCode();
    } else {
        //登陆后带回code参数，通过参数获取用户openId和sessionKey
        try {
            this.session.wxSession = yield getWxOpenId(code);
        } catch (e) {
            //获取失败 重新获取code
            if (e.code === errCode.WX_GETOPENID_ERR) {
                redirectGetCode();
                return;
            } else {
                throw e
            }
        }
        redirectToUrl();
    }

    //重定向获取code
    function redirectGetCode() {
        if (process.env.env === 'online') {
            let newUrl = encodeURIComponent(redirectUrl);
            var  url1=`https://${that.host}/wxLogin?redirectUrl=${newUrl}`;
            let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxConfig.WX_APPID}&redirect_uri=${url1}&response_type=code&scope=snsapi_userinfo&state=STATE`;
            that.redirect(url);
        } else {
            that.redirect(WXOPENLOGIN_URL + `https://${that.host}/wxLogin?redirectUrl=${redirectUrl}`);
        }

    }

    //重定向到redirectUrl
    function redirectToUrl() {
        that.redirect(redirectUrl)
    }
}

/**
 * @func 用于测试同学输入openid和昵称
 * @param openid openId;
 * @param neckname 昵称
 */
function* devWxlogin(ctx) {
    if (process.env.env === "online") {
        throw new Error();
    }
    var protocol;
    if(ctx.host.split(":")[1]){
        protocol = "http"
    }else{
        protocol = "https"
    }
    var search = url.parse(ctx.request.url).search;
    //console.log(ctx.request.query.redirectUrl); 单独 的 query 取出来的数据不完整
    var redirectUrl = search.split('redirectUrl=')[1];
    var inputUrl = `${protocol}://${ctx.host}/html/pages/inputOpenid/?redirectUrl=${redirectUrl}`;
    // 测试
    // if (ctx.session && ctx.session.wxUserInfo && ctx.session.wxUserInfo.openid) {
    //     //已经输入openid和neckname  
    //     ctx.redirect(redirectUrl);
    //     return;
    // }
    ctx.redirect(inputUrl);
}

function* enterOpenid() {
    let openid = this.request.query.openid;
    let nickname = this.request.query.nickname;
    let redirectUrl = this.request.query.redirectUrl;
    // 一分钱测试环境 测试人员 openid
     switch(nickname){
         case '振鹏':
          openid='oR_qFuG7AWXLdeYCKeus8uL0-bw8';
         break;
          case '福领':
          openid='oR_qFuNbqYd5q8rhbtGcDHXKtO6M';
          break;
          case '阿福':
          openid='oR_qFuOYfywcIr0OHXAlvDyAr-CU';
          break;
          case '闫妍':
          openid='oR_qFuKsQcCoofgEJ4nFMe_CpH_g';
          break;
          default:
          break;
     }
    this.session.wxUserInfo = {
        nickname,
        openid,
    }
    if(openid){
        this.session.wxSession={
            openid
        }
    }
 
    this.redirect(redirectUrl);
}



module.exports = {
    wxLogin,
    enterOpenid,
    wxLoginOpen
}