<template>
    <div class="index-page" v-cloak>
       <header class="banner1" v-if="isShare"></header>
       <header class="banner2" v-else></header>
        <p class="gotobuy" @click="openApp" v-if="isShare">去投资</p>
       <article>
           <p class="time">活动时间：2019.01.01-2019.01.07</p>
           <div class="_bg">
               <div class="bg2">
                  <ul>
                      <li @click="goback">
                         <div>
                            <p class="title">
                              年终奖助力加息<span>2%</span>
                           </p>
                            <p>
                              2万起投
                           </p>
                          </div>
                          <div class="rate-div">
                            <p class="rate">
                              <span>8.2</span>+<span>2</span>%
                           </p>
                            <p>
                              90天
                           </p>
                          </div>
                          <div>
                              <p>目标年化回报率</p> <p>出借期限</p>
                          </div>
                          <p class="cycle-left"></p>
                          <p class="cycle-right"></p>
                      </li>
                      <li  @click="goback">
                           <div>
                            <p class="title">
                              年终奖助力加息<span>2.3%</span>
                           </p>
                            <p>
                              6万起投
                           </p>
                          </div>
                          <div class="rate-div">
                            <p class="rate">
                              <span>8.2</span>+<span>2.3</span>%
                           </p>
                            <p>
                              90天
                           </p>
                          </div>
                          <div>
                              <p>目标年化回报率</p> <p>出借期限</p>
                          </div>
                          <p class="cycle-left"></p>
                          <p class="cycle-right"></p>
                      </li>
                      <li  @click="goback">
                           <div>
                            <p class="title">
                              年终奖助力加息<span>3%</span>
                           </p>
                            <p>
                              18万起投
                           </p>
                          </div>
                          <div class="rate-div">
                            <p class="rate">
                              <span>8.2</span>+<span>3</span>%
                           </p>
                            <p>
                              90天
                           </p>
                          </div>
                          <div>
                              <p>目标年化回报率</p> <p>出借期限</p>
                          </div>
                          <p class="cycle-left"></p>
                          <p class="cycle-right"></p>
                      </li>
                  </ul>
                  <p class="checkMore"  v-if="!isShare" @click="checkMore">前往首页投资</p>
               </div>
           </div>
       </article>
       <div class="footer footer1" v-if="isShare"></div>
       <div class="footer footer2" v-else></div>
       <v-bottomDownload :bottomBg="bottomBg" v-if="isShare"></v-bottomDownload>
    </div>
</template>
<script>
import util from "../../utils/tool.js";
import wxShare from "../../commonScript/wxShare.js";
import { openApp } from "../../commonScript/download.js";
export default {
  data() {
    return {
      isShare: GB.utils.GetRequest()["isShare"]||'',
      bottomBg: "rgba(0,0,0,0.5)",
      shareCode:'bounsIncreaseShare'

    };
  },
  watch: {},
  filters: {},
  components: {},
  mounted() {
    if(!this.isShare){
        getShareInfo(sharebasePath, "", this.shareCode);
    }else{
      wxShare.getShareInfo('', this.shareCode);
    }
  },
  methods: {
    openApp() {
      openApp();
    },
   goback(){
     if(this.isShare){
       return;
     }
     GB.utils.callCustomMethod("goBack",{});
   },
    checkMore() {
     GB.utils.callCustomMethod("goBack",{});
    },
    goShare() {
      if (!this.telephone) {
        this.callAppLogin();
        return;
      }
      var params_shared = {
        type: "1", //分享类型 1：新闻类分享  2：截图分享
        code: shareCode, //活动code，分享统计标示
        needLogin: "1",
        platform: "0", //0:弹出选择平台 1:微信好友 2:微信朋友圈 3：QQ好友 4：QQ空间 5：复制链接
        pushShareMark: "" //是否需要统计用户分享
      };
      GB.utils.callCustomMethod("share", params_shared);
    }
  },
  beforeMount() {}
};
</script>
<style lang="less"  scoped>
@import "../../../statics/less/base/method.less";
.model-div {
  &::before {
    height: 0 !important;
    width: 100%;
    content: "";
    display: block;
  }
}
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

