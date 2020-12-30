<template>
    <div class="container">
       <header></header>
       <p class="btn" @click="gotoPage">立即去抢</p>
       <p class="img"></p>
    </div>
    
</template>
<script>
// PageBack.addCb(function(){
//   // console.log('执行app页面回退操作!');
//   location.reload();
// })
export default {
  data() {
    return {};
  },
  beforeMount() {},
  created() {},
  mounted() {
    this.gotoPage();
  },
  components: {},
  methods: {
    gotoPage() {
      var isDev = GB.utils.isDev();
      if (isDev) {
        setTimeout(function() {
          location.href =
            "gbanker://page_wap?url=https://test-app-activity.g-banker.com/html/pages/increaseRateEx/";
        }, 200);
      } else {
        //location.href = "gbanker://page_wap?url=https://m.g-banker.com/GBankerWebApp/html/pages/mainVenueFourth/";
        setTimeout(function() {
          location.href =
            "gbanker://page_wap?url=https://app-activity.g-banker.com/html/pages/increaseRateEx/";
        }, 200);
      }
    }
  }
};
</script>
<style  lang='less'  scoped>
@import "../../../statics/less/base/method.less";
@font-face {
  font-family: "DIN-Bold";
  src: url("../../assets/DIN-Bold.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.bg-img( @file , @width, @height ) {
  .px2rem(width, @width);
  .px2rem(height, @height);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("./res/@{file}");
}
.container {
  box-sizing: border-box;
  .px2rem(padding-bottom,100);
  background-image: linear-gradient(-180deg, #fedf3a 0%, #ff5c00 100%);
  header {
    .bg-img("banner.png",750,532);
    margin: 0 auto;
  }
  .btn {
    background-image: linear-gradient(180deg, #ff883b 0%, #ff5800 100%);
    box-shadow: inset 0 0 6px 0 rgba(255, 255, 255, 0.29);
    .px2rem(border-radius,50);
    .px2rem(width,600);
    .px2rem(height,90);
    .px2rem(line-height,90);
    text-align: center;
    margin: 0 auto;
    color: #fff;
    .px2px(font-size,32);
    .px2rem(margin-bottom,50);
  }
  .img {
    .bg-img("tips.png",668,1117);
    margin: 0 auto;
  }
}
</style>