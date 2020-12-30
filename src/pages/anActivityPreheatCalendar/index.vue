<template>
    <div class="index-page" v-cloak>
      <header class="top">
          <div class="rules" @click="goRule()">活动细则</div>
          <div class="activity-tips">
            <div class="activity-tips-content">
                <div class="not-begun" v-if='isLiveTime==1'>
                    <div class="not-begun-text">
                        <!-- <p>答题活动已结束</p> -->
                        <p>直播抽奖即将开始…</p>
                    </div>
                </div>
                <!-- 直播进行中 -->
                <div class="not-begun-ing" v-else-if='isLiveTime==2' @click="gotoPage">
                    <div class="mask">
                        <img src="./res/play.png" alt="" class="play">
                        <p class="tip-text">直播抽奖中</p>
                    </div>
                </div>
                <!-- 直播结束 -->
                <div class="not-begun-ing" v-else-if='isLiveTime==3' @click="gotoPage">
                    <div class="mask">
                        <img src="./res/play.png" alt="" class="play">
                        <p class="tip-text">回顾直播现场</p>
                    </div>
                </div>
              <div class="activity-tips-bottom" v-if='isLiveTime==1'>
                <span class="activity-tips-bottom-text">直播开始时间：{{startTime||'6月20日 9:00'}}</span>
                <span class="activity-tips-bottom-btn" @click="gotoPage">去看直播</span>
              </div>
            </div>
          </div>
      </header>
      <div class="bottom"></div>     
    </div>
