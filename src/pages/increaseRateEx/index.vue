<template>
    <div class="container">
      <div class="banner">
        <div class="record" id="record" @click="gotoRecord($event)">抢购记录</div>
      </div>
      <!-- 切换区域 -->
      <swiper :options="swiperOptionThumbs" class="thumbs" ref="swiperThumbs">
        <swiper-slide class="slide" :class='{"active":index == 0}' v-for="(item,index) in activityInfoLimit" :value="index" :key="index">
          <div>
            <p>{{item.date}}日&nbsp;{{item.BuyTime}}</p>
            <p v-if="item.activityStatus==1">即将开始</p>
            <p v-else-if="item.activityStatus==2">正在抢购</p>
            <p v-else>已抢光</p>
          </div>
        </swiper-slide> 
      </swiper>
      <swiper :options="swiperOptionDetail" class="detail" ref="swiperDetail">
        <swiper-slide class="slide"  v-for="(item,index) in activityInfoLimit" :value="index" :key="index">
          <div class="slide-bg">
            <p class="title">本期限量 {{item.totalAmount}} 元额度</p>
            <ul class="des">
              <li><span class="percent"><b>{{item.annualInterestRate}}<i>%</i></b></span><span>目标年化回报率</span></li>
              <li><span class="date">{{item.duration}}天</span><span>锁定期</span></li>
              <li><span class="money">{{item.limitAmount}}元</span><span>限投金额</span></li>
            </ul>
            <p class="line"></p>
            <p class="tip">
              <span>已有 <i>{{item.followNum}}</i> 人关注</span>
              <span id="understand" @click="gotoProduct(item.annualInterestRate,item.duration,item.limitAmount,$event)">了解产品</span> 
            </p>
            <p class="surplus"  v-if="item.activityStatus==2">剩余{{item.surplusAmount}}元</p>
            <p class="surplus"  v-else-if="item.activityStatus==1">距离开始还有{{item.countDown}}</p>
            <div class="btns">
              <p class="end" v-if="item.activityStatus==4"><span>活动已结束</span></p>
              <p class="empty" v-else-if="item.activityStatus==3">已抢光，请关注下一场</p>
              <p class="begin" v-else-if="item.activityStatus==1 &&item.isWarn=='true'" id="warn"  @click="warnMe($event,item.serverTime,item.activityDate, item.remindStatus,item.remindTitle,index,item.activityDate,item.panicBuyTime)"><span>{{item.remindStatus?'取消提醒':'提醒我'}}</span></p>
              <p class="begin" v-else-if="item.activityStatus==1 &&item.isWarn=='false'" id="start"  @click="gotoStart($event)"><span>即将开始</span></p>
              <p class="buy" v-else-if="item.activityStatus==2" id="buy" @click="gotoBuy(item.planId,$event)">立即抢购</p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="login" v-show="isLogin">提前 <span id="isLogin" @click="callAppLogin($event)">登录</span> 抢购快人一步</div>
      <!-- 活动说明 -->
      <div class="activity-tip">
        <div class="head">活动说明</div>
        <div class="body">
          <p><span>1.</span><span>2019年04月19日-2019年05月06日；</span></p>
          <p><span>2.</span><span>活动期间每日中午12:00抢高息限量产品，每日每个用户只能购买1次，每次额度10000元；</span></p>
          <p><span>3.</span><span>活动标的限量发售，先到先得，到期后还本付息；</span></p>
          <p><span>4.</span><span>黄金钱包对本活动保留最终解释权。</span></p>
        </div>
      </div>
      <!-- 弹窗 -->
      <div class="mask" v-show='maskShowWarn' @touchmove.prevent> 
        <div class="dialog">
          <div class="close" @click="maskShowWarn=false"></div>
          <div class="small-tip">将会在每天 11:57 提醒您参与活动</div>
          <div class="btn-area">
            <p class="warning">
              <span id="warnOnly" @click="warnOnlyOne(maskShowWarnObj,$event)">只提醒一次</span>
              <span id="everyDay" @click="warnEveryDay($event)">每天提醒</span>
            </p>
            </div>
        </div>
      </div>
      <div class="mask" v-show='maskShowLoading' @touchmove.prevent> 
        <img src="./res/loadding.gif" alt="">
      </div> 
      <!-- toast -->
      <div class="opacityMask" v-show="noBuy" @touchmove.prevent>
        <div class="no-buy-toast">暂无抢购记录，下次抢购加油哦~</div>
      </div>
       <div class="opacityMask" v-show="cancelWarn" @touchmove.prevent>
        <div class="cancel-warn-toast">您已取消此日的提醒</div>
      </div>
       <div class="opacityMask" v-show="startToast" @touchmove.prevent>
        <div class="start-toast">抢购将在 12:00 准时开始</div>
      </div>
      
      
    </div>
    
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import User from "../../service/common/User";
import util from "../../utils/tool.js";
import version from "../../utils/appVersion";
// import pageVisibility from '../../commonScript/pageVisibility.js'
import {
  actCode,
  shareCode,
  ActivityHome,
  queryPanicBuyRecord,
  addRemind,
  cancelRemind
} from "../../service/pages/increaseRateEx/service.js";
var tSpeed = 300;
var content =  basePath+"/html/pages/increaseRateOrder/?t=1";
 
