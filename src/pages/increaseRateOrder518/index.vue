<template>
    <div class="container">
       <header></header>
       <div class="_bg">
        <p class="btn" @click="gotoPage">立即去抢</p>
         <p class="img"></p>
       </div>
     
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
            "gbanker://page_wap?url=https://test-app-activity.g-banker.com/html/pages/increaseRateEX518/";
        }, 200);
      } else {
        //location.href = "gbanker://page_wap?url=https://m.g-banker.com/GBankerWebApp/html/pages/mainVenueFourth/";
        setTimeout(function() {
          location.href =
            "gbanker://page_wap?url=https://app-activity.g-banker.com/html/pages/increaseRateEX518/";
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
  
 
  header {
    .bg-img("banner.png",750,660);
    margin: 0 auto;
  }
  ._bg{
    .px2rem(padding-top,40);
    .px2rem(padding-bottom,100);
    margin-top:-2px;
     background-image: linear-gradient(-179deg, #360051 0%, #190028 100%);
  }
  .btn {
    background-image: linear-gradient(-135deg, #ffc21c 0%, #ffe833 100%);
    box-shadow: 0 3px 12px 0 #000000, inset 0 3px 1px 0 rgba(255, 255, 255, 0.5);
    .px2rem(border-radius,44);
    .px2rem(width,490);
    .px2rem(height,88);
    .px2rem(line-height,88);
    text-align: center;
    margin: 0 auto;
    color: #440052;
    .px2px(font-size,34);
    .px2rem(margin-bottom,50);
    
    font-weight: bold;
  }
  .img {
    .bg-img("tips.png",668,1185);
    margin: 0 auto;
  }
}
</style>