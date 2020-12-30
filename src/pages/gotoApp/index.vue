<template>
    <div class="gotoApp-page" v-cloak>
       <p class="logo"></p>
       <p class="btn" @click="gotoPage">打开黄金钱包</p>
       <p class="download" @click="download"><span>下载黄金钱包</span></p>
    </div>
</template>
<script>
 import {openApp} from '../../commonScript/download.js';
export default {
  data() {
    return {
      gotoUrl:'',
      isApp:''
    };
  },
  watch: {},
  mounted() {
    this.gotoUrl = GB.utils.GetRequest()["goto"] || "";
    this.isApp = GB.utils.GetRequest()["isApp"]||'';
    this.gotoPage();
  },
  methods: {
    download(){
       openApp();
    },
    gotoPage(){
       var isDev = GB.utils.isDev();
       var url = '';
       if(this.isApp){
          url = "gbanker://"+this.gotoUrl;
       }else{
          url = "gbanker://page_wap?url="+this.gotoUrl;
       }
       setTimeout(function() {
          location.href = url;
       }, 200);
      // if (isDev) {
      //   setTimeout(function() {
      //     location.href = "gbanker://page_wap?url="+gotoUrl;
      //   }, 200);
      // } else {
      //   setTimeout(function() {
      //     location.href = "gbanker://page_wap?url=https://app-activity.g-banker.com/html/pages/anActivityPreheat/";
      //  }, 200);
      // }
    }
  }
};
</script>
<style lang="less"  scoped>
@import "../../../statics/less/base/method.less";
.gotoApp-page {
  .bg-img( @file , @width, @height ) {
    .px2rem(width, @width);
    .px2rem(height, @height);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url("./res/@{file}");
  }
  .logo {
     .bg-img('logo.png',750,260);
     margin:0 auto;
     max-width:750px;
     .px2rem(margin-top,350);
  }
  .btn{
    background-image: linear-gradient(90deg, #FC9D4C 0%, #FF763C 100%);
    .px2rem(border-radius,8);
    .px2rem(width,670);
    .px2rem(height,96);
    .px2rem(line-height,96);
    text-align:center;
    margin:0 auto;
    .px2px(font-size,34);
    color: #FFFFFF;
  }
  .download{
     .px2rem(width,670);
     margin:0 auto;
     text-align: center;
     .px2rem(margin-top,60);
     color: #FF8133;
     .px2px(font-size,32);
     span{

       border-bottom:1px solid #FF8133;
     }
    
  }
}
</style>
