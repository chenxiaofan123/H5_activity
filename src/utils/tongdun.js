/**
 * Created by wanglin on 2017/11/8.
 */
var _fmOpt;

export default  function(){
    $.ajax({
        type: 'GET',
        url:basePath+ '/user/getSessionId',
        dataType: 'json',
        success: function(_data, _textStatus) {
           window._fmOpt = {
                partner: 'hjqb',
                appName: 'hjqb_web',
                token: 'hjqb' + _data.sessionId
            };
            var cimg = new Image(1,1);
            cimg.onload = function() {
                window. _fmOpt.imgLoaded = true;
            };
            cimg.src = "https://fp.fraudmetrix.cn/fp/clear.png?partnerCode=hjqb&appName=hjqb_web&tokenId=" + window. _fmOpt.token;
            var fm = document.createElement('script'); fm.type = 'text/javascript'; fm.async = true;
            fm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'static.fraudmetrix.cn/fm.js?ver=0.1&t=' + (new Date().getTime()/3600000).toFixed(0);
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(fm, s);
        }
    });
}