var loading = "";
// PageBack.addCb(function(){
//   // console.log('执行app页面回退操作!');
//   location.reload();
// })
export default {
  data() {
    return {
      user: new User(),
      telephone: "",
      sessionId: "",
      isLogin: '',
      index: 0,
      panicBuyList: [], //抢购记录
      activityInfoLimit: [
      ], //活动信息
      depositPromotionList: [], //推荐标的信息
      swiperOptionThumbs: {
        spaceBetween: -5,
        slidesPerView: "auto",
        freeMode: true,
        // observer: true,
        // observerParents: true,
        on: {
          tap: e => {
            var swiperThumbs = this.$refs.swiperThumbs.swiper;
            var swiperDetail = this.$refs.swiperDetail.swiper;
            var clickIndex = swiperThumbs.clickedIndex;
            var clickSlide = "";
            if (typeof clickIndex !== "undefined") {
              clickSlide = swiperThumbs.slides.eq(clickIndex);
              swiperDetail.slideTo(clickIndex, tSpeed);
              clickSlide.addClass("active");
            }
          }
        }
      },
      swiperOptionDetail: {
        watchSlidesProgress: true,
        resistanceRatio: 0,
        // observer: true,
        // observerParents: true,
        on: {
          touchMove: () => {
            var swiperDetail = this.$refs.swiperDetail.swiper;
            var swiperThumbs = this.$refs.swiperThumbs.swiper;
            var progress = swiperDetail.progress;
          },
          transitionStart: () => {
            var swiperDetail = this.$refs.swiperDetail.swiper;
            var activeIndex = swiperDetail.activeIndex;
            var navSwiper = this.$refs.swiperThumbs.swiper;
            var activeSlidePosition = navSwiper.slides[activeIndex].offsetLeft;
            for (var i = 0; i < navSwiper.slides.length; i++) {
              navSwiper.slides.eq(i).removeClass("active");
            }
            navSwiper.slides
              .eq(activeIndex)
              .addClass("active")
              .transition(tSpeed);
            if (activeIndex > 0) {
              navSwiper.slides.eq(activeIndex - 1).removeClass("active");
            }

            //导航居中
            var navActiveSlideLeft = navSwiper.slides[activeIndex].offsetLeft; //activeSlide距左边的距离
            var navSlideWidth =
              parseInt(navSwiper.slides.eq(0).css("width")) - 5 + "px";
            var clientWidth = parseInt(navSwiper.$wrapperEl.css("width")); //Nav的可视宽度
            var navWidth = 0;
            for (var i = 0; i < navSwiper.slides.length; i++) {
              if (i == navSwiper.slides.length - 1) {
                navWidth += parseInt(navSwiper.slides.eq(i).css("width"));
              } else {
                navWidth += parseInt(navSwiper.slides.eq(i).css("width")) - 5;
              }
            }
            navSwiper.setTransition(tSpeed);
            if (
              navActiveSlideLeft <
              (clientWidth - parseInt(navSlideWidth)) / 2
            ) {
              navSwiper.setTranslate(0);
            } else if (
              navActiveSlideLeft >
              navWidth - (parseInt(navSlideWidth) + clientWidth) / 2
            ) {
              navSwiper.setTranslate(clientWidth - navWidth);
            } else {
              navSwiper.setTranslate(
                (clientWidth - parseInt(navSlideWidth)) / 2 - navActiveSlideLeft
              );
            }
          }
        }
      },
      maskShowWarn: false, //提醒弹窗
      maskShowLoading: true, //
      maskLoading: true,
      noBuy: false, //购买toast
      cancelWarn: false, //取消提醒toast
      startToast: false, //开始toast
      countDown: "", //倒计时
      afterFiveMins: "",
      isWarn: "", //即将开始和提醒区分
      maskShowWarnObj: {} //点击提醒存储数据
    };
  },
  beforeMount() {
    window.scrollTo(0, 0);
  },
  created() {},
  mounted() {
    this.version = this.GetQueryString("version");
    sessionProObj.getUserInfo((telephone, sessionId) => {
      this.telephone = telephone;
      this.sessionId = sessionId;
      this.ActivityHome();
      if (this.telephone) {
        this.queryPanicBuyRecord();
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    });
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    //登录
    callAppLogin(e) {
      if(e){
        this.$sa.quick('trackHeatMap', e.currentTarget) 
      }
      this.user.callAppLogin();
    },
    sure() {
      // this.maskAndriod = false;
      //this.maskShowUp = false;
    },
    //点击每个提醒按钮
    warnMe(e,serverTime,
      serverTimeSlice,
      remindStatus,
      title,
      index,
      activityDate,
      panicBuyTime) {

      if(e){ //神策热力图埋点
          this.$sa.quick('trackHeatMap', e.currentTarget) 
      };

      this.warnMeFn(
        serverTime,
        serverTimeSlice,
        remindStatus,
        title,
        index,
        activityDate,
        panicBuyTime
      );
    },
    warnMeFn(
      serverTime,
      serverTimeSlice,
      remindStatus,
      title,
      index,
      activityDate,
      panicBuyTime
    ) {
      var that = this;
      //当前时间  提醒状态  索引
      this.maskShowWarnObj = {
        serverTime: serverTime,
        serverTimeSlice: serverTimeSlice,
        remindStatus: remindStatus,
        index: index,
        title: title,
        activityDate: activityDate,
        panicBuyTime: panicBuyTime
      };
      var startTime = activityDate + " " + panicBuyTime;
      var endTime = util.judgFailTime(startTime, 5);
      //提醒状态 1-已提醒 0-未提醒
      if (remindStatus) {
        //调用取消提醒原生接口--------------------------------------------------------------
        GB.utils.callCustomMethod(
          "removeCalendarEvent",
          {
            title: title,
            startTime: startTime,
            endTime: endTime
          },
          function(responseData) {
            var responseDatas = JSON.parse(responseData);
            if (responseDatas.result) {
              that.cancelWarn = true;
              setTimeout(function() {
                that.cancelWarn = false;
              }, 1500);
              if (that.activityInfoLimit[index].followNum < 1) {
                that.activityInfoLimit[index].followNum = 0;
              } else {
                that.activityInfoLimit[index].followNum =
                  Number(that.activityInfoLimit[index].followNum) - 1;
              }
              that.activityInfoLimit[index].remindStatus = false;
              that.cancelRemind(serverTimeSlice, index);
            }
          }
        );
      } else {
        this.maskShowWarn = true;
      }
    },
    //提醒一次
    warnOnlyOne(maskShowWarnObj,e) {
      var that = this;
      if(e){
        that.$sa.quick('trackHeatMap', e.currentTarget) 
      }
      that.maskShowWarn = false;
      var startTime =
        maskShowWarnObj.activityDate + " " + maskShowWarnObj.panicBuyTime;
      var endTime = util.judgFailTime(startTime, 5);
      var param = {
        title: maskShowWarnObj.title,
        content: content,
        startTime: startTime,
        endTime: endTime,
        remindTime: maskShowWarnObj.activityDate + " 11:57:00"
      };
      //调用Add提醒原生接口--------------------------------------------------------------------
      GB.utils.callCustomMethod("addCalendarEvent", param, function(
        responseData
      ) {
        var responseDatas = JSON.parse(responseData);
        if (responseDatas.result) {
          that.activityInfoLimit[maskShowWarnObj.index].followNum =
            Number(that.activityInfoLimit[maskShowWarnObj.index].followNum) + 1;
          that.activityInfoLimit[maskShowWarnObj.index].remindStatus = true;
          var remindDateArr = [];
          remindDateArr.push(maskShowWarnObj.activityDate);
          that.addRemind(remindDateArr, maskShowWarnObj.index);
        }
      });
    },
    //每天提醒
    warnEveryDay(e) {
      var that = this;
      if(e){
        that.$sa.quick('trackHeatMap', e.currentTarget) 
      }
      this.maskShowWarn = false;
      var warnArr = [];
      this.activityInfoLimit.forEach(function(item, index) {
        var actTime = (item.activityDate + " " + item.panicBuyTime).replace(
          /-/g,
          "/"
        ); //2018-11-11 12:00:00
        var endTime = new Date(actTime);
        var serverTime = new Date(item.serverTime.replace(/-/g, "/"));
        var t = endTime.getTime() - serverTime.getTime();
        if (t > 0) {
          warnArr.push(item);
        }
      });
      var remindDateArr = [];
      warnArr.forEach(function(item, index) {
        var param = {
          title: item.remindTitle,
          content: content,
          startTime: item.activityDate + " " + item.panicBuyTime,
          endTime: item.afterFiveMins,
          remindTime: item.activityDate + " 11:57:00"
        };
        remindDateArr.push(item.activityDate);
        //调用Add提醒原生接口---------------------------------------------------------------------
        GB.utils.callCustomMethod("addCalendarEvent", param, function(
          responseData
        ) {
          var responseDatas = JSON.parse(responseData);
          if (responseDatas.result) {
            item.remindStatus = true;
            item.followNum = Number(item.followNum) + 1;
            that.addRemind(remindDateArr, "");
          }
        });
      });
    },
    ActivityHome() {
      var that = this;
      var tabIndex = "";
      var activityInfoLimit = [];
      var data = {
        actCode: actCode,
        telephone: this.telephone,
        sessionId: this.sessionId
      };
      ActivityHome(data).then(res => {
        var data = res.data;
        var serverTimeInit = util.timeTransfer(data.serverTime);
        if (+data.code == 0) {
          this.maskShowLoading = false;
          activityInfoLimit = data.data.activityInfoLimit;
          var firstDate = activityInfoLimit[0].activityDate.replace(/-/g, "/");
          var lastDate = activityInfoLimit[
            activityInfoLimit.length - 1
          ].activityDate.replace(/-/g, "/");
          activityInfoLimit.forEach(function(item, index) {
            item.annualInterestRate = (item.annualInterestRate / 100).toFixed(
              1
            );
            item.totalAmount = util.formatNumber(item.totalAmount / 100);
            item.limitAmount = util.formatNumber(item.limitAmount / 100);
            item.surplusAmount = util.formatNumber(item.surplusAmount / 100);
            activityInfoLimit[index].BuyTime = item.panicBuyTime.slice(0, 5);
            activityInfoLimit[index].serverTime = serverTimeInit;
            var actTime = item.applyStartDate.replace(/-/g, "/"); //2018-11-11 12:00:00
            var endTime = new Date(actTime);
            var serverTime = new Date(item.serverTime.replace(/-/g, "/"));
            var t = endTime.getTime() - serverTime.getTime();
            var day = Math.floor(t / 86400000);
            //判断倒计时天数  小于一天开始倒计时
            if (day <= 0 && item.activityStatus == 1) {
              that.countDowm(actTime, serverTime, index);
            } else {
              that.$set(activityInfoLimit[index], "countDown", day + "天");
              that.$set(activityInfoLimit[index], "isWarn", "true");
            }
            activityInfoLimit[index].date = item.activityDate.slice(8, 10);
            // activityInfoLimit[index].serverTimeSlice = item.serverTime.slice(
            //   0,
            //   10
            // ); //2018-11-11
             activityInfoLimit[index].serverTimeSlice = item.serverTime.slice(
              0,
              10
            ); //2018-11-11
            //判断初始化选项卡状态
            var cur = new Date(
                item.serverTimeSlice.replace(/-/g, "/")
              ).getTime(),
              act = new Date(item.activityDate.replace(/-/g, "/")).getTime();
            if (cur < new Date(firstDate).getTime()) {
              //所有活动未开始 默认第一个
              tabIndex = 0;
            } else if (cur == act) {
              //当天活动未开始 默认当天
              if (item.activityStatus == 3 || item.activityStatus == 4) {
                //当天活动已抢光
                if (index != activityInfoLimit.length - 1) {
                  tabIndex = ++index;
                }
              } else {
                tabIndex = index;
              }
            } else if (cur > new Date(lastDate) * 1) {
              tabIndex = activityInfoLimit.length - 1;
            }
             var afterFiveMins = util.judgFailTime(item.applyStartDate, 5);
              activityInfoLimit[index].afterFiveMins = afterFiveMins;
              //调用查询提醒原生接口-----------------------------------------------------------------------------
              clientInit.done(function() {
                GB.utils.callCustomMethod(
                  "queryCalendarEvent",
                  {
                    title: item.remindTitle,
                    content: content,
                    startTime: actTime,
                    endTime: item.afterFiveMins,
                    remindTime: item.activityDate + " 11:57:00"
                  },
                  function(responseData) {
                    var responseDatas = JSON.parse(responseData);
                    activityInfoLimit[index].remindStatus =
                      responseDatas.result;
                  }
                );
              });

            // if (version.getVersion(that.version, "5.6.4")) {
            //   var afterFiveMins = util.judgFailTime(item.applyStartDate, 5);
            //   activityInfoLimit[index].afterFiveMins = afterFiveMins;
            //   //调用查询提醒原生接口-----------------------------------------------------------------------------
            //   clientInit.done(function() {
            //     GB.utils.callCustomMethod(
            //       "queryCalendarEvent",
            //       {
            //         title: item.remindTitle,
            //         content: content,
            //         startTime: actTime,
            //         endTime: item.afterFiveMins,
            //         remindTime: item.activityDate + " 11:57:00"
            //       },
            //       function(responseData) {
            //         var responseDatas = JSON.parse(responseData);
            //         activityInfoLimit[index].remindStatus =
            //           responseDatas.result;
            //       }
            //     );
            //   });
            // } else {
            //   activityInfoLimit[index].remindStatus = false;
            // }
          });
          this.activityInfoLimit = activityInfoLimit;
          this.depositPromotionList = data.data.depositPromotionList;
          that.changeSwiper(tabIndex);
        } else {
          if (data.msg) {
            GB.utils.htoast(data.msg);
          }
        }
      });
    },
    changeSwiper(index) {
      this.index = index;
      this.$refs.swiperDetail.swiper.slideTo(index, 0, false);
    },
    queryPanicBuyRecord() {
      var data = {
        actCode: actCode,
        telephone: this.telephone,
        sessionId: this.sessionId
      };
      queryPanicBuyRecord(data).then(res => {
        var data = res.data;
        if (+data.code == 0) {
          this.panicBuyList = data.data.panicBuyList.panicBuyList;
        } else {
          if (data.msg) {
            GB.utils.htoast(data.msg);
          }
        }
      });
    },
    //添加提醒
    addRemind(remindDateArr, index) {
      var that = this;
      var data = {
        actCode: actCode,
        telephone: that.telephone,
        sessionId: that.sessionId,
        remindDateArray: remindDateArr
      };
      addRemind(data).then(res => {
        var data = res.data;
        if (+data.code == 0) {
        } else {
          if (data.msg) {
            GB.utils.htoast(data.msg);
          }
        }
      });
    },
    //取消提醒
    cancelRemind(remindDate, index) {
      var that = this;
      var data = {
        actCode: actCode,
        telephone: this.telephone,
        sessionId: this.sessionId,
        remindDate: remindDate
      };
      cancelRemind(data).then(res => {
        var data = res.data;
        if (+data.code == 0) {
        } else {
          if (data.msg) {
            GB.utils.htoast(data.msg);
          }
        }
      });
    },
    //去抢购
    gotoBuy(depositType,e) {
      if(e){
        this.$sa.quick('trackHeatMap', e.currentTarget) 
      }
      if (!this.telephone) {
        this.callAppLogin();
      } else {
        //去下单页面 调客户端
        GB.utils.callCustomMethod("buyDepositPlan", {
          targetNo: depositType,
          actCode: actCode
        });
      }
    },
    gotoStart(e) {
      var that = this;
      if(e){
        that.$sa.quick('trackHeatMap', e.currentTarget) 
      }else
      this.startToast = true;
      setTimeout(function() {
        that.startToast = false;
      }, 1500);
    },
    // gotoVenue() {
    //   location.href = basePath + "/html/pages/mainVenueFourth/";
    // },
    //跳转其他热门产品
    gotoPro(depositWapUrl, index) {
      location.href = depositWapUrl;
    },
    //跳转抢购记录
    gotoRecord(e) {
      var that = this;
      if(e){
         that.$sa.quick('trackHeatMap', e.currentTarget) 
      }
      if (!this.telephone) {
        this.callAppLogin();
      } else {
        if (that.panicBuyList.length == 0) {
          that.noBuy = true;
          setTimeout(function() {
            that.noBuy = false;
          }, 1500);
        } else {
          location.href =
            basePath +
            "/html/pages/increaseRateExRecord/?telephone=" +
            this.telephone +
            "&sessionId=" +
            this.sessionId;
        }
      }
    },

    //跳转产品详情
    gotoProduct(annualInterestRate, duration, limitAmount,e) {
      if(e){
        this.$sa.quick('trackHeatMap', e.currentTarget) 
      }
      location.href =
        basePath +
        "/html/pages/increaseRateExPro/?annualInterestRate=" +
        annualInterestRate +
        "&duration=" +
        duration +
        "&limitAmount=" +
        limitAmount +
        "&version=" +
        this.version;
    },
    //倒计时
    countDowm(end, cur, index) {
      var format = "";
      var nowTime = new Date(cur);
      var interval = "";
      clearInterval(interval);
      interval = setInterval(() => {
        var endTime = new Date(end);
        var t = endTime.getTime() - nowTime.getTime();
        var isWarn = "";
        if (t > 0) {
          var day = Math.floor(t / 86400000);
          var hour = Math.floor((t / 3600000) % 24);
          var min = Math.floor((t / 60000) % 60);
          var sec = Math.floor((t / 1000) % 60);
          hour = hour < 10 ? "0" + hour : hour;
          min = min < 10 ? "0" + min : min;
          sec = sec < 10 ? "0" + sec : sec;
          t > 300000 ? (isWarn = "true") : (isWarn = "false");
          if (day <= 0 && hour > 0) {
            format = `${hour}:${min}:${sec}`;
          } else if (day <= 0 && hour <= 0) {
            format = `${min}:${sec}`;
          }
          this.$set(this.activityInfoLimit[index], "isWarn", isWarn);
          this.$set(this.activityInfoLimit[index], "countDown", format);
          nowTime.setSeconds(nowTime.getSeconds() + 1);
        } else {
          clearInterval(interval);
          this.activityInfoLimit[index].activityStatus = 2;
        }
      }, 1000);
    },
    GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
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
  background-image: linear-gradient(-180deg, #fedf3a 0%, #ff5c00 100%);
  height: auto;
  min-height: 100%;
  .banner {
    position: relative;
    .bg-img("banner.png", 750, 401);
    .record {
      position: absolute;
      color: #fff;
      .px2rem(top, 30);
      right: 0;
      .px2rem(height,64);
      .px2rem(width,153);
      .px2rem(line-height,64);
      text-align: center;
      .px2rem(border-top-left-radius,64);
      .px2rem( border-bottom-left-radius,64);
      background-image: linear-gradient(
        -180deg,
        rgba(255, 197, 14, 0.8) 0%,
        rgba(255, 147, 6, 0.8) 77%
      );
    }
  }
  .thumbs {
    // .px2rem(height, 120) !important;
    // .px2rem(margin-left,-28);

    box-sizing: border-box;
    // .margin(10, 0, 10, 0);
    // .px2rem(margin-top, 10);
    .px2rem(margin-bottom, 10);
    .swiper-slide {
      .px2px(width, 224) !important;
      .px2rem(height, 113) !important;
      .bg-img("Rectangle.png", 224, 113);
      div {
        width: 100%;
        .px2rem(height,100);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      div p {
        color: #FF6200;
        opacity: 0.4;
        varter-spacing: 1px;
        text-align: center;
      }
      div p:nth-child(1) {
        .px2rem(font-size, 28);
        .px2px(line-height, 34);
        // .px2rem(margin-top, 15);
      }
      div p:nth-child(2) {
        .px2rem(font-size, 20);
        .px2px(line-height, 28);
      }
    }
    .active {
      .bg-img("Rectangle-light.png", 224, 113);
      div p {
        color: #fff;
        varter-spacing: 1px;
        text-align: center;
        opacity: 1;
      }
      div p:nth-child(1) {
        .px2rem(font-size, 28);
        .px2px(line-height, 34);
        // .px2rem(margin-top, 15);
      }
      div p:nth-child(2) {
        .px2rem(font-size, 20);
        .px2px(line-height, 28);
      }
    }
  }
  .detail {
    width: 100%;
    .px2rem(height, 636) !important;
    //background: #000443;
    box-sizing: border-box;
    // .px2rem(margin-top, 15);
    .swiper-slide {
      width: 100%;
      .slide-bg {
        .px2rem(width, 732);
        .px2rem(height, 636);
        margin: 0 auto;
        .bg-img("tab-detail.png", 732, 636);
        text-align: center;
        .px2rem(padding-top,40);
        box-sizing: border-box;
        .title {
          background-image: linear-gradient(-180deg, #ffb154 32%, #ff924f 100%);
          .px2rem(width,614);
          margin: 0 auto;
          .px2rem(height, 80);
          .px2rem(line-height, 80);
          color: #ffffff;
          .px2rem(font-size, 28);
          font-weight: bold;
          .px2rem(border-top-left-radius,30);
          .px2rem(border-top-right-radius,30);
        }
        .des {
          .px2rem(width, 630);
          // .px2rem(height, 170);
          margin: 0 auto;
          .px2rem(margin-top, 49);
          .padding(20, 20, 20, 20);
          padding-bottom: 0;
          display: flex;
          li:nth-child(1) {
            width: 36%;
            text-align: left;
          }
          li:nth-child(2),
          li:nth-child(3) {
            flex: 1;
          }
          li {
            color: #333333;
            text-align: center;
            span {
              display: block;
              margin: 0 auto;
            }
            span:nth-child(1) {
              .px2rem(height, 50);
              // font-weight: bold;
              .px2rem(margin-top, 24);
            }
            span:nth-child(2) {
              bottom: 0;
              .px2rem(font-size, 24);
              color: #666666;
            }
            span.percent {
              position: relative;
              color: #ff7100;
              // .px2rem(font-size, 32);
              b {
                position: absolute;
                .px2rem(font-size, 64);
                .px2rem(bottom, -12);
                .px2rem(right, 0);
                .px2rem(left, 0);
               // text-align: center;
                i {
                  .px2rem(font-size, 32);
                  .px2rem(bottom, -12);
                  .px2rem(right, -10);
                }
              }
            }
            .date,
            .money {
              .px2rem(font-size, 32);
            }
          }
        }
        .line {
          .px2rem(width,610);
          height: 1px;
          border: 1px dashed#EBEBEB;
          margin: 0 auto;
          .px2rem(margin-top,36);
        }
        .tip {
          .px2rem(width, 614);
          // .px2rem(height, 33);
          margin: 0 auto;
          .px2rem(margin-top, 22);
          span {
            display: block;
            color: #9b9b9b;
            .px2rem(font-size, 26);
          }
          span:nth-child(1) {
            float: left;
            & > i {
              font-style: normal;
              color: #ff8133;
            }
          }
          span:nth-child(2) {
            float: right;
            position: relative;
            .px2rem(right, 32);
          }
          span:nth-child(2)::after {
            position: absolute;
            content: "";
            .bg-img("arrow-right.png", 14, 12);
            .px2rem(right, -24);
            .px2rem(bottom, 12);
          }
          &:after {
            content: "";
            display: block;
            height: 0;
            clear: both;
          }
        }
        .surplus {
          text-align: center;
          color: #ffffff;
          .px2px(font-size,26);
          .px2rem(margin-top,50);
        }
        .btns {
          .px2rem(width, 600);
          .px2rem(height, 90);
          margin: 0 auto;
          .px2rem(margin-top, 15);
          p {
            .px2rem(line-height, 90);
            varter-spacing: 1px;
            .px2px(border-radius, 10);
            color: #ffffff;
            text-align: center;
            .px2rem(font-size, 32);
          }
          p.end {
            background: #ff826c;
            box-shadow: 0 1px 15px 0 rgba(230, 0, 0, 0.5),
              inset 0 0 6px 0 rgba(255, 255, 255, 0.29);
            .px2rem(border-radius,50);
            .px2rem(margin-top,70);
            span {
              position: relative;
            }
          }
          p.empty {
            background: #ff826c;
            box-shadow: 0 1px 15px 0 rgba(230, 0, 0, 0.5),
              inset 0 0 6px 0 rgba(255, 255, 255, 0.29);
            .px2rem(border-radius,50);
            .px2rem(margin-top,70);
          }
          p.buy {
            background-image: linear-gradient(270deg, #ff8a00 0%, #ffd435 100%);
            box-shadow: 0 1px 15px 0 rgba(230, 0, 0, 0.5),
              inset 0 0 6px 0 rgba(255, 255, 255, 0.29);
            // border-radius: 50px;
            .px2rem(border-radius,50);
            font-weight: bold;
            .px2rem(font-size, 32);
          }
          p.begin,
          p.warn {
            .px2rem(font-size, 28);
            background-image: linear-gradient(
              270deg,
              rgba(255, 138, 0, 0.6) 0%,
              rgba(255, 212, 53, 0.6) 100%
            );
            box-shadow: 0 1px 15px 0 rgba(230, 0, 0, 0.5),
              inset 0 0 6px 0 rgba(255, 255, 255, 0.29);
            .px2rem(border-radius,50);
            span {
              font-weight: bold;
              .px2rem(font-size, 32);
            }
          }
          p.warn span,
          p.buy span {
            varter-spacing: 1.17px;
            font-weight: normal;
            .px2rem(font-size, 28);
          }
        }
      }
    }
  }
  .login {
    text-align: center;
    color: #ffffff;
    .px2rem(font-size, 24);
    .px2rem(margin-top,28);
    span {
      color: #f8e71c;
    }
  }
  .activity-tip {
    .px2rem(width, 658);
    // .px2rem(height, 490);
    height: auto;
    color: #fdffc7;
    .px2rem(font-size, 28);
    margin: 0 auto;
    .px2rem(margin-top, 58);
    .head {
      position: relative;
      .padding(47, 15, 33, 15);
      box-sizing: border-box;
      text-align: center;
      .px2px(font-size,28);
      font-weight:bold;
    }
    .head::before,
    .head::after {
      .px2rem(width, 250);
      height: 1px;
      position: absolute;
      content: "";
      border-top: 1px dashed #FFAE66;
    }
    .head::before {
      left: 0;
      .px2rem(top, 63);
    }
    .head::after {
      right: 0;
      .px2rem(top, 63);
    }
    .body {
      .px2px(font-size,24);
      .padding(0, 9, 60, 9);
      p {
        .px2rem(margin-top, 20);
        display: flex;

        span {
          display: block;
        }
        span:last-child {
          flex: 1;
          margin-left: 5px;
        }
      }
    }
  }
  // .other-proInfo {
  //   .px2rem(margin-top, 78);
  //   .px2rem(padding-bottom, 180);
  //   .title {
  //     .bg-img("otherPro.png", 320, 90);
  //     margin: 0 auto;
  //   }
  //   .pro-type {
  //     .px2rem(width, 600);
  //     .px2rem(height, 181);
  //     .px2rem(line-height, 192);
  //     margin: 0 auto;
  //     .px2rem(font-size, 36);
  //     color: #ffffff;
  //     varter-spacing: -0.87px;
  //     text-align: center;
  //   }
  //   .pro-one {
  //     .bg-img("pro1.png", 600, 181);
  //     .px2rem(margin-top, 40);
  //     text-shadow: 0 0 8px #ff4008;
  //   }
  //   .pro-two {
  //     .bg-img("pro2.png", 600, 181);
  //     .px2rem(margin-top, 44);
  //     text-shadow: 0 0 8px #337ffc;
  //   }
  //   .pro-three {
  //     .bg-img("pro3.png", 600, 181);
  //     .px2rem(margin-top, 44);
  //     text-shadow: 0 0 8px #ef58fe;
  //   }
  // }
  .mask {
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1000;
    .dialog {
      .px2rem(width, 600);
      .px2rem(height, 320);
      background: #fff;
      margin: 0 auto;
      .px2rem(margin-top, 367);
      .px2rem(border-radius, 20);
      text-align: center;
      position: relative;
      .close {
        position: absolute;
        .bg-img("cancel-gray.png", 40, 40);
        .px2rem(top, 22);
        .px2rem(right, 22);
      }
      .small-tip {
        color: #333333;
        varter-spacing: 0.68px;
        .px2rem(font-size, 28);
        .px2rem(padding-top, 85);
      }
      .btn-area {
        p {
          .px2rem(height, 70);
          .px2rem(line-height, 70);
          .px2rem(border-radius, 100);
          .px2rem(font-size, 28);
          text-align: center;
          varter-spacing: -0.68px;
        }
        p.up {
          .px2rem(width, 300);
          background: #ff5d21;
          color: #ffffff;
          margin: 0 auto;
          .px2rem(margin-top, 60);
        }
        p.warning {
          .px2rem(margin-top, 60);
          span {
            display: inline-block;
            .px2rem(width, 220);
            border: 1px solid #ff5d21;
            .px2rem(border-radius, 35);
          }
          span:nth-child(1) {
            background: #ffffff;
            color: #ff5d22;
            .px2rem(margin-right, 15);
          }
          span:nth-child(2) {
            background-image: linear-gradient(
              180deg,
              #ff6749 10%,
              #ff411c 100%
            );
            box-shadow: 0 0 5px 0 rgba(255, 64, 8, 0.3);
            background: #ff5d21;
            color: #ffffff;
            .px2rem(margin-left, 15);
          }
        }
      }
    }
  }
  // .maskAndriod {
  //   .dialog {
  //     .px2rem(height, 380) !important;
  //   }
  // }
  .mask img {
    .px2rem(width,42);
    .px2rem(height,42);
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .opacityMask {
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    background: rgba(28, 36, 51, 0);
    z-index: 1000;
    .no-buy-toast,
    .cancel-warn-toast,
    .start-toast {
      position: absolute;
      .px2rem(height, 70);
      .px2rem(line-height, 70);
      background: rgba(28, 36, 51, 0.9);
      color: #fff;
      .px2rem(font-size, 24);
      .px2rem(top, 546);
      .px2rem(left, 0);
      .px2rem(right, 0);
      margin: 0 auto;
      varter-spacing: 0.5px;
      text-align: center;
      z-index: 1000;
    }
    .no-buy-toast {
      .px2rem(width, 446);
    }
    .cancel-warn-toast {
      .px2rem(width, 300);
    }
    .start-toast {
      .px2rem(width, 355);
    }
  }
}
</style>