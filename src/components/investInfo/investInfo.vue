<template>
 <!-- 入股宣传模块 -->
<div class="invest-info-div">
   <div class="_bg" :style="'background:'+bgColor+';color:'+textColor">
     <div class="eval">
         <div>
             <p  class="ryzg"></p>
             <p>全球顶级资本<br/>软银中国连续3轮入股</p>
         </div>
         <div>
             <p  class="hkzb"></p>
             <p>慧科资本<br/>战略入股</p>
         </div>
     </div>
     <div class="eval">
         <div>
             <p  class="zygj"></p>
             <p>中银国际旗下<br/>渤海中盛基金战略入股</p>
         </div>
         <div>
             <p class="gdkg"></p>
             <p>光大控股旗下<br/>光控众盈资本战略入股</p>
         </div>
     </div>
   </div>
</div>
</template>

<script>
import { openApp } from "../../commonScript/download.js";
export default {
  data() {
    return {};
  },
  props: {
    bgColor: {
      default: "#f9f9f9",
      type: String
    },
    textColor:{
      default: "#96969a",
      type: String
    }
  },
  watch: {},
  methods: {}
};
</script>

<style lang="less" scoped>
@import "../../../statics/less/base/method.less";
.bg-img( @file , @width, @height ) {
  .px2rem(width, @width);
  .px2rem(height, @height);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("./@{file}");
}
.invest-info-div {
  .px2rem(padding-left,40);
  .px2rem(padding-right,40);
  color: #96969a;
  .px2px(font-size,24);
  ._bg {
    // background-color: #f9f9f9;
    .px2rem(border-radius,20);
    .px2rem(padding,60);
    .px2rem(padding-left,25);
    .px2rem(padding-right,25);
    .eval {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      &:first-child{
          .px2rem(margin-bottom,40);
      }
      > div:first-child {
        .px2rem(margin-right,20);
      }
      > div {
        > p:first-child {
          .px2rem(margin-bottom,20);
        }
      }
      .ryzg {
        .bg-img("ryzg.png", 280,120);
      }
      .hkzb {
        .bg-img("hkzb.png", 280,120);
      }
      .zygj {
        .bg-img("rygj.png", 280,120);
      }
      .gdkg {
        .bg-img("gdkg.png", 280,120);
      }
    }
  }
}
</style>

