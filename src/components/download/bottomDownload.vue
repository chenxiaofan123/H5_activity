<template>
 <!-- 底部下载组件 -->
<div class="model-div">
 <div class="footer-model-download" :style="'background:'+bottomBg">
       <div class="left">
          <div></div>
            <div>
               <p>黄金钱包</p>
               <p>能买黄金能理财</p>
             </div>
        </div>
        <div class="right" @click="openApp">立即下载</div>
     </div>
</div>
</template>

<script>
import { openApp } from "../../commonScript/download.js";
export default {
  data() {
    return {
    };
  },
  props: {
    bottomBg: {
      default: '#fff',
      type: String
    }
  },
  watch: {
  },
  methods:{
    openApp(){
      openApp();
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../statics/less/base/method.less";
.model-div{
   &::before{
    .px2rem(height,160);
    width:100%;
    content:'';
    display: block;
  }
}
.footer-model-download {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  .px2rem(height,160);
  .px2rem(padding,40);
  .px2rem(padding-top,25);
  .px2rem(padding-bottom,25);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  //background-color: rgba(0,2,23,0.6);
  .px2rem(font-size,32);
  color: #ffffff;
  z-index: 30000;
 
  .left {
    display: flex;
    align-items: center;
    & > div:first-child {
      .px2rem(width, 110);
      .px2rem(height,110);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url("../../assets/hj-logo.png");
      .px2rem(margin-right,20);
    }
    & > div:nth-child(2) {
      p:last-child {
        .px2rem(font-size,24);
      }
    }
  }
  .right {
    background: #f6f6f6;
    .px2rem(border-radius,100);
    .px2rem(width,180);
    .px2rem(height,70);
    .px2rem(line-height,70);
    .px2rem(font-size,28);
    color: #fb550d;
    text-align: center;
  }
}
</style>

