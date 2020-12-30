<template>
    <div class="index-page" v-cloak>
        <header>
            <div class="rule" @click='goRule()'></div>
            <div class='invite-history-model'>
            <p>本活动当前已结束</p>
            <p>您可以继续获得邀请奖励直至有效奖励期限结束</p>
            <!--<h1></h1>-->
            <div class='invite-persons'>
                <em></em>
                <div><span>{{reducedUnit(rewardAmount)}}</span><a>已获得收益(元)</a></div>
                <div><span>{{inviteeNum}}</span><a>成功邀请(人)</a></div>
            </div>
        </div>
        </header>
        
        <div class='index-main-group'>
            <div class='index-main-box'>
                <p>邀请新人注册30天内完成<span class='span-btn' @click='openInviteInfo'>投资<em></em></span></p>
                <p>您可享受相应奖励。每成功邀请一位好友，<span>可获40元现金</span>。</p>
                <p class="img-model"><img src="./res/redBag_40.png"/></p>
            </div>
            <div class='index-main-box box2'>
                <p>邀请新人注册后30天内，受邀用户每笔投资，<br/>(30天及以上的箱底金，安心智选，智选月月升)<br/>您都<span>可享0.4%的返现</span>。</p>
                <h2><span>举个栗子🌰</span></h2>
                <div class='box-lizi'>
                    <span></span>
                    <span><span>0.4%</span><span>自由返现</span><span></span></span>
                    <span></span>
                </div>
            </div>
        </div>
        <!--弹框-->
        <div class='frame-box' v-show='showFrameBox' @touchmove.prevent>
            <!--首次投资-->
            <div class='frame-main invite-info' v-show='showFrameType == 1'>
                <p>1.受邀者需通过本活动分享的链接完成注册；</p>
                <p>2.购买产品锁定期≥30天，单笔投资额≥1000元（不限产品类型）。</p>
                <div class='btn' @click='closeFrameBox'>我知道了</div>
            </div>
          
            <!--关闭按钮-->
            <div class='close-draw' @click='closeFrameBox'
                 v-show='(showFrameType == 3 && producedPrize) || showFrameType == 2'></div>
        </div>
    </div>
</template>
<script>
import User from "../../service/common/User";
import qr from "./components/inviteQr";
import pageVisibility from "../../commonScript/pageVisibility.js";
import {getUserBasicActInfo,actCodeInvite} from '../../service/pages/inviteDraw/service.js';
import { swiper, swiperSlide } from "vue-awesome-swiper";
/*PageBack.addCb(function(){
        // console.log('执行app页面回退操作!');
        location.reload();
    })
    pageVisibility.visibilitychange(() => {
        location.reload();
    });*/