.border(@size,@color) {
  @bor: @size / 75 * 1rem;
  border: @bor solid @color;
}
[v-cloak] {
  display: none !important;
}
.index-page {
  background: #cf1a18;
  header {
    margin: 0 auto;
  }
  .banner1 {
    .bg-img("banner.png",750,740);
  }
  .gotobuy {
    background-image: linear-gradient(-180deg, #ffe595 0%, #ffc65b 100%);
    .px2rem(border-radius,44);
    .px2rem(line-height,88);
    text-align: center;
    .px2px(font-size,42);
    color: #b30006;
    letter-spacing: 2px;
    .px2rem(width,400);
    .px2rem(height,88);
    margin: 0 auto;
    text-shadow: 0 1px #ffe595;
    .px2rem(margin-top,-140);
    font-weight: bold;
    .px2rem(margin-bottom,50);
    box-shadow: 0 4px 0 #fb7430;
  }
  .banner2 {
    .bg-img("banner2.png",750,600);
  }
  article {
    .time {
      text-align: center;
      .px2px(font-size,28);
      color: #ffffff;
      .px2rem(padding-top,20);
      .px2rem(padding-bottom,20);
    }
    ._bg {
      background: #ea3c3e;
      box-shadow: 0 2px 0 0 #b70006;
      .px2rem( border-radius,10);
      .px2rem(width,710);
      margin: 0 auto;
      .px2rem(padding-top,40);
      .px2rem(padding-bottom,40);
      .bg2 {
        background: #b70006;
        border: 1px solid #fd4749;
        .px2rem( border-radius,10);
        .px2rem(width,670);
        margin: 0 auto;
        .px2rem(padding-left,34);
        .px2rem(padding-right,34);
        box-sizing: border-box;
        .px2rem(padding-bottom,40);
        ul {
          li {
            position: relative;
            .px2rem(margin-top,30);
            .px2px(font-size,24);
            color: #969696;
            letter-spacing: 0.37px;
            background: #ffffff;
            box-shadow: 0 2px 4px 0 #b40107;
            .px2rem( border-radius,10);
            .px2rem(padding-bottom,32);
            .px2rem(padding-left,50);
            .px2rem(padding-right,50);
            .px2rem(padding-top,27);
            & > div {
              display: flex;
              justify-content: space-between;
              align-items: center;
              width: 100%;
              box-sizing: border-box;
              .title {
                .px2px(font-size,28);
                color: #343434;
                font-weight: bold;
                letter-spacing: 0.44px;
                span {
                  color: #ff4008;
                }
              }
            }
            .rate-div {
              .px2px(font-size,28);
              color: #333333;
              letter-spacing: 0.44px;
              font-weight: bold;
              p:first-child {
                .px2px(font-size,36);
                color: #ff4008;
                span {
                  .px2px(font-size,64);
                }
              }
            }
            .cycle-left {
              background: #b70006;
              border-radius: 100%;
              .px2rem(width,30);
              .px2rem(height,30);
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              .px2rem(left,-15);
            }
            .cycle-right {
              background: #b70006;
              border-radius: 100%;
              .px2rem(width,30);
              .px2rem(height,30);
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              .px2rem(right,-15);
            }
          }
        }
        .checkMore {
          background: rgba(253, 175, 77, 0.3);
          .px2rem(width,260);
          .px2rem(height,60);
          .px2rem(line-height,60);
          text-align: center;
          .px2rem(border-radius,30);
          .px2px(font-size,24);
          color: #ffffff;
          letter-spacing: 1px;
          margin: 0 auto;
          .px2rem(margin-top,40);
        }
      }
    }
  }
  .footer {
    margin: 0 auto;
    .px2rem(margin-top,-20);
    &.footer1 {
      .bg-img("footer.png",750,505);
    }
    &.footer2 {
      .bg-img("footer2.png",750,345);
    }
  }
}
</style>
