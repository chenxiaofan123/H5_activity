<template>
    <div class="container">
       <header>
         <p @click="gotoRecord($event)">抢购记录</p>
       </header>
       <article>
         <!-- 时间滑动区域 start-->
        <swiper :options="swiperOptionThumbs" class="date-order" ref="swiperThumbs">
         <swiper-slide class="slide" :class='{"checked":index == 0}'  v-for="(item,index) in activityInfoLimit" :value="index" :key="index">
            <p>{{item.date}}日&nbsp;{{item.BuyTime}}</p>
            <p v-if="item.activityStatus==1">即将开始</p>
            <p v-else-if="item.activityStatus==2">正在抢购</p>
            <p v-else>已抢光</p>
         </swiper-slide> 
         </swiper>
          <!-- 时间滑动区域 end-->

          <!-- 抢标展示区域 start -->
          <swiper :options="swiperOptionDetail" class="detail" ref="swiperDetail">
           <swiper-slide class="slide"  v-for="(item,index) in activityInfoLimit" :value="index" :key="index">
             <div class="bidContent">
              <p class="totalMoney">本期限量  <span>{{item.totalAmount}}</span>元额度</p>
              <div class="bid-detail">
                <div>
                  <p>{{item.annualInterestRate}}<span>%</span></p>
                  <p>目标年化回报率</p>
                </div>
                <div>
                  <p>{{item.duration}}<span>天</span></p>
                  <p>锁定期</p>
                </div>
                <div>
                  <p>{{item.limitAmount}}<span>元</span></p>
                  <p>限投金额</p>
                </div>
              </div>
              <div class="bid-buy">
                <span>已有 <i>{{item.followNum}}</i> 人关注</span>
                <p  @click="gotoProduct(item.annualInterestRate,item.duration,item.limitAmount,$event)"><span>了解产品</span><span></span></p>
              </div>
              <p class="surplus" v-if="item.activityStatus==2">剩余 <span>{{item.surplusAmount}}</span>元</p>
              <p class="surplus"  v-else-if="item.activityStatus==1">距离开始还有<span>{{item.countDown}}</span></p>
             <!-- button部分 -->
              <p class="noclickBtn" v-if="item.activityStatus==4">活动已结束</p>
              <p class="noclickBtn" v-else-if="item.activityStatus==3">已抢光，请关注下一场</p>
              <p class="remindBtn" v-else-if="item.activityStatus==1 &&item.isWarn=='true'" id="warn"  @click="warnMe($event,item.serverTime,item.activityDate, item.remindStatus,item.remindTitle,index,item.activityDate,item.panicBuyTime)">{{item.remindStatus?'取消提醒':'提醒我'}}</p>
              <p class="remindBtn" v-else-if="item.activityStatus==1 &&item.isWarn=='false'" id="start"  @click="gotoStart($event)">即将开始</p>
              <p class="btn" v-else-if="item.activityStatus==2" id="buy" @click="gotoBuy(item.planId,$event)">立即抢购</p>
             </div>
           </swiper-slide>
          </swiper>  
         <!-- 抢标展示区域 end -->
         <p class="loginTips"  v-show="isLogin">提前<i  @click="callAppLogin($event)">登录</i>抢购快人一步</p>
         <!-- 热门推荐 start-->
         <div class="hot-recommend">
            <p class="title">热门推荐</p>
            <div class="eval" v-for="(item,index) in depositPromotionList" @click="gotoPro(item.depositWapUrl,index)" :key="index">
              <div class="_left">
                <div>
                  <p>{{item.rateText}}</p>
                  <p>目标年化回报率</p>
                </div>
                <div>
                  <p>{{item.productDuration}}</p>
                  <p>锁定期</p>
                </div>
              </div>
              <div class="_right">
                <span>抢购</span>
                <span class="right-icon"></span>
              </div>
            </div>
         </div>
         <!-- 热门推荐 end-->
         <!-- 活动说明 start-->
         <div class="activity-tip">
          <div class="head">活动说明</div>
          <div class="body">
           <p><span>1.</span><span>活动时间：2019年05月16日 -2019年05月27日；</span></p>
           <p><span>2.</span><span>活动期间每日中午12:00发售30天高息限量产品，每期限量300万元，先到先得，抢完为止；</span></p>
           <p><span>3.</span><span>30天高息限量产品每日每个用户只能购买1次，每次10000元；</span></p>
           <p><span>4.</span><span>活动期间其他加息产品与高息限量产品同享，且不限购买额度；</span></p>
           <p><span>5.</span><span>加息产品不与优惠券同享。</span></p>
          </div>
         </div>
          <!-- 活动说明 end-->
          <!-- 弹窗 -->
         <div class="mask" v-show='maskShowWarn' @touchmove.prevent> 
           <div class="dialog">
            <div class="close" @click="maskShowWarn=false"></div>
            <div class="small-tip">将会在每天 <span>11:57</span> 提醒您参与活动</div>
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
       </article>
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
} from "../../service/pages/increaseRateEx518/service.js";
var tSpeed = 300;
var content = basePath + "/html/pages/increaseRateOrder518/?t=1";

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
      isLogin: "",
      index: 0,
      panicBuyList: [], //抢购记录
      activityInfoLimit: [], //活动信息
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
              clickSlide.addClass("checked");
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
              navSwiper.slides.eq(i).removeClass("checked");
            }
            navSwiper.slides
              .eq(activeIndex)
              .addClass("checked")
              .transition(tSpeed);
            if (activeIndex > 0) {
              navSwiper.slides.eq(activeIndex - 1).removeClass("checked");
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
      if (e) {
        this.$sa.quick("trackHeatMap", e.currentTarget);
      }
      this.user.callAppLogin();
    },
    sure() {
      // this.maskAndriod = false;
      //this.maskShowUp = false;
    },
    //点击每个提醒按钮
    warnMe(
      e,
      serverTime,
      serverTimeSlice,
      remindStatus,
      title,
      index,
      activityDate,
      panicBuyTime
    ) {
      if (e) {
        //神策热力图埋点
        this.$sa.quick("trackHeatMap", e.currentTarget);
      }

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
    warnOnlyOne(maskShowWarnObj, e) {
      var that = this;
      if (e) {
        that.$sa.quick("trackHeatMap", e.currentTarget);
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
      if (e) {
        that.$sa.quick("trackHeatMap", e.currentTarget);
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
                  activityInfoLimit[index].remindStatus = responseDatas.result;
                }
              );
            });
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
    gotoBuy(depositType, e) {
      if (e) {
        this.$sa.quick("trackHeatMap", e.currentTarget);
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
      if (e) {
        that.$sa.quick("trackHeatMap", e.currentTarget);
      } else this.startToast = true;
      setTimeout(function() {
        that.startToast = false;
      }, 1500);
    },
    //跳转其他热门产品
    gotoPro(depositWapUrl, index) {
      location.href = depositWapUrl;
    },
    //跳转抢购记录
    gotoRecord(e) {
      var that = this;
      if (e) {
        that.$sa.quick("trackHeatMap", e.currentTarget);
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
            "/html/pages/increaseRateExRecord518/?telephone=" +
            this.telephone +
            "&sessionId=" +
            this.sessionId;
        }
      }
    },

    //跳转产品详情
    gotoProduct(annualInterestRate, duration, limitAmount, e) {
      if (e) {
        this.$sa.quick("trackHeatMap", e.currentTarget);
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
@import "../../less/special.less";
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
  background: #190028;
  .px2px(font-size,28);
  font-family: "DIN-Regular";
  overflow-x: hidden;
  header {
    .bg-img("banner.png",750,570);
    margin: 0 auto;
    position: relative;
    p {
      color: #fff;
      background: rgba(255, 255, 255, 0.2);
      position: absolute;
      right: 0;
      .px2rem(top,30);
      .px2rem(width,152);
      .px2rem(height,64);
      .px2rem(line-height,64);
      .px2px(font-size,26);
      text-align: center;
      .px2rem(border-top-left-radius,64);
      .px2rem(border-bottom-left-radius,64);
    }
  }
  article {
    .date-order {
      background-image: linear-gradient(-180deg, #310948 0%, #11001b 100%);
      display: flex;
      .px2rem(margin-top,-46);
      .px2rem(height,92);
      .px2rem(margin-left,-20);
      .px2rem(margin-right,-20);
      position: relative;
      .swiper-slide {
        .bg-img("nocheck.png",190,92);
        .px2px(width, 190) !important;
        .px2rem(height, 92) !important;
        color: #fff;
       
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;
        p{
           opacity: 0.6;
        }
        p:last-child{
          .px2px(font-size,20);
        }
      }
      .checked {
        
        font-family: "DIN-Bold";
        .bg-img("checked.png",190,92);
        color: #440052;
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;
        p{
          opacity: 1;
        }
        p:last-child {
          font-weight: bold;
        }
      }
    }
    .bidContent {
      .bg-img("bg.png",690,534);
      margin: 0 auto;
      .px2rem(margin-top,30);
      .px2rem(padding-top,30);
      .px2rem(padding-left,30);
      .px2rem(padding-right,30);
      position:relative;
      .totalMoney {
        color: #ffffff;
        span{font-weight:bold}
      }
      .bid-detail {
        display: flex;
        .px2rem(margin-top,60);
        .px2rem(padding-left,30);
        .px2rem(padding-right,30);
        justify-content: space-between;
        align-items: flex-end;
        & > div {
          color: #666666;
          .px2px(font-size,24);
          p:first-child {
            color: #333333;
            .px2px(font-size,36);
            font-family: "DIN-Medium";
          }
          p:last-child{
            opacity: 0.5;
          }
          &:first-child {
            font-family: "DIN-Bold";
            p:first-child {
              color: #ff3d3d;
              .px2px(font-size,64);
              line-height: 1;
              span {
                color: #ff3d3d;
                .px2px(font-size,36);
              }
            }
          }
          &:last-child {
            text-align: right;
          }
        }
      }
      .bid-buy {
        .px2rem(margin-top,30);
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #4a4a4a;
        .px2px(font-size,26);
        .px2rem(padding-left,30);
        .px2rem(padding-right,30);
        & > span:first-child {
          display: block;
          i {
            font-style: normal;
            color: #000000;
            font-weight:bold;
          }
        }
        p {
          color: #9b9b9b;
          display: flex;
          align-items: center;
          span:last-child {
            .bg-img("_right.png",16,14);
            .px2rem(margin-left,12);
          }
        }
      }
      .surplus {
        text-align: center;
        //.px2rem(margin-top,40);
        .px2px(font-size,26);
        color: #ffffff;
        position:absolute;
        width:100%;
        left:0;
        .px2rem(bottom,148);
        span{font-weight: bold}
      }
      .btn {
        background-image: linear-gradient(-135deg, #ffc21c 0%, #ffe833 100%);
        box-shadow: 0 3px 12px 0 rgba(0, 12, 58, 0.5),
          inset 0 2px 1px 0 rgba(255,255, 255, 0.5);
        .px2rem(border-radius,44);
        .px2rem(width,490);
        .px2rem(height,88);
        .px2rem(line-height,88);
        text-align: center;
        margin: 0 auto;
        color: #440052;
        .px2px(font-size,34);
        font-weight: bold;
        //.px2rem(margin-top,20);
         position:absolute;
         left:50%;
        .px2rem(bottom,40);
        transform: translateX(-50%);
      }
      .remindBtn {
        background-image: linear-gradient(-135deg, #ff8b00 0%, #ffcb00 100%);
        box-shadow: 0 6px 24px 0 rgba(0, 12, 58, 0.5),
          inset 0 3px 1px 0 rgba(255, 255, 255, 0.2);
        .px2rem(border-radius,44);
        .px2rem(width,490);
        .px2rem(height,88);
        .px2rem(line-height,88);
        text-align: center;
        margin: 0 auto;
        color: #7e3700;
        .px2px(font-size,34);
        font-weight: bold;
        //.px2rem(margin-top,20);
         position:absolute;
         left:50%;
        .px2rem(bottom,40);
        transform: translateX(-50%);
      }
      .noclickBtn {
        background: rgba(255, 255, 255, 0.4);
        box-shadow: 0 6px 24px 0 rgba(0, 12, 58, 0.3);
        .px2rem(border-radius,44);
        .px2rem(width,490);
        .px2rem(height,88);
        .px2rem(line-height,88);
        text-align: center;
        margin: 0 auto;
        color: rgba(255, 255, 255, 0.6);
        .px2px(font-size,34);
        font-weight: bold;
       // .px2rem(margin-top,20);
        position:absolute;
         left:50%;
        .px2rem(bottom,60);
        transform: translateX(-50%);
      }
    }
    .loginTips {
      text-align: center;
      .px2px(font-size,24);
      color: #fff;
      .px2rem(margin-top,30);
      i {
        font-style: normal;
        color: #ffd23a;
        margin-left: 4px;
        margin-right: 4px;
      }
    }
    .hot-recommend {
      .bg-img("bg_red.png",690,640);
      margin: 0 auto;
      .px2rem(margin-top,40);
      .px2rem(padding-top,30);
      .px2rem(padding-left,30);
      .px2rem(padding-right,30);
      .title {
        color: #ffffff;
        font-weight: bold;
      }
      .eval {
        background: #ffffff;
        .px2rem(border-radius,8);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .px2rem(height,160);
        .px2rem(margin-top,20);
        ._left {
          display: flex;
          align-items: flex-end;
          .px2rem(margin-left,30);
          & > div {
            color: #666666;

            &:first-child {
              .px2rem(width,320);
              p:first-child {
                color: #ff3d3d;
                .px2px(font-size,40);
                font-family: "DIN-Medium";
              }
              p:last-child {
                opacity: 0.5;
                .px2px(font-size,24);
              }
            }
            &:last-child {
              // .px2rem(margin-left,70);
              p:first-child {
                color: #333333;
                .px2px(font-size,36);
                font-family: "DIN-Medium";
                span {
                  color: #151515;
                }
              }
              p:last-child {
                opacity: 0.5;
                .px2px(font-size,24);
              }
            }
          }
        }
        ._right {
          background-image: linear-gradient(-135deg, #ec1656 0%, #ff6d5b 100%);
          .px2rem(border-top-left-radius,30);
          .px2rem(border-bottom-left-radius,30);
          .px2rem(width,142);
          .px2rem(height,60);
          .px2rem(line-height,60);
          .px2rem(padding-left,34);
          color: #fff;
          display: flex;
          align-items: center;
          span {
            display: block;
          }
          span:last-child {
            .bg-img("_right2.png",28,28);
            .px2rem(margin-left,8);
          }
        }
      }
    }
    .activity-tip {
      .px2rem(width, 658);
      // .px2rem(height, 490);
      height: auto;
      color: #ffffff;
      .px2rem(font-size, 24);
      opacity: 0.6;
      margin: 0 auto;
      .head {
        position: relative;
        .padding(47, 15, 33, 15);
        box-sizing: border-box;
        text-align: center;
        .px2px(font-size,28);
        font-weight: bold;
      }
      .head::before,
      .head::after {
        .px2rem(width, 250);
        height: 1px;
        position: absolute;
        content: "";
        border-top: 1px dashed #fff;
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
        .padding(0, 9, 80, 9);
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
          span{font-weight: bold;}
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
             
              .px2rem(border-radius, 35);
            }
            span:nth-child(1) {
              background: #ffffff;
             color: #FF3D3D;
              border: 1px solid  #FF3D3D;
              .px2rem(margin-right, 15);
            }
            span:nth-child(2) {
             background-image: linear-gradient(135deg, #FF6D5B 0%, #EC1656 100%);
            
              color: #ffffff;
              .px2rem(margin-left, 15);
            }
          }
        }
      }
    }
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
        .px2rem(top, 689);
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
}
</style>