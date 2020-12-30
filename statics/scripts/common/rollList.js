/**
 * Created by ckid_hjqb on 2016/11/23.
 * 公共的滚动方法
 */

var rollObj = {
    rollList: function (rollElement) {
        var rollElementNum = $(rollElement).find('li').length;
        var animdurlTime = rollElementNum * 2;
        var rollSpeedStyle = {
            "-webkit-animation": "rollUp "+ animdurlTime + "s linear infinite",
            "animation": "rollUp "+ animdurlTime + "s linear infinite"
        }
        $(rollElement).css(rollSpeedStyle);
    }
}