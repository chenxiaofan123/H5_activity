import Vue from 'vue'
import sa from'sa-sdk-javascript';
import log from  './log'
import cookie from './getCookie'

var deviceId = cookie.getCookie('deviceId')||null;
var userCode = cookie.getCookie('userCode')||null;

let prjconfig = require('prjConf');
let saBackstageUrl = prjconfig.saBackstageUrl;
let show_log =prjconfig.show_log
Vue.use(log)
Vue.prototype.$sa = sa;
const selfSensorsdata  = function(){
    sa.init({
    server_url:saBackstageUrl , // 替换成自己的神策地址
    heatmap_url: 'https://static.sensorsdata.cn/sdk/1.12.10/heatmap.min.js',
    web_url:"http://47.99.226.193:8107/login/index.html?to=%2F",
    is_track_device_id:true, //设置成 true 后， 表示事件属性里面添加一个设备 id 的属性，存贮在 cookie 里面并发送。默认 false，记录但不发送。
    use_client_time:true, //true表示使用客户端系统时间
    use_app_track: true, //是app 与H5 是否打通
    send_type:'ajax',
    show_log: show_log, // 打印console，自己配置，可以看到自己是否踩点成功
    heatmap: {
        //是否开启点击图，默认 default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭
        clickmap:'default',
        //是否开启触达注意力图，默认 default 表示开启，自动采集 $WebStay 事件，可以设置 'not_collect' 表示关闭
        scroll_notice_map:'not_collect',
        //设置多少毫秒后开始渲染点击图,因为刚打开页面时候页面有些元素还没加载
        loadTimeout:  3000,
    }
    });
    sa.registerPage({platform_type:"H5",app_name:'黄金钱包'})
    if(userCode){  //神策登录
        sa.login(userCode); 
     }
    log.init();
    sa.quick('autoTrack');
}

export default selfSensorsdata
