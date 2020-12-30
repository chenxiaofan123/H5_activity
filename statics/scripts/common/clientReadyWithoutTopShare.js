/**
 * Created by ckid_hjqb on 2017/5/12.
 */
/**
 * Created by ckid_hjqb on 2016/12/6.
 * @desc 统一客户端初始化处理
 * @dependency 依赖于zepto.js defered.js  或者jquery1.5以上 需要提前引入
 * @function 全局引入引入dtd, 一旦客户端（Android Or IOS)初始化完成，clientInit状态被置为fullfill
 * @usage clientInit.done(function(){})
 */

var clientInit = $.Deferred();
var clientReady = clientInit.promise();
var isHandle = true;

//定义默认的分享参数
var params = new Object();
params['methodName'] = 'getShareParams';
params['type'] = 1;
params['code'] = '';
params['needLogin'] = '0';
params['platform'] = '0';
params['pushShareMark'] = '';
//设置分享参数
function getShareInfo(basePath,telephone,code) {
    $.getJSON(basePath + 'info/getShareInfoJsonp?jsoncallback=?', {
        telephone: telephone,
        code: code,
        pageUrl: encodeURIComponent(location.href.split('#')[0].toString())
    }, function (_data) {
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
    if(window.android_new_new) {
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
    android_new.registerHandler("clientIsReady", function(data, responseCallback) {
        if(isHandle) {
            clientInit.resolve();
            isHandle = false;
        }
    });

})

/*IOS客户端初始化*/
function clientIsReady() {
    if(isHandle) {
        clientInit.resolve();
        isHandle = false;
    }
}

function getShareParams(){
    GB.utils.callCustomMethod("getShareParams",params);
}

/*sessionID相关方法*/

/**
 * @desc sessionId处理对象
 * @usage sessionProObj.storeSession(function(e){})
 *       回调时候会回填一个对象 e = {telephone: _tele, sessionId: _sessionId}
 * */
var sessionProObj = {

    storeSession: function(callback) {
        var that = this;
        clientReady.done(function() {
            that.getAndStoreUserInfo(callback);
        })
    },
    getUserInfo: function(cb) {
        clientReady.done(function() {
            GB.utils.send({
                'methodName': 'userInfo',
                'data': {},
                'responseCallback': function(responseData) {
                    var _sessionId = '',
                        _telephone = '';
                    var _responseData = JSON.parse(responseData);
                    if(_responseData['sessionID']) {
                        _sessionId = _responseData['sessionID'];
                    }
                    if(_responseData['telephone']) {
                        _telephone = _responseData['telephone'];
                    }
                    if(cb) {
                        cb(_telephone, _sessionId);
                    }
                }
            });
        })

    },
    getAndStoreUserInfo: function(callback) {
        var that = this;
        that.getUserInfo(function (_telephone, _sessionId) {
            that.storeInfor(_telephone, _sessionId, callback)
        });
    },

    /*存储sessionId和telephone*/
    storeInfor: function(_tele, _sessionId, callback) {
        GB.post(basePath + '/user/setstore', { telephone: _tele, sessionId: _sessionId }).done(function(_data) {
            callback({ telephone: _tele, sessionId: _sessionId });
        }).fail(function(_data) {
            // 返回错误信息 msg
            console.log(_data);
        });
    }
}