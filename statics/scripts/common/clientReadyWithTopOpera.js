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
var opera={
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
    android_new.registerHandler("topRightButtonClick", function(data, responseCallback) {
        topRightButtonClick();
    });

})
/*IOS客户端初始化*/
function clientIsReady() {
    if(isHandle) {
        clientInit.resolve();
        isHandle = false;
    }
}
function topRightButtonClick(){
    opera.emit();
}