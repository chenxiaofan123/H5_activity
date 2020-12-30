//定义默认的分享参数
var params = new Object();
params['methodName'] = 'getShareParams';
params['type'] = 1;
params['code'] = '';
params['needLogin'] = '0';
params['platform'] = '0';
params['pushShareMark'] = '';
//设置分享参数
function getShareInfo(basePath, telephone, code,callback) {
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
        callback(params);
    })
}
export default  getShareInfo