</template>
<script>
import User from "../../service/common/User";
import { openApp } from "../../commonScript/download.js";
import {getLiveBroadcastTime} from '../../service/pages/apollo/service.js'
import moment from 'moment';
export default {
  data() {
    return {
      user: new User(),
      isLiveTime:-1,//1 直播未开始  2直播中  3直播结束
      startTime:null,
    }
  },
  watch: {},
  filters: {
   
  },
  components: {},
  mounted() {
    this.getLiveBroadcastTime();
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
        //  this.$router.push({path: '/rules'});
        location.href = basePath + "/html/pages/anActivityPreheatRules/";
    },
     /**
     * 获取直播开始结束时间
     */
    getLiveBroadcastTime(){
        let that = this
        let param = {}
        getLiveBroadcastTime().then(res=>{
            let resData = res.data;
            if(resData.code=='0000'){
                that.startTime = moment(resData.data.startTime).format('MM月DD日 HH:mm')
                console.log( that.startTime)
                let nowTime = Date.parse(new Date());//当前时间
                let begintime = Date.parse(new Date(resData.data.startTime.replace(/-/g, "/"))); //直播开始时间
                let endtime = Date.parse(new Date(resData.data.endTime .replace(/-/g, "/")));   // 直播结束时间
                let date3 = endtime - begintime;
                if(nowTime<begintime){//直播未开始
                    that.isLiveTime = 1;
                }else if(nowTime>endtime){//直播已经结束
                    that.isLiveTime = 3;
                }else{//直播进行中
                    that.isLiveTime = 2;
                }
            }else{
                GB.utils.htoast(resData.msg);
            }
        })
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
.radius2(){
    .px2rem(border-radius,2);
}
.borderWidth(){
    .px2rem(border-width,4);
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
  .px2rem(padding-bottom,46);
  min-height: 100%;
  // height: 100%;
  .px2px(font-size,28);
   color: #40404B;
   .top{
      .bg-img("header.png",750,900);
      .pr();
      .rules{
          box-sizing: border-box;
          background: #021FA3;
          border: 4px solid #391543;
          .px2rem(width,210);
          .px2rem(height,70);
          .px2rem(border-width,4);
          .px2rem( border-top-left-radius,35);
          .px2rem( border-bottom-left-radius,35);
          .pa();
          .px2rem(top,380);
          right: 0;
          color: #FFFFFF;
          display: flex;
          justify-content: center;
          align-items: center;
      }
      // 活动提示
      .activity-tips{
        .px2rem(width,670);
        // .px2rem(height,530);
        background: #021FA3;
        .px2rem(border-radius,2);
        .pa();
        .px2rem(top,468);
        .px2rem(left,40);
        .activity-tips-content{
          .px2rem(width,630);
          // .px2rem(height,490);
          .px2rem(margin-top,20);
          .px2rem(margin-left,20);
          .px2rem(margin-bottom,20);
          .px2rem(padding-left,16);
          .px2rem(padding-right,16);
          .px2rem(padding-top,20);
          .px2rem(padding-bottom,20);
          background: #FFFFFF;
          border: 4px solid #391543;
          .px2rem(border-width,4);
          .px2rem(border-radius,2);
          .not-begun{
                .px2rem(width,590);
                .px2rem(height,326);
                .px2rem(margin-bottom,24);
                box-sizing: border-box;
                background: #021FA3;
                border: 4px solid #391543;
                .borderWidth();
                .px2rem(border-radius,10);
                text-align: center;
                .pr();
                img{
                    .px2rem(width,184);
                    .px2rem(height,184);
                    .px2rem(margin-top,60);
                }
                .not-begun-text{
                    .pa();
                    top: 50%;
                    left:50%;
                    transform: translate(-50%,-50%);
                    .bg-img('no-start.png',590,326);
                    width: 100%;
                    .px2rem(line-height,326);
                    p{
                        .px2rem(font-size,32);
                        // .px2rem(line-height,42);
                        color: #FFFFFF;
                        letter-spacing: 1px;
                    }
                }
            }
            .not-begun-ing{
                .px2rem(width,590);
                .px2rem(height,326);
                .px2rem(margin-bottom,24);
                // .px2rem(border-radius,10);
                // border: 4px solid #391543;
                // .borderWidth();
                .bg-img('zhiboing.png',590,326);
                box-sizing: border-box;
                .mask{
                    width:100%;
                    height: 100%;
                    background: rgba(0,0,0,0.6);
                    .px2rem(border-radius,10);
                    text-align: center;
                    .play{
                        .px2rem(width,80);
                        .px2rem(height,80);
                        .px2rem(margin-top,96);
                        .px2rem(margin-bottom,20);
                        vertical-align: middle;
                    }
                    .tip-text{
                        .px2rem(font-size,32);
                        .px2rem(line-height,42);
                        color: #FFFFFF;
                        letter-spacing: 2px;
                        text-align: center;
                    }
                }
            }
        //   .activity-tips-top{
        //     .px2rem(width,590);
        //     .px2rem(height,326);
        //     .px2rem(margin-bottom,24);
        //     background: #021FA3;
        //     border: 4px solid #391543;
        //     .px2rem(border-width,4);
        //     .px2rem(border-radius,10);
        //     text-align: center;
        //     .pr();
        //     .activity-tips-top-img{
        //       .px2rem(width,184);
        //       .px2rem(height,184);
        //       .px2rem(margin-top,60);
        //     }
        //     .activity-tips-top-text{
        //       .pa();
        //       top: 50%;
        //       left: 50%;
        //       transform: translate(-50%,-50%);
        //       width: 100%;
        //       p{
        //         .px2rem(font-size,32);
        //         .px2rem(line-height,42);
        //         color: #FFFFFF;
        //         letter-spacing: 1px;
        //         text-align: center;
        //       }
        //     }
        //   }
          .activity-tips-bottom{
            .px2rem(font-size,26);
            .px2rem(padding-left,10);
            .px2rem(padding-right,10);
            display: flex;
            align-items: center;
            font-weight: 700;
            .activity-tips-bottom-text{
              color: #391543;
              margin-right: auto;
            }
            .activity-tips-bottom-btn{
              .bg-img('seeTv.png',178,72);
              color: #450A2D;
              letter-spacing: 1.37px;
              text-align: center;
              .px2rem(line-height,66);
            }
          }
        }
      }
   }
   .bottom{
        .bg-img("bottom.png",726,136);
        .px2rem(margin-top,136);
        // .px2rem(margin-bottom,45);
		    .px2rem(margin-left,12);
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
