/**
 * Created by ckid_hjqb on 2017/5/11.
 */
/**
 * Created by ckid_hjqb on 2016/12/6.
 * @desc 统一客户端初始化处理
 * @dependency 依赖于zepto.js defered.js  或者jquery1.5以上 需要提前引入
 * @function 全局引入引入dtd, 一旦客户端（Android Or IOS)初始化完成，clientInit状态被置为fullfill
 * @usage clientInit.done(function(){})
 * 
 * 用于 页面内右上角分享 及客户端初始化  二次分享
 */

 var clientInit = $.Deferred();
 var clientReady = clientInit.promise();

var isHandle = true;

//定义默认的分享参数
var params = {};
params['methodName'] = 'getShareParams';
params['type'] = 1;
params['code'] = '';
params['needLogin'] = '0';
params['platform'] = '0';
params['pushShareMark'] = '';
//设置分享参数
function getShareInfo(basePath, telephone, code) {
    $.getJSON(basePath + 'info/getShareInfoJsonp?jsoncallback=?', {
        telephone: telephone,
        code: code,
        pageUrl: encodeURIComponent(location.href.split('#')[0].toString())
    }, function(_data) {
        var lineLink = location.href;
        if (_data.wxurl) {
            lineLink = _data.wxurl;
        }
        params['title'] = _data.title;
        params['imageUrl'] = _data.imageUrl;
        params['description'] = _data.description;
        params['url'] = lineLink;
    })
}

//用于更新参数，比如截图分享
function updateParams(curtomParam) {
    $.extend(params, curtomParam)

}

function initJsBridge(callback) {
    if (window.android_new_new) {
        callback(android_new);
    } else {
        document.addEventListener(
            'WebViewJavascriptBridgeReady',
            function() {
                callback(android_new)
            },
            false
        );
    }
}
/*安卓初始化*/
initJsBridge(function(android_new) {
    android_new.init();

    android_new.registerHandler("isCanShare", function(data, responseCallback) {
        responseCallback(true);
    });
    android_new.registerHandler("getShareParams", function(data, responseCallback) {
        responseCallback(params);
    });
    android_new.registerHandler("topRightButtonClick", function(data, responseCallback) {
        topRightButtonClick();
    });
    android_new.registerHandler("clientIsReady", function(data, responseCallback) {
        GB.utils.callCustomMethod("setTopRightButton",{
            "title": "分享"
        });
        if(isHandle){
        	isHandle=false;
        	clientInit.resolve();
        }
    });

})

/*IOS客户端初始化*/
function clientIsReady() {
    topRightSet();
   if(isHandle){
        	isHandle=false;
        	clientInit.resolve();
        }
}

//ios调用的方法
function isCanShare() {
    var param_share = { "isCanShare": "1" };
    GB.utils.callCustomMethod("isCanShare", param_share);
}

function getShareParams() {
    GB.utils.callCustomMethod("getShareParams", params);
}
function topRightButtonClick(){
    GB.utils.callCustomMethod("getShareParams", params);
}
function topRightSet(){
    GB.utils.callCustomMethod("setTopRightButton",{
        "title": "分享"
    })
}

/*sessionID相关方法*/

/**
 * @desc sessionId处理对象
 * @usage sessionProObj.storeSession(function(e){})
 *       回调时候会回填一个对象 e = {telephone: _tele, sessionId: _sessionId}
 * */
var clientObj = {
    getUserInfo: function(cb) {
            GB.utils.send({
                'methodName': 'userInfo',
                'data': {},
                'responseCallback': function(responseData) {
                    var _sessionId = '',
                        _telephone = '';
                    var _responseData = JSON.parse(responseData);
                    if (_responseData['sessionID']) {
                        _sessionId = _responseData['sessionID'];
                    }
                    if (_responseData['telephone']) {
                        _telephone = _responseData['telephone'];
                    }
                    if (cb) {
                        cb(_telephone, _sessionId);
                    }
                }
            });
    }
}

var wxShare = {
    init: function() {
        var tmpTag = 'https:' == document.location.protocol ? "https:" : "http:";
        (function() {
            var hm = document.createElement("script");
            hm.src = tmpTag + "//res.wx.qq.com/open/js/jweixin-1.0.0.js";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    },
    getWxPlatform: function() {
        //判断是否在微信中
        var userAgent = navigator.userAgent.toLowerCase();
        return userAgent.match(/MicroMessenger/i);
    },
    getShareInfo: function(userCode, code) {
        $.getJSON(shareBasePath + "info/getShareInfoForSecond", {
            userCode: userCode,
            code: code,
            pageUrl: encodeURIComponent(location.href.split('#')[0].toString())
        }, function(_data) {
            var lineLink = location.href;
            if (_data.wxurl) {
                lineLink = _data.wxurl;
            }
            if (wxShare.getWxPlatform() == "micromessenger") {
                //微信页面
                wx.config({
                    debug: _data.isDebug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: _data.appid, // 必填，公众号的唯一标识
                    timestamp: _data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: _data.noncestr, // 必填，生成签名的随机串
                    signature: _data.signature, // 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function() {
                    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                    wx.onMenuShareTimeline({
                        title: _data.title, // 分享标题
                        desc: _data.description, // 分享描述(不确定)
                        link: lineLink, // 分享链接
                        imgUrl: _data.imageUrl, // 分享图标
                        success: function(res) {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function() {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    wx.onMenuShareAppMessage({
                        title: _data.title, // 分享标题
                        desc: _data.description, // 分享描述
                        link: lineLink, // 分享链接
                        imgUrl: _data.imageUrl, // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function() {
                            // 用户确认分享后执行的回调函数
                        },
                        cancel: function() {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                });

            }

        })
    }
}
wxShare.init()