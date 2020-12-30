/***
 * 微信内部二次分享代码
 * ****/
var wxShare = {
    // init: function() {
    //     define = null;
    //     require = null;
    //     var tmpTag = 'https:' == document.location.protocol ? "https:" : "http:";
    //     (function() {
    //         var hm = document.createElement("script");
    //         hm.src = tmpTag + "//res.wx.qq.com/open/js/jweixin-1.0.0.js";
    //         var s = document.getElementsByTagName("script")[0];
    //         s.parentNode.insertBefore(hm, s);
    //     })();
    // },
    getWxPlatform: function() {
        //判断是否在微信中
        var userAgent = navigator.userAgent.toLowerCase();
        return userAgent.match(/MicroMessenger/i);
    },
    getShareInfo: function(userCode, code, linkparam) {
        $.getJSON(sharebasePath + "info/getShareInfoForSecond", {
            userCode: userCode,
            code: code,
            pageUrl: encodeURIComponent(location.href.split('#')[0].toString())
        }, function(_data) {
            var lineLink = location.href;
            if (_data.wxurl) {
                lineLink = _data.wxurl;
            }
            if (linkparam) {
                var strparam = '';
                for (var i in linkparam) {
                    if (linkparam.hasOwnProperty(i)) {
                        strparam += i + '=' + linkparam[i] + '&&';
                    }
                }
                strparam = strparam.substring(0, strparam.length - 2);
                var flag = lineLink.indexOf('?') > -1;
                if (flag) {
                    lineLink = lineLink + '&&' + strparam;
                } else {
                    lineLink = lineLink + '?' + strparam;
                }
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
// wxShare.init()
export default  wxShare