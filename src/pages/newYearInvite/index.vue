<template>
    <div class="invite-page" v-cloak>
      <header>
         <!-- 获奖记录 -->
         <div class="horn" v-show='winningList.length>0'>
           <div>
             <swiper :options="swiperOption" ref="swiperOption" v-if='winningList.length>0'>
                  <swiper-slide v-for="(item,index) in winningList" :key="index">
                        {{item.phone}}刚刚获得 {{getPrize(item.rewardType,item.rewardAmount,item.goldWeight)}}
                  </swiper-slide>
             </swiper>
           </div>
         </div>
        <!-- 邀请现金奖励 -->
         <div class="invite-cash">
            <p class="title"></p>
            <p class="cash-50"></p>
            <div class="intro">
              <p>每邀请一位新用户注册并完成一笔2000元</p>
              <p><span>及以上</span><span class="invest-model"><span><a  id="touzi" @click="tipsShow=true">投资</a></span><span  class="why" @click="tipsShow=true"></span></span><span>，即可获得现金奖励。</span></p>
            </div>
         </div>
         <!-- 活动细则 -->
         <p class="rules" id="goRule"  @click="goRule($event)"></p>
      </header>
      <article>
        <!-- 0.4%自由返现 -->
        <div class="cash-return">
          <p class="title"></p>
          <p class="intro">受邀用户活动期间内每笔投资 (包含30天及以上的安心智选、智选月月升) 您都<span>可享0.4%的返现</span>。</p>
          <p class="example-line">
            <span></span>
            <span>举个栗子🌰</span>
            <span></span>
          </p>
          <p class="example"></p>
        </div>
        <!-- 邀请攻略 -->
        <div class="invite-way">
          <p class="title"></p>
          <div class="step">
            <p class="line"></p>
            <div>
              <p class="step1"></p>
              <p>点击立即邀请</p>
            </div>
             <div>
              <p class="step2"></p>
              <p>好友通过链接完成注册</p>
            </div>
             <div>
              <p class="step3"></p>
              <p class="speIntro">
                注册30天内
                <span class="fi"><span>完成<a id="touzi1" @click="tipsShow=true">投资</a></span><span @click="tipsShow=true"></span></span>
              </p>
            </div>
          </div>
        </div>
        <!-- 邀请达人榜 -->
        <div class="invite-record">
          <p class="title">邀请达人榜</p>
          <div class="mine-reward-model">
            <div>
              <p>当前排名</p>
              <!-- 未登录 -->
               <p class="login-style" v-show='isLogin == 0' id="login"  @click='callAppLogin($event)'>登录查看</p>
               <template v-if="isLogin == 1">
                <!-- 上榜 -->
                <p  class="rank-text">{{myRank}}</p>
               </template>
             
            </div>
             <div>
              <p>获得奖励(元)</p>
              <p class="rank-text">{{myRewardAmount|moneyUnit}}</p>
            </div>
          </div>
          <p class="check-my-record" id="myRecord" @click="checkInvite($event)"><span>查看我的邀请记录</span><span></span></p>
          <p class="line"></p>
           <div class='invite-list-content'>
                <!--空状态-->
                <div class='data-empty' v-if='invitelList.length<=0'><img src="./res/no-data-red.png"/>
                    <p>暂无榜单</p></div>
                <!--列表-->
                <ul v-else>
                    <li v-for='(item, index) in invitelList' :key="index">
                        <div><span>NO.{{index+1}}</span><span>{{item.rewardAmount|moneyUnit}}</span></div>
                        <p>{{item.phone}}</p>
                    </li>
                </ul>
            </div>
            <p class='invite-list-btn' id="listBtn" @click='checkRecordList($event)' v-if='invitelList.length>0'><span id="checkList" @click="checkRecordList($event)">查看完整榜单</span><span></span></p>
        </div>
        <!-- 历史奖励 -->
        <!-- <p class="history-reward" @click="checkHistory"><span>历史奖励</span><span></span></p> -->
        <p class="risk">投资有风险 入市需谨慎<br/>本活动解释权归黄金钱包所有</p>
      </article>
      <div class="footer-before"></div>
      <footer>
          <div>
            立即邀请
            <p @click.stop='openFrameQr($event)' id="openFrameQr"></p>
            <p @click='goShare($event)' id="goShare"></p>
          </div>
      </footer>
      <v-modalTip v-show="tipsShow">
        <div class="tips-model">
            <div class="_width">
              <p>
                1.通过本链接邀请新用户；<br/>2.限注册30天内完成投资；<br/>3.新用户活动期间内投资锁定期限≥30天且投资金额≥2000元的产品（包含30天及以上的安心智选、智选月月升）
              </p>
              <div class="close-btn" @click="tipsShow=false">我知道了</div>
            </div>
        </div>
      </v-modalTip>
       <v-modalTip v-show="tipsShowQr">
        <v-qr :showFrameType='showFrameType' :url='url' @closeFrameBox="closeFrameBox"></v-qr>
      </v-modalTip>
      <v-modalTip v-show='status == 2'>
        <!--活动已经结束-->
      <div class='game-over'>活动已结束!</div>
      </v-modalTip>
      
    </div>
