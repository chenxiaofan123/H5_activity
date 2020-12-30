const version = {
    //ios 
    get_ios_version() {
        var ua = navigator.userAgent.toLowerCase();
        var version = null;
        if (ua.indexOf("like mac os x") > 0) {
            var reg = /os [\d._]+/gi;
            var v_info = ua.match(reg);
            version = (v_info + "").replace(/[^0-9|_.]/gi, "").replace(/_/gi, "."); //得到版本号9.3.2或者9.0
            // version = parseInt(version.split(".")[0]); // 得到版本号第一位
        }
        return version;
    },
    //安卓 
    get_android_version() {
        var ua = navigator.userAgent.toLowerCase();
        var version = null;
        if (ua.indexOf("android") > 0) {
            var reg = /android [\d._]+/gi;
            var v_info = ua.match(reg);
            version = (v_info + "").replace(/[^0-9|_.]/gi, "").replace(/_/gi, "."); //得到版本号4.2.2
            // version = parseInt(version.split(".")[0]); // 得到版本号第一位
        }
        return version;
    },
    //两个版本比较  currentVersion当前版本号   compareVersion比较版本号
    getVersion(currentVersion, compareVersion) {
        var cur = currentVersion.split('.');
        var compare = compareVersion.split('.');
        if (currentVersion) {
            var curV = cur[0] * 1000 + cur[1] * 100 + cur[2] * 10;
            var compareV = compare[0] * 1000 + compare[1] * 100 + compare[2] * 10;
            if (curV >= compareV) {
                return true;
            } else {
                return false;
            }
        }
    }
}
export default version