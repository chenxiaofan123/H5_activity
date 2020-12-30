<template>
    <div class="index-page" v-cloak>
            <div class="first">
                <div class="firstTop">
                   <div class="firstText"></div>
                </div>
                <div class="buttonAll">
                  <div class='firstButtom' @click='getReport()'>获取我的财富报告</div>
                   <div class='giftPackageButton' @click='newPackage()'>领取新手大礼包</div>
                 </div>
                <div class="firstBottom">
                </div>
            </div>
    </div>
</template>
<script>
import util from "../../utils/tool.js";
import wxShare from "../../commonScript/wxShare.js";
import { openApp } from "../../commonScript/download.js";
import {
  getCode,
  checkPhoneNum,
  userRegisterByValid,
  getPrice
} from "../../service/common/common.js";
export default {
  data() {
    return { 
    };
  },
  watch: {},
  filters: {},
  components: { },
  mounted() {

  },
  created(){

  },
  methods: {
    gotoTop() {
      window.scrollTo(0, 0);
    },
    newPackage(){
       location.href = basePath + '/html/pages/noviceBagLandingPage/?channelCode=xnpd2018';
    },
    //下载app
    getReport() {
      openApp();
    }
  },
  beforeMount() {}
};
</script>
<style lang="less" src='./less/index.less' scoped>
</style>