</template>
<script>
import User from "../../service/common/User";
import util from "../../utils/tool.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import qr from "./components/inviteQr";
import {
  getCurrentHundredTopList,
  getPersionInviteRank,
  openFirstReward,
  getFirstReward,
  getLatestInviteList,
  prizeNameList
} from "../../service/pages/inviteDraw/service.js";
export default {
  data() {
    return {
      user: new User(),
      telephone: "",
      sessionId: "",
      come: "",
      actCodeInvite: "opn0003",
      isLogin: "", //是否登录 0-未登录 1-已登录
      shareCode: "",
      tipsShow: false,
      tipsShowQr: false,
      myRewardAmount: 0,
      status: "",
      myRank: "",
      url: "",
      showFrameType: "",
      winningList: [],
      invitelList: [],
      swiperOption: {
        notNextTick: true,
        loop: true,
        direction: "vertical",
        autoplay: {
          enabled: true,
          disableOnInteraction: false,
          delay: 3000
        }
      }
    };
  },
  watch: {},
  filters: {
    moneyUnit: function(value) {
      if (!value) return "0.00";
      let result = (value / 100).toFixed(2);
      return result;
    }
  },
  components: {
    "v-qr": qr,
    swiper,
    swiperSlide
  },
  mounted() {
    this.status = GB.utils.GetRequest()["status"];
    this.come = GB.utils.GetRequest()["come"] || "";
   
    this.getHundredList();
    this.getTopList();
    // 在这里需要判断 是否登录  登录之后之后的状态 来展示
    sessionProObj.getUserInfo((telephone, sessionId) => {
      this.telephone = telephone;
      this.sessionId = sessionId;
      if (!telephone) {
        //用户未登录
        this.isLogin = 0;
      } else {
        // 用户登录
        this.isLogin = 1;
        this.randomShareCode();
        this.getmyRewardRank();
        this.getShareInfo(sharebasePath, telephone, this.shareCode);
      }
    });
  },
  methods: {
    randomShareCode(){
      var random = parseInt(Math.random()*10);
      if(random%2===0){
        this.shareCode = "newYearInviteShare"
      }else{
         this.shareCode = "wxLandingShare"
      }
    },
    closeFrameBox() {
      this.tipsShowQr = false;
    },
    //获取我的排名
    getmyRewardRank() {
      let that = this;
      var param = {
        actCode: this.actCodeInvite,
        telephone: this.telephone,
        sessionId: this.sessionId
      };
      getPersionInviteRank(param).then(res => {
        let data = res.data;
        if (+data.code == 0) {
          that.myRewardAmount = data.data.rewardAmount;
          if (data.data.rewardAmount) {
            that.myRank = "NO." + data.data.rank;
          } else {
            that.myRank = "暂未上榜";
          }
        } else {
          if (data.msg) {
            GB.utils.htoast(data.msg);
          }
        }
      });
    },
    ////获取前五名的排序
    getTopList() {
      let that = this;
      var param = {
        actCode: this.actCodeInvite,
        num: 5
      };
      getCurrentHundredTopList(param).then(res => {
        let data = res.data;
        if (+data.code == 0) {
          that.invitelList = data.data.topList;
        } else {
          if (data.msg) {
            GB.utils.htoast(data.msg);
          }
        }
      });
    },
    //获取轮播列表
    getHundredList() {
      let that = this;
      var param = {
        actCode: this.actCodeInvite
      };
      getLatestInviteList(param).then(res => {
        let data = res.data;
        if (+data.code == 0) {
          that.winningList = data.data.lastRewardList;
        } else {
          if (data.msg) {
            GB.utils.htoast(data.msg);
          }
        }
      });
    },
    //二维码
    getShareInfo(path, tel, code) {
      var that = this;
      $.getJSON(
        path + "info/getShareInfoJsonp?jsoncallback=?",
        {
          telephone: tel,
          code: code,
          pageUrl: encodeURIComponent(location.href.split("#")[0].toString())
        },
        function(_data) {
          var lineLink = location.href;
          if (_data.wxurl) {
            lineLink = _data.wxurl;
          }
          that.url = lineLink;
          params["title"] = _data.title;
          params["imageUrl"] = _data.imageUrl;
          params["description"] = _data.description;
          params["url"] = lineLink;
        }
      );
    },
    //生成二维码
    openFrameQr(e) {
      this.$sa.quick('trackHeatMap', e.currentTarget)
      if (!this.telephone) {
        this.callAppLogin();
        return;
      }
      this.tipsShowQr = true;
      this.showFrameType = 2;
    },
    //分享按钮
    goShare(e) {
      this.$sa.quick('trackHeatMap', e.currentTarget)
      if (!this.telephone) {
        this.callAppLogin();
        return;
      }
      var params_shared = {
        type: "1", //分享类型 1：新闻类分享  2：截图分享
        code: this.shareCode, //活动code，分享统计标示
        needLogin: "1",
        platform: "0", //0:弹出选择平台 1:微信好友 2:微信朋友圈 3：QQ好友 4：QQ空间 5：复制链接
        pushShareMark: "1" //是否需要统计用户分享
      };
      GB.utils.callCustomMethod("share", params_shared);
    },
    //历史奖励
    checkHistory() {
      if (!this.telephone) {
        this.callAppLogin();
        return;
      }
      location.href = webV2Path + "/html/pages/historyInvite/";
    },
    //查看完整榜单
    checkRecordList(e) {
      this.$sa.quick('trackHeatMap', e.currentTarget) 
      this.$router.push({ path: "/invitationList" });
    },
    //查看我的邀请记录
    checkInvite(e) {
      this.$sa.quick('trackHeatMap', e.currentTarget) 
      if (!this.telephone) {
        this.callAppLogin();
        return;
      }
      location.href = basePath + "/html/pages/newYearInviteRecord/";
    },
    //翻牌拿红包
    gotoDraw() {
      var url;
      if (this.come) {
        GB.utils.callCustomMethod("goBack", {});
        return;
      }
      // if (GB.utils.isDev()) {
      //   url = "https://test-app-activity.g-banker.com/html/pages/actNewYear/?come=true";
      // } else {
      //   url = "https://app-activity.g-banker.com/html/pages/actNewYear/?come=true";
      // }
      location.href = basePath + "/html/pages/actNewYear/?come=true";
    },
    //活动细则
    goRule(e) {
      //this.$router.push({ path: "/rules" });
      this.$sa.quick('trackHeatMap', e.currentTarget) 
      location.href = basePath + "/html/pages/newYearInviteRules/";
    },
    //登录
    callAppLogin() {
      // this.$sa.quick('trackHeatMap', e.currentTarget) 
      this.user.callAppLogin();
    },
    //奖励换算
    getPrize(type, amount, weight) {
      switch (type) {
        case 1:
          return amount / 100 + "元红包";
          break;
        case 4:
          return weight + "mg黄金";
          break;
        case 5:
          return amount / 100 + "元返现";
          break;
      }
    }
  },
  beforeMount() {},
  activated() {
    if (GB.utils.getPlatform() == "android") {
      clientInit.done(() => {
        GB.utils.callCustomMethod("setTitle", {
          title: "邀好友 赚现金"
        });
      });
    } else {
      GB.utils.callCustomMethod("setTitle", {
        title: "邀好友 赚现金"
      });
    }
    //location.reload();
    window.scrollTo(0, 0);
  }
};
</script>
<style lang="less"  scoped>
@import "../../../statics/less/base/method.less";
@import "../../less/iphonex.less";
// .fix-iphonex-bottom footer{
//   padding-bottom: 0.91rem
// }
//iphoneX、iphoneXs
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  footer {
    padding-bottom: 30px !important;
  }
  .risk {
    .px2rem(margin-bottom,70) !important;
  }
}

