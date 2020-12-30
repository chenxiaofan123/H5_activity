<template>
    <div class="index-page">
        <div class="swiper-wrap">
          <swiper :options="swiperOption" ref="swiperOption">
              <swiper-slide v-for="(item, index) in picList" :key="index">
                  <img :src="item" alt="" class="swiper-img">
              </swiper-slide>
          </swiper>
          <div class="swiper-button-next activity-next"></div>
          <div class="swiper-button-prev activity-prev"></div>
          <!-- <div class="swiper-pagination activity-pagination"></div> -->
        </div>
        <div class="share-wrap">
          <p v-if="activeIndex == 1">来黄金钱包理财帮爸爸发红包</p>
          <p v-else-if="activeIndex == 2">来黄金钱包理财给爸爸多买几台电视机</p>
          <p v-else>来黄金钱包理财给爸爸发零花钱</p>
          <a href="javascript:void(0)" @click="gotoShare()">分享给好友</a>
        </div>
    </div>
</template>
<script>
import {swiper, swiperSlide} from "vue-awesome-swiper";
export default {
  data() {
    return {
      picList:[require('./res/pic1.png'), require('./res/pic2.png'), require('./res/pic3.png')],
      activeIndex:0,
      swiperOption: {
          loop: false,
          autoplay: false,
          slidesPerView: "auto",
          speed: 500,
          on: {
            transitionStart: () => {
              var swiperOption = this.$refs.swiperOption.swiper;
              var activeIndex = swiperOption.activeIndex;
              this.activeIndex = activeIndex;
            }
          },
          navigation: {
            nextEl: '.swiper-button-next', //前进按钮的css选择器或HTML元素。
            prevEl: '.swiper-button-prev', //后退按钮的css选择器或HTML元素。
            hideOnClick: true, //点击slide时显示/隐藏按钮
            disabledClass: 'my-button-disabled', //前进后退按钮不可用时的类名。
            hiddenClass: 'my-button-hidden', //按钮隐藏时的Class
          },
      },
    };
  },
 components: {
    swiper,
    swiperSlide
  },
  mounted() {
    $('.swiper-img').height($(window).height() * 0.79);
    $('.share-wrap').height($(window).height() * 0.21);

    let bool = this.isIphoneX();
    if(bool){
      this.picList = [require('./res/pic1x.png'), require('./res/pic2x.png'), require('./res/pic3x.png')]
    }else{
      this.picList = [require('./res/pic1.png'), require('./res/pic2.png'), require('./res/pic3.png')]
    }
  },
  methods: {
    // 分享给好友
    gotoShare(){
      location.href = basePath + '/html/pages/fathersDayShare/?activeIndex=' + this.activeIndex;
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
<style lang="less">
@import '../../../statics/less/base/method.less';
.swiper-button-next.activity-next{
  background: url(./res/next.png) no-repeat center center;
  background-size: contain ;
  .px2rem(width, 50);
  .px2rem(height, 50);
  .px2rem(border-radius, 50);
  .px2rem(right, 30);
}
.swiper-button-prev.activity-prev{
  background: url(./res/prev.png) no-repeat center center;
  background-size: contain;
  .px2rem(width, 50);
  .px2rem(height, 50);
  .px2rem(border-radius, 50);
  .px2rem(left, 30);
}
.my-button-disabled{
  display: none !important;
}
</style>

<style lang="less" scoped>
@import '../../../statics/less/base/method.less';
.swiper-wrap{
  position: relative;
  img{
    width: 100%;
    .px2rem(height, 967);
    display: block;
  }
}
.share-wrap{
  overflow: hidden;
  p{
    text-align: center;
    .px2rem(font-size, 34);
    color: #080841;
    .px2rem(line-height, 48);
    .px2rem(margin-top, 40);
    .px2rem(margin-bottom, 20);
  }
  a{
    text-decoration: none;
    display: block;
    color: #fff;
    margin:0 auto;
    .px2rem(line-height, 80);
    .px2rem(width, 310);
    text-align:center;
    .px2px(font-size, 32);
    background: #F8493C;
    .px2rem(border-radius, 40);
  }
}
//iphoneX、iphoneXs
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    .share-wrap{
      p{
        .px2rem(margin-top, 80);
        .px2rem(margin-bottom, 30);
      }
    }
}

//iphone Xs Max
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    .share-wrap{
      p{
        .px2rem(margin-top, 80);
        .px2rem(margin-bottom, 30);
      }
    }
}

//iphone XR
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
    .share-wrap{
      p{
        .px2rem(margin-top, 80);
        .px2rem(margin-bottom, 30);
      }
    }
}
</style>