export default {
  data() {
    return {
      user: new User(),
      inviteeNum: "--",
      rewardAmount: "--",
      showFrameBox: false,
      showFrameType: 0, //1 首次投资信息  2 邀请二维码  3 中奖  4活动结束
      producedPrize: false,
      prizeName: "1????",
      url: "",
      telephone: "",
      sessionId: "",
      myRank: "",
      myRewardAmount: "",
      isLogin: 2, //1登录  2 未登录
      swiperOption: {
        notNextTick: true,
        loop: true,
        direction: "vertical",
        autoplay: {
          enabled: true,
          disableOnInteraction: false,
          delay: 3000
        }
      },
      activityInfo: {
        activityEndTime: "",
        isSelf: "",
        phone: "",
        status: "",
        weight: ""
      },
      openBoxStatus: "",
      winningList: [],
      invitelList: [],
      keepTime: "",
      startDownTime: false
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
  created() {},
  mounted() {
    var that = this;
    // 在这里需要判断 是否登录  登录之后之后的状态 来展示
    sessionProObj.getUserInfo((telephone, sessionId) => {
      that.telephone = telephone;
      that.sessionId = sessionId;
      if (!telephone) {
        this.inviteeNum = "--";
        this.rewardAmount = "--";
      } else {
        // 用户登录
        that.getUserActInfo();
      }
    });
  },
  methods: {
    closeFrameBox() {
      this.showFrameBox = false;
      this.showFrameType = 0;
      this.producedPrize = false;
      this.prizeName = "1????";
    },
    //获取用户邀请收益信息
    getUserActInfo() {
      let that = this;
      var param = {
        actCode: actCodeInvite,
        telephone: this.telephone,
        sessionId: this.sessionId
      };
      getUserBasicActInfo(param).then(res => {
        let data = res.data;
        if (+data.code == 0) {
          that.rewardAmount = data.data.rewardAmount;
          that.inviteeNum = data.data.inviteeNum;
          that.drawStatus = data.data.drawStatus;
          that.actStatus = data.data.actStatus;
          that.inviteRewardNum = data.data.inviteRewardNum;
          if (that.actStatus == 2) {
            GB.utils.htoast("活动已结束");
          }
        } else {
          if (data.msg) {
            GB.utils.htoast(data.msg);
          }
        }
      });
    },
    reducedUnit(value) {
      if (!value && !this.telephone) {
        return "";
      }
      if (!value && this.telephone) {
        return "0.00";
      }
      if (value == "--") return "--";
      let result = (value / 100).toFixed(2);
      return result;
    },
    openInviteInfo() {
      this.showFrameBox = true;
      this.showFrameType = 1;
    },
    goRule() {
      this.$router.push({ path: "/rules" });
    }
  },
  activated() {
    /*this.getFirstReward();*/
    window.scrollTo(0, 0);
  }
};
</script>
<style lang="less" scoped>
@import "../../../statics/less/base/method.less";

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
  background: #260259;
  header {
    .bg-img("banner_new.png", 750, 1188);
    .pr();
    width: 100%;
    .horn {
      .px2rem(height, 60);
      .px2rem(line-height, 60);
      background: rgba(43, 3, 77, 0.8);
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
      /*.px2rem(padding-top, 15);
                .px2rem(padding-bottom, 15);*/
      overflow: hidden;
      > div {
        overflow: hidden;
        height: 100%;
        .swiper-container {
          height: 0.8rem !important;
        }
      }
    }
    .rule {
      .pa();
      .bg-img("rules.png", 50, 130);
      right: 0;
      .px2rem(top, 438);
      cursor: pointer;
    }
  }
  .invite-history-model {
    background-color: #fff;
    box-shadow: 0 1px 10px 0 rgba(168, 120, 0, 0.4);
    .px2rem(border-radius,20);
    .px2rem(width,670);
    .px2rem(bottom,80);
    left: 50%;
    transform: translateX(-50%);
    margin: 0 auto;
    &:extend(.common-style);
    .pa();
    // .px2rem(top, -485);
    .padding(40,88,80,88);
    z-index: 10;
    p {
      text-align: center;
      .px2rem(font-size,28);
      .px2rem(margin-left,-88);
      .px2rem(margin-right,-88);
      color: #151515;
      .px2rem(line-height,48);
      &:first-child {
        .px2rem(font-size,34);
      }
    }
    h1 {
      //.bg-img('invite-history-title.png',514,70);
      margin: 0 auto;
    }
    .invite-persons {
      .padding(62,15,0,15);
      .clearfix();
      .pr();
      &:after {
        height: 0;
        display: block;
        clear: both;
      }
      em {
        .pa();
        .px2rem(height,50);
        border-right: 1px solid #d5d5d5;
        .px2rem(top,104);
        left: 50%;
      }
      div {
        float: left;
        text-align: center;
        * {
          display: block;
          letter-spacing: 0;
        }
        span {
          font-family: DIN-Bold;
          .px2rem(font-size,54);
          color: #333333;
          .px2rem(padding-bottom,18);
          .px2rem(min-height,98);
        }
        a {
          .px2rem(font-size,24);
          color: #a8a8a8;
        }
        &:last-child {
          float: right;
        }
      }
    }
  }
  .index-main-group {
    .pr();
     .px2rem(margin-top, -20);
    .index-main-box {
      margin: 0 auto;
      .px2rem(margin-bottom, 40);
      .px2rem(padding-left, 40);
      .px2rem(padding-right, 40);
      .px2rem(padding-top, 110);
      .bg-img("title1.png", 694, 534);
      p {
        .px2rem(font-size, 28);
        color: #bbbbf0;
        text-align: center;
        .px2rem(line-height, 40);
        span {
          color: #ffda5c;
          em {
            display: inline-block;
            .bg-img("wenhao.png", 26, 26);
            margin-left: 3px;
            .pr();
            .px2rem(bottom, -5);
          }
          &.span-btn {
            color: #ff8133;
          }
        }
      }
      .index-main-box {
        display: flex;
        justify-content: center;
      }
      img {
        // display: block;
        margin: 0 auto;
        .px2rem(margin-top, 26);
        .px2rem(width, 318);
      }
      &.box2 {
        .bg-img("title2.png", 694, 604);
        h2 {
          border-bottom: 1px solid #524576;
          .px2rem(margin-top, 40);
          .px2rem(margin-bottom, 49);
          .pr();
          span {
            .px2rem(padding-right, 25);
            .px2rem(padding-left, 25);
            color: #bbbbf0;
            background: #2e1551;
            .px2rem(bottom, -20);
            .pa();
            left: 50%;
            transform: translateX(-50%);
            .px2rem(font-size, 28);
          }
        }
        .box-lizi {
          .px2rem(padding-left, 25);
          > span {
            display: inline-block;
            &:first-child {
              .bg-img("redBag_5000.png", 190, 220);
            }
            &:nth-child(2) {
              .pr();
              .px2rem(width, 170);
              .px2rem(top, -100);
              span {
                display: block;
                text-align: center;
                margin: 0 auto;
                &:first-child {
                  .px2rem(font-size, 30);
                  color: #ffda5c;
                  .px2rem(line-height, 36);
                }
                &:nth-child(2) {
                  .px2rem(line-height, 32);
                  .px2rem(font-size, 24);
                  .px2rem(margin-bottom, 10);
                  color: #bbbbf0;
                }
                &:last-child {
                  .bg-img("jiantou.png", 90, 24);
                }
              }
            }
            &:last-child {
              .bg-img("redBag_200.png", 190, 220);
            }
          }
        }
      }
      &.box3 {
        .bg-img("yellow2.png", 694, 660);
        &.index-main-smallbox {
          .bg-img("yellow1.png", 694, 596);
        }
        .down-time {
          .px2rem(margin-bottom, 22);
          .down-time-model {
            color: #bbbbf0;
            a {
              display: inline-block;
              text-decoration: none;
              background: #1e003e;
              .borderradius1(4);
              margin-left: 1px;
              .px2rem(height, 44);
              .px2rem(line-height, 44);
              .px2rem(width, 24);
              text-align: center;
              &:nth-child(2),
              &:nth-child(4) {
                margin-right: 2px;
              }
            }
          }
        }
        img {
          .px2rem(width, 300);
          .px2rem(margin-top, 5);
          .px2rem(margin-bottom, 5);
          &.openedBox {
            .px2rem(width, 220);
            .px2rem(margin-top, 35);
            .px2rem(margin-bottom, 40);
          }
        }
        .bottom-txt {
          .px2rem(font-size, 30);
        }
      }
    }
    .invite-list {
      border-bottom: 1px solid #78759d;
      .px2rem(margin, 40);
      .px2rem(margin-top, 70);
      .pr();
      span {
        .px2rem(padding-right, 25);
        .px2rem(padding-left, 25);
        color: #bbbbf0;
        background: #260259;
        .px2rem(bottom, -20);
        .pa();
        left: 50%;
        transform: translateX(-50%);
        .px2rem(font-size, 30);
      }
    }
  }
  .invite-list-box {
    background: rgba(48, 26, 78, 0.8);
    border: 1px solid #78759d;
    .borderradius1(20);
    .px2rem(width, 670);
    margin: 0 auto;
    .px2rem(margin-top, -485);
    .px2rem(padding, 40);
    .px2rem(font-size, 24);
    .px2rem(line-height, 34);
    text-align: center;
    color: #bbbbf0;
    .invite-list-th,
    .invite-list-me {
      display: -webkit-flex; /* Safari */
      display: flex;
      justify-content: space-between;
    }
    .invite-list-me {
      .px2rem(min-height,50);
      span {
        .px2rem(font-size, 34);
        .px2rem(line-height, 50);
        &:last-child {
          color: #ffda5c;
        }
        &.under-line {
          text-decoration: underline;
        }
      }
    }
    .my-invite-list {
      text-align: right;
      .px2rem(padding-right, 18);
      background: url("./res/jiantou_right.png") no-repeat right center;
      background-size: auto 55%;
    }
    .invite-list-content {
      .px2rem(margin-top, 30);
      border-top: 1px solid #675e8f;
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
          .px2rem(padding-top, 20);
        }
      }
      ul {
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
                color: #ffda5c;
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
                color: #ffda5c;
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
      .px2rem(font-size, 24);
      .px2rem(padding-right, 15);
      background: url("./res/jiantou_right.png") no-repeat right center;
      background-size: auto 60%;
    }
    .invite-list-bottom {
      .px2rem(margin-top, 20);
      .px2rem(font-size, 20);
    }
  }
  .invite-history {
    .px2px(font-size, 24);
    float: right;
    color: #bbbbf0;
    .px2rem(margin-right, 40);
    .px2rem(padding-right, 16);
    background: url("./res/jiantou_right.png") no-repeat right center;
    background-size: auto 55%;
    .px2rem(margin-top, 20);
  }
  footer {
    display: -webkit-flex;
    display: flex;
    justify-content: space-between;
    width: 100%;
    .pf();
    bottom: 0;
    left: 0;
    z-index: 999;
    background: #260259;
    .px2rem(padding-left, 30);
    .px2rem(padding-right, 40);
    .px2rem(padding-top, 26);
    .px2rem(padding-bottom, 16);
    button {
      border: none;
      outline: none;
      background: none;
      font-weight: bold;
      &.invite-footer-btn {
        .bg-img("long-btn.png", 476, 108);
        .px2rem(font-size, 40);
        color: #f65500;
        .px2rem(letter-spacing, 3);
        .pr();
        span {
          display: block;
          .px2rem(margin-top, -18);
        }
        .invite-footer-qr {
          .pa();
          .px2rem(left, 10);
          .px2rem(top, 18);
          .px2rem(width, 100);
          .px2rem(height, 100);
          z-index: 1000;
        }
      }
      &.invite-footer-poster {
        .bg-img("short-btn.png", 190, 100);
        .px2rem(font-size, 30);
        color: #f1912e;
        .px2rem(letter-spacing, 2);
        .px2rem(line-height, 36);
        span {
          display: block;
          .px2rem(margin-top, -8);
        }
      }
    }
  }
  /*弹框*/
  .frame-box {
    min-width: 8.5em;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.7) center center no-repeat;
    .btn {
      background-image: linear-gradient(-45deg, #ffec9b 0%, #ffc21c 93%);
      background-image: -webkit-linear-gradient(
        -45deg,
        #ffec9b 0%,
        #ffc21c 93%
      );
      .borderradius1(20);
      .px2rem(font-size, 30);
      color: #714800;
      letter-spacing: 1px;
      .px2rem(height, 90);
      .px2rem(line-height, 90);
      font-weight: bold;
      text-align: center;
      margin: 0 auto;
    }
    .frame-main {
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
    .invite-info {
      .px2rem(width, 620);
      .padding(80, 40, 40, 40);
      background: #fff;
      box-shadow: 0 4px 20px 0 rgba(74, 74, 74, 0.26);
      .borderradius1(20);
      p {
        .px2px(font-size, 28);
        color: #494666;
        .px2rem(line-height, 54);
      }
      div {
        .px2rem(width, 540);
        .px2rem(margin-top, 40);
      }
    }
    .invite-prize {
      .prize-box {
        .bg-img("prizebox.png", 750, 750);
        .px2rem(font-size, 50);
        color: #ff5e00;
        overflow: hidden;
        span {
          .px2rem(width, 200);
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          margin: 0 auto;
          .px2rem(margin-top, 343);
          .px2rem(letter-spacing, 14);
        }
        p {
          .px2rem(font-size, 30);
          color: #ffda5c;
          text-align: center;
          .px2rem(margin-top, 130);
        }
      }
      div {
        .px2rem(width, 430);
        .px2rem(margin-top, 30);
      }
    }
    .game-over {
      .pa();
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .px2rem(font-size,36);
      text-align: center;
      color: lightgrey;
      letter-spacing: 1px;
    }
    .close-draw {
      .pa();
      .bg-img("Group 3.png", 47, 47);
      left: 50%;
      .px2rem(margin-left, -24);
      .px2rem(bottom, 100);
      cursor: pointer;
    }
  }
}
@keyframes rollUp {
  0% {
    -webkit-transform: translateY(0%);
    -moz-transform: translateY(0%);
    -ms-transform: translateY(0%);
    -o-transform: translateY(0%);
    transform: translateY(0%);
  }
  100% {
    -webkit-transform: translateY(-100%);
    -moz-transform: translateY(-100%);
    -ms-transform: translateY(-100%);
    -o-transform: translateY(-100%);
    transform: translateY(-100%);
  }
}
@-webkit-keyframes rollUp {
  0% {
    -webkit-transform: translateY(0%);
    -moz-transform: translateY(0%);
    -ms-transform: translateY(0%);
    -o-transform: translateY(0%);
    transform: translateY(0%);
  }
  100% {
    -webkit-transform: translateY(-100%);
    -moz-transform: translateY(-100%);
    -ms-transform: translateY(-100%);
    -o-transform: translateY(-100%);
    transform: translateY(-100%);
  }
}
//iphoneX、iphoneXs
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  footer {
    padding-bottom: 20px !important;
  }
  .index-page {
    padding-bottom: 3.8rem !important;
  }
}
//iphone Xs Max
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
  footer {
    padding-bottom: 20px !important;
  }
  .index-page {
    padding-bottom: 3.8rem !important;
  }
}
//iphone XR
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
  footer {
    padding-bottom: 20px !important;
  }
  .index-page {
    padding-bottom: 3.8rem !important;
  }
}
</style>