//iphone Xs Max
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
  footer {
    padding-bottom: 30px !important;
  }
  .risk {
    .px2rem(margin-bottom,70) !important;
  }
}

//iphone XR
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
  footer {
    padding-bottom: 30px !important;
  }
  .risk {
    .px2rem(margin-bottom,70) !important;
  }
}
.footer-before {
  &::before {
    .px2rem(height,160);
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
.bg-img-common( @file , @width, @height ) {
  .px2rem(width, @width);
  .px2rem(height, @height);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("../../assets/@{file}");
}
.game-over {
  // .pa();
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  .px2rem(font-size,36);
  text-align: center;
  color: lightgrey;
  letter-spacing: 1px;
}
.width() {
  .px2rem(width,690);
  margin: 0 auto;
  background: #ffffff;
  .px2rem(border-radius,20);
  .px2rem(margin-bottom,30);
}

.border(@size,@color) {
  @bor: @size / 75 * 1rem;
  border: @bor solid @color;
}
[v-cloak] {
  display: none !important;
}
.invite-page {
  background-color: #ff705e;
  .px2px(font-size,28);
  color: #333333;
  header {
    .bg-img("header.png",750,1038);
    margin: 0 auto;
    padding-top: 1px;
    .pr();
    .horn {
      .px2rem(height, 60);
      .px2rem(line-height, 60);
      background-image: linear-gradient(90deg, #ff7b2f 0%, #ff4b39 100%);
      .px2rem(border-bottom-right-radius, 35);
      .px2rem(border-top-right-radius, 35);
      .pa();
      left: 0;
      text-align: center;
      color: #ffffff;
      .px2rem(top, 20);
      .px2rem(padding-left, 20);
      .px2rem(padding-right, 33);
      .px2rem(font-size, 24);
      overflow: hidden;
      > div {
        overflow: hidden;
        height: 100%;
        .swiper-container {
          height: 0.8rem !important;
        }
      }
    }
    .invite-cash {
      .px2rem(margin-top,338);
      .title {
        .bg-img("title-invite-cash.png",270, 40);
        margin: 0 auto;
      }
      .cash-50 {
        .bg-img("cash-gift.png",530, 210);
        margin: 0 auto;
        .px2rem(margin-top,40);
      }
      .intro {
        .px2rem(margin-top,40);
        p:first-child {
           text-align: center;
        }
        p:last-child {
          display: flex;
          justify-content:center;
          align-items: center;
          .invest-model{
            display: flex;
            align-items: center;
          }
             a {
            font-weight: bold;
            font-style: normal;
            color: #ff8133;
          }
          span.why {
            .bg-img("intro-icon.png", 30, 30);
            margin-left: 2px;
            display: block;
            font-weight: bold;
          }
          text-align: center;
          span {
            display: block;
          }
        }
      }
      .card-gift-btn {
        color: #f94a1e;
        border: 1px solid #ffcab2;
        .px2rem(border-radius,30);
        .px2rem(width,250);
        .px2rem(height,60);
        .px2rem(line-height,60);
        text-align: center;
        margin: 0 auto;
        .px2rem(margin-top,20);
      }
    }
    .rules {
      .pf();
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      .bg-img("rules.png",50, 140);
    }
  }
  article {
    .cash-return {
      .width();
      .px2rem(padding-top,60);
      .px2rem(padding-bottom,60);
      .title {
        .bg-img("title-returnCash.png",282,40);
        margin: 0 auto;
      }
      .intro {
        .px2rem(width,590);
        margin: 0 auto;
        text-align: center;
        .px2rem(margin-top,40);
        span {
          font-weight: bold;
        }
      }
      .example-line {
        display: flex;
        align-items: center;
        justify-content: center;
        .px2rem(margin-top,40);
        span {
          display: block;
        }
        span:not(:nth-child(2)) {
          .px2rem(width,200);
          height: 1px;
          background-color: #eae9f9;
        }
        span:nth-child(2) {
          color: #c2c2c4;
          .px2rem(margin-left,25);
          .px2rem(margin-right,25);
        }
      }
      .example {
        .bg-img("example-img.png",550,220);
        margin: 0 auto;
        .px2rem(margin-top,30);
      }
    }
    .invite-way {
      .width();
      .px2rem(padding-top,60);
      .px2rem(padding-bottom,60);
      .title {
        .bg-img("title-invite.png", 200,40);
        margin: 0 auto;
      }
      .step {
        display: flex;
        justify-content: center;
        position: relative;
        .px2rem(margin-top,40);
        .line {
          position: absolute;
          .px2rem(width,500);
          .px2rem(top,70);
          left: 50%;
          transform: translateX(-50%);
          background: #eae9f9;
          height: 1px;
        }
        > div:nth-child(3) {
          .px2rem(margin-left,40);
          .px2rem(margin-right,40);
        }
        > div {
          .px2rem(width,180);
          z-index: 20;
          text-align: center;
          p:first-child {
            .px2rem(margin-bottom,20);
          }
        }
        .step1 {
          .bg-img("no-share.png", 140,140);
          margin: 0 auto;
        }
        .step2 {
          .bg-img("no-register.png", 140,140);
          margin: 0 auto;
        }
        .step3 {
          .bg-img("no-invite.png", 140,140);
          margin: 0 auto;
        }
        .speIntro {
          // display: flex;
          // align-items: center;
          .fi {
            display: flex;
            align-items: center;
            justify-content: center;
            span {
              display: block;
            }
            span:last-child {
              display: inline-block;
              .bg-img("intro-icon.png",30,30);
            }
          }
          a {
            font-weight: bold;
            font-style: normal;
            color: #ff8133;
          }
        }
      }
    }
    .invite-record {
      .width();
      background-color: rgba(255, 145, 131, 0.8);
      .px2rem(padding-top,40);
      .px2rem(padding-bottom,40);
      .title {
        .px2px(font-size,34);
        color: #ffffff;
        letter-spacing: 2px;
        text-align: center;
        font-weight: bold;
      }
      .mine-reward-model {
        display: flex;
        justify-content: space-between;
        .px2rem(padding-left,50);
        .px2rem(padding-right,50);
        box-sizing: border-box;
        > div {
          .px2px(font-size,24);
          color: #ffd1c5;
          p.rank-text {
            .px2px(font-size,34);
            font-weight: bold;
            color: #ffffff;
          }
          .noLogin {
          }
          .login-style {
            color: #ffffff;
            .px2px(font-size,34);
            text-decoration: underline;
          }
          &:last-child {
            text-align: right;
          }
        }
      }
      .check-my-record {
        .px2px(font-size,24);
        color: #ffd1c5;
        text-align: right;
        .px2rem(padding-right,50);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        span:last-child {
          .bg-img("_right.png",11,18);
          margin-left: 2px;
        }
      }
      .line {
        .px2rem(margin-left,50);
        .px2rem(margin-right,50);
        box-sizing: border-box;
        height: 1px;
        background-color: #ff9d91;
        .px2rem(margin-top,30);
      }
      .invite-list-content {
        .px2rem(margin-top, 30);
        text-align: center;
        .px2rem(min-height, 520);
        .data-empty {
          .px2rem(padding-top, 230);
          img {
            display: block;
            .px2rem(width, 88);
            margin: 0 auto;
          }
          p {
            .px2px(font-size, 24);
            color: #ffd1c5;
            .px2rem(padding-top, 20);
          }
        }
        ul {
          .px2rem(margin-left,50);
          .px2rem(margin-right,50);
          box-sizing: border-box;
          color: #ffd1c5;
          li {
            .px2rem(padding-left, 40);
            .px2rem(padding-right, 20);
            .px2rem(margin-top, 30);
            &:nth-child(1),
            &:nth-child(2),
            &:nth-child(3) {
              .pr();
              div {
                span {
                  color: #ffffff;
                }
              }
              &:before {
                .pa();
                display: block;
                content: "";
                .bg-img("one.png", 30, 42);
                left: 0;
                .px2rem(top, 6);
              }
            }
            &:nth-child(2) {
              &:before {
                background-image: url("./res/two.png");
              }
            }
            &:nth-child(3) {
              &:before {
                background-image: url("./res/three.png");
              }
            }
            div {
              .px2px(font-size, 24);
              .px2rem(line-height, 34);
              display: flex;
              display: -webkit-flex;
              justify-content: space-between;
              span {
                &:last-child {
                  color: #ffffff;
                  .px2px(font-size, 30);
                  .pr();
                  .px2rem(bottom, -15);
                }
              }
            }
            p {
              .px2px(font-size, 24);
              text-align: left;
            }
          }
        }
      }
      .invite-list-btn {
        color: #ffd1c5;
        .px2rem(font-size, 24);
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          display: block;
        }
        span:last-child {
          .bg-img("_right.png",11,18);
          margin-left: 2px;
        }
      }
    }
    .history-reward {
      .px2rem(width,690);
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .px2px(font-size,24);
      color: #ffffff;
      .px2rem(margin-top,-10);
      span {
        display: block;
      }
      span:last-child {
        .bg-img("_right_white.png",11,18);
        margin-left: 2px;
      }
    }
    .risk {
      text-align: center;
      .px2px(font-size,24);
      color: #ffb09c;
      .px2rem(margin-top,60);
      .px2rem(margin-bottom,20);
    }
  }
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #ff705e;
    .px2rem(padding-bottom,20);
    .px2rem(padding-top,20);
    text-align: center;
    z-index: 50;
    & > div {
      .bg-img("btn.png",690,110);
      margin: 0 auto;
      .px2rem(line-height,110);
      .px2px(font-size,36);
      font-weight: bold;
      color: #ff3600;
      letter-spacing: 2px;
      position: relative;
      p:first-child {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        .px2rem(width,100);
      }
      p:last-child {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        .px2rem(left,100);
        .px2rem(width,590);
      }
    }
  }
  .tips-model {
    .px2rem(width,620);
    background: #ffffff;
    box-shadow: 0 2px 10px 0 rgba(74, 74, 74, 0.26);
    .px2rem(border-radius,20);
    .px2rem(padding-top,80);
    .px2rem(padding-bottom,40);
    color: #333333;
    .px2px(font-size,28);
    ._width {
      .px2rem(width,540);
      margin: 0 auto;
      .close-btn {
        background-image: linear-gradient(-135deg, #ff2e70 0%, #ffa459 100%);
        .px2rem(border-radius,8);
        .px2rem(height,90);
        .px2rem(line-height,90);
        text-align: center;
        .px2px(font-size,30);
        color: #ffffff;
        .px2rem(margin-top,40);
      }
    }
  }
}
</style>
