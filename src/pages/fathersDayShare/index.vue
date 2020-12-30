<template>
    <div class="index-page">
        <img :src="picList[activeIndex]" alt="" class="share-pic">
        <div class="bottom-wrap">
          <div class="bottom-left" :class="{'mr30': activeIndex == 2 }">
            <p>来黄金钱包理财</p>
            <p v-if="activeIndex == 1">帮爸爸发红包</p>
            <p v-else-if="activeIndex == 2">给爸爸多买几台电视机</p>
            <p v-else>给爸爸发零花钱</p>
          </div>
          <div class="bottom-right">
            <img src="./res/scan.png" alt="">
          </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return { 
      activeIndex:-1,
      picList:[require('./res/pic1.png'), require('./res/pic2.png'), require('./res/pic3.png')],
    };
  },
  created(){
    let that = this;
    clientInit.done(function() {
      GB.utils.callCustomMethod("setTopRightButton", {
          title: "分享"
      });
      opera.addCb(function() {
          var params_shared = {
              'type': "2",//分享类型 1：新闻类分享  2：截图分享
              'code': 'fatherday',//活动code，分享统计标示
              'needLogin': '0',
              'platform': '0',//0:弹出选择平台 1:微信好友 2:微信朋友圈 3：QQ好友 4：QQ空间 5：复制链接
              'pushShareMark': '1',//是否需要统计用户分享
          };
          GB.utils.callCustomMethod("share", params_shared);
      });
    });
  },
  mounted() {
    $('.share-pic').height($(window).height() * 0.79);
    $('.bottom-wrap').height($(window).height() * 0.21);
    console.log(this.getQueryString('activeIndex'))
    this.activeIndex = this.getQueryString('activeIndex') || 0;

    let bool = this.isIphoneX();
    if(bool){
      this.picList = [require('./res/pic1x.png'), require('./res/pic2x.png'), require('./res/pic3x.png')]
    }else{
      this.picList = [require('./res/pic1.png'), require('./res/pic2.png'), require('./res/pic3.png')]
    }
  },
  methods: {
    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    isIphoneX(){
      // iPhone X、iPhone XS
      var isIPhoneX = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 375 && window.screen.height === 812;
      // iPhone XS Max
      var isIPhoneXSMax = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && window.screen.width === 414 && window.screen.height === 896;
      // iPhone XR
      var isIPhoneXR = /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 2 && window.screen.width === 414 && window.screen.height === 896;

      return isIPhoneX || isIPhoneXSMax || isIPhoneXSMax;
    }
  },
};
</script>
<style lang="less" scoped>
@import '../../../statics/less/base/method.less';
img{
  width: 100%;
  display: block;
}
.bottom-wrap{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .bottom-left{
    .px2rem(margin-right, 82);
    .px2rem(font-size, 38);
    font-weight: bold;
    .px2rem(line-height, 52);
    color: #232323;
    .px2rem(letter-spacing, 6);
    &.mr30{
      .px2rem(margin-right, 30);
    }
  }
  .bottom-right{
    .px2rem(border-radius, 5);
    border:1px solid #000;
    .px2rem(padding, 10);
    img{
      display: block;
      .px2rem(height, 160);
      .px2rem(width, 160);
    }
  }
}
</style>