/**
 * Created by wangzhenpeng 2018/6/10
 * 分享必须是登录状态 才能分享
 */
/**
 * 客户端初始化后 进行数据调用
 * 截图分享 使用这个文件  安卓下面 调用 param 方法进行截图分享 2017/11/27
 */


var clientInit = $.Deferred();
var clientReady = clientInit.promise();

var PageBack={
    cbList:[],
    addCb:function (cb) {
        this.cbList.push(cb);
    },
    emit:function () {
        this.cbList.forEach(function (value) {
            value.call(null);
        })
    }
}

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
    android_new.registerHandler("share", function(data, responseCallback) {
        responseCallback(params);
    });
    android_new.registerHandler("topRightButtonClick", function(data, responseCallback) {
        topRightButtonClick();
    });
        android_new.registerHandler("clientIsReady", function(data, responseCallback) {
            GB.utils.callCustomMethod("setTopRightButton",{
                "title": "分享"
            });
            console.log('app初始化完成');
            if(isHandle){
                clientInit.resolve();
                console.log('clientInit状态改变');
                isHandle=false;
            }
        });

        android_new.registerHandler("onPageBack", function (data, responseCallback) {
            PageBack.emit();
        });
   

})

/*IOS客户端初始化*/
function clientIsReady() {
    topRightSet();
    if(isHandle){
        clientInit.resolve();
        isHandle = false;
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
    if(!sessionProObj.telephone){
        GB.utils.callCustomMethod('login');
        return;
    }
    GB.utils.callCustomMethod("getShareParams", params);
}
function topRightSet(){
    GB.utils.callCustomMethod("setTopRightButton",{
        "title": "分享"
    })
}

function onPageBack() {
    PageBack.emit();
}

/*sessionID相关方法*/

/**
 * @desc sessionId处理对象
 * @usage sessionProObj.storeSession(function(e){})
 *       回调时候会回填一个对象 e = {telephone: _tele, sessionId: _sessionId}
 * */
var sessionProObj = {
    getUserInfo: function(cb) {
        clientReady.done(function() {
            console.log('请求客户端的方法userInfo');
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
                        sessionProObj.telephone=_responseData['telephone'];
                        _telephone = _responseData['telephone'];
                    }
                    if (cb) {
                        cb(_telephone, _sessionId);
                    }
                }
            });
        })

    }
}