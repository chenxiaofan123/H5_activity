<template>
    <div class="index-page" v-cloak>
      <header class="top">
          <div class="tipText clearfix">
              <div class="left text">活动开始时间：6月6日 11:00</div>
              <div class="left  remindButton" @click="gotoPage">立即去玩</div>
          </div>
      </header>
      <div class="middle">
          <div class="blueContent">
          </div>
            <div class="whiteContent">
              <div class="whiteTop">
              </div>
                <div class="whiteTopText">
                  累计答对题数越多，排名越靠前，<span>奖励越多</span>
              </div>
              <div class="tips">
                  <div class="iconAll" >
                    <div class="iconImg" >
                      <img src="./res/icon1.png" />
                    </div>
                    <div class="iconText" >
                      1-3名，分别获得3000元、2000元、1000<span>元现金红包</span>
                    </div>
                  </div>
                  <div class="iconAll" >
                    <div class="iconImg" >
                      <img src="./res/icon2.png" />
                    </div>
                    <div class="iconText" >
                      1-10名，获得<span>5%加息神券</span>
                    </div>
                  </div>
                  <div class="iconAll" >
                    <div class="iconImg" >
                      <img src="./res/icon3.png" />
                    </div>
                    <div class="iconText" >
                      1-1000名，可获得<span>华为P30抽奖机会</span>
                    </div>
                  </div>
                  <div class="iconAll" >
                    <div class="iconImg" >
                      <img src="./res/icon4.png" />
                    </div>
                    <div class="iconText" >
                      <span>所有参与答题的用户</span><br/>
                      答对一题就有奖，最高可得66元现金
                    </div>
                  </div>

              </div>
              
          </div>
      </div>
      <div class="bottom">
          <div class="bottomButton" @click="goRule()">活动细则</div>
      </div>
     
    </div>
</template>
<script>
import User from "../../service/common/User";
import { openApp } from "../../commonScript/download.js";

export default {
  data() {
    return {
      user: new User(),
    }
  },
  watch: {},
  filters: {
   
  },
  components: {},
  mounted() {
     this.gotoPage();
  },
  methods: {
     gotoPage() {
       
      var isDev = GB.utils.isDev();
      if (isDev) {
        setTimeout(function() {
          location.href = "gbanker://page_wap?url=https://test-app-activity.g-banker.com/html/pages/anActivityPreheat/";
        }, 200);
      } else {
        //location.href = "gbanker://page_wap?url=https://m.g-banker.com/GBankerWebApp/html/pages/mainVenueFourth/";
        setTimeout(function() {
          location.href = "gbanker://page_wap?url=https://app-activity.g-banker.com/html/pages/anActivityPreheat/";
       }, 200);
      }
    },
    goRule(){
         this.$router.push({path: '/rules'});
    },
  },
  beforeMount() {}
};
</script>
<style lang="less"  scoped>
@import "../../../statics/less/base/method.less";
@font-face {
  font-family: "DIN-Bold";
  src: url("../../assets/DIN-Bold.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
}
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.left {
  float: left;
}
.right {
  float: right;
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
.bg-img-common( @file , @width, @height ) {
  .px2rem(width, @width);
  .px2rem(height, @height);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("../../assets/@{file}");
}
.width() {
  .px2rem(width,700);
  margin: 0 auto;
}

.border(@size,@color) {
  @bor: @size / 75 * 1rem;
  border: @bor solid @color;
}
[v-cloak] {
  display: none !important;
}
.index-page {
  background: #044DAE url(./res/kuang.png) repeat ;
  background-size:15px 15px;
  font-family: PingFang-SC-Regular;
  // height: 100%;
  .px2px(font-size,28);
   color: #40404B;
   .top{
      .bg-img("header.png",750,900);
      position: relative;
      .tipText{
        position: absolute;
        right:20px;
        top:44%;
        .text{
          color: #fff;
          .px2px(font-size,24);
          .px2rem(margin-right,19);
          .px2rem(line-height,64);
        }
        .remindButton{
           .bg-img("tip.png",160,64);
           color: #450A2D;
           font-weight: bold;
           box-shadow: 4px 5px 0px #01177E;
          .px2rem(border-radius,32);
          .px2px(font-size,26);
          .px2rem(line-height,64);
          text-align: center;

        }
      }
   }
   .middle{
     position: relative;
     .px2rem(height,387);
     .blueContent{
       position: absolute;
       .px2rem(top,-370);
        .px2rem(right,20);
       background: #021FA3;
       .px2rem(width,700);
       .px2rem(height,760);
       border-radius: 2px;
     }
     .whiteContent{
          position: absolute;
          .px2rem(top,-390);
          .px2rem(right,0);
          background: #fff;
          .px2rem(width,700);
          .px2rem(height,760);
          .px2rem( border-radius,2);
          .px2rem( padding-left,30);
          .px2rem( padding-right,30);
          .px2rem( padding-top,35);
           .whiteTop{
              .bg-img("REWARD.png",321,57);
           }
           .whiteTopText{
                font-weight: bold;
                .px2rem( margin-top,-35);
                .px2px(font-size,28);
                color:#450A2D;
                span{
                  color: #FA4B2F
                }
            }
          .iconAll{
            display: flex;
            align-items:center;
             .px2rem(margin-top,30);
            .iconImg{
               .px2rem(height,120);
              img{
                .px2rem(width,120);
                .px2rem(height,120);
                .px2rem(margin-right,18);
              }
            }
            .iconText{
               .px2px(font-size,28);
               span{
                 font-weight: bold;
                 color: #FA4B2F
               }
            }
          }

       }
   }
   .bottom{
        .bg-img("bottom.png",730,150);
        .px2rem(margin-top,10);
        .px2rem(margin-bottom,20);
        .px2rem(padding-top,40);
        .bottomButton{
           .px2rem(width,200);
           .px2rem(height,70);
           .px2rem(line-height,68);
            margin:0 auto;
           text-align: center;
           color: #fff;
           .px2px(font-size,30);
           background: #021FA3 ;
            border: 2px solid #391543;
          .px2rem(border-radius,36);
        }
   }
 
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .bottom {
       padding-bottom: 60px !important;
  }
}
//iphone Xs Max
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
 .bottom {
      padding-bottom: 60px !important;
  }
}
//iphone XR
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
 .bottom {
     padding-bottom: 60px!important;
  }
}
</style>
