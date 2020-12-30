<template>
    <div class="page-wrapper">
        <keep-alive>
            <router-view v-if="!!$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        
    </div>
</template>
<script>

import exec from '../../commonScript/autoLayout.exec.js';
import exec1 from '../../commonScript/jquery-1.11.1-min.exec.js';
import base from '../../commonScript/base.exec.js'
import clientReady from '../../commonScript/clientReady.exec.js';
import selfSensorsdata from '../../utils/selfSensorsdata.js';
selfSensorsdata() //载入神策


require("expose-loader?Promise!es6-promise");
require("../../commonScript/wx.exec.js");
let prjconfig = require('prjConf');
let sharebasePath=prjconfig.sharebasePath;
let webV2Path=prjconfig.webV2Path;
let h5GbankerAppBusiness=prjconfig.h5GbankerAppBusiness;

window.basePath =prjconfig.basePath;
window.sharebasePath=prjconfig.sharebasePath;
window.webV2Path=webV2Path;
window.h5GbankerAppBusiness=h5GbankerAppBusiness;


/**
 * 此页面加载默认样式 reset  flexible
 */
export default {
}
</script>
<style lang="less">
@import '../../less/reset.less';
@import '../../../statics/less/base/method.less';
@import '../../../statics/less/components/flex.less';
@import '../../../statics/less/components/toast.less';
body {
    max-width: 750px;
    margin: 0 auto;
    -webkit-overflow-scrolling: touch;
}

.page-wrapper {
}
</style>
