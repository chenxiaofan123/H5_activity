<template>
    <div class="index-page" v-cloak>
        <!-- 已领过礼包 -->
        <div class="User" v-if="isUserType==1" >
          <header class="UserHeader"></header>
          <div class="UserText">
            <div class="topLine"></div>
              <p class="textTitle">您的新手奖励已发放过了哦～</p>
              <p>本活动仅限2019-01-09后注册的新用户参与</p>
            <div class="bottomLine"></div>
          </div>
        </div>
        <div class="noUser" v-if="isUserType==2">
           <header class="noUserHeader"></header>
           <div class="button" id="loginButton" @click ='goLogin($event)'>登录领取大礼包</div>
        </div>
        <div class="newUser"  v-if="isUserType==3">
             <header class="newUserHeader"></header>
             <!-- 优惠标 -->
              <div class="newUserText">
                <div class="topLine"></div>
                <div class="targTitle titleOne clearfix">
                  <span class="titleLeft"></span>
                  <span>新手优惠标</span>
                  <span class="titleRight"></span>
                </div>
                <div class="targetList" v-for='(item,index) in cmsNewUserDepositList' :key ='index'>
                      <div class="targ">
                          <div class="targTop clearfix"><span class='left'>{{item.depositName}}</span><span class="topTip"></span></div>
                          <div class="targBottom clearfix">
                              <div class="left">
                                  <div class="targNumber"><span>{{item.rateText.replace(/%/g, "")}}</span><span>{{item.unit}}</span></div>
                                   <div class="targGray" v-if="item.unit=='%'">{{item.specialWord}}</div>
                                  <div class="targGray strikethrough " v-if="item.unit!='%'">实时金价{{price/100}}元/克</div>
                              </div>
                              <div class="right rightText">
                                  {{item.productDuration}}
                              </div>
                          </div>

                      </div>
                </div>
                <div class="bottomLine"></div>
                 <div class='footerTip'>可前往首页查看,注册后90天内可购买</div>
              </div>
              <!-- 优惠卷 -->
               <div class="Coupon">
                <div class="topLine"></div>
                <div class="targTitle titleTwo clearfix" >
                  <span class="titleLeft"></span>
                  <span>优惠券</span>
                  <span class="titleRight"></span>
                </div>
                <div class="couponList" v-for='(item,index) in deductibleList' :key ='index'>
                  <div class="couponText clearfix">
                      <div class="left leftText">
                          <div v-if='item.deductibleType==11'><span>{{(item.changeRate/100).toFixed(2)}}</span>%</div>
                          <div v-if='item.deductibleType==11'>加息券</div>
                          <div v-if='item.deductibleType==12'><span>{{(item.discountMoney/100)}}</span>元</div>
                          <div v-if='item.deductibleType==12'>满减券</div>
                      </div>
                      <div class="left rightText">
                        <div>{{item.useExplain}}</div>
                        <div>{{item.useLimit}}</div>
                      </div>
                  </div>
                </div>
                <div class="bottomLine"></div>
                <div class='footerTip'>可前往个人中心查看,注册后90天内可使用</div>
              </div>
              <!-- 红包 -->
                <div class="redBag" v-if='registerSource=="prizeDrawRegist" || registerSource=="activityGift"||registerSource=="oldPullNew08" || registerSource=="opn0003"'>
                  <div class="topLine"></div>
                  <div class="targTitle titleThree clearfix">
                    <span class="titleLeft"></span>
                    <span>小小红包不成敬意</span>
                    <span class="titleRight"></span>
                  </div>
                  <div class="redBagContent">
                      <div class="redBagbg"></div>
                  </div>
                  <div class="bottomLine"></div>
                   <div class='footerTip'>前往个人中心可查看,有效期：注册后7天内有效</div>
                </div>
              <div class='userFooter'>
                <div class="footerButton" id="footerButton" @click='viewRewards($event)'>查看奖励</div>
              </div>
        </div>
    </div>
</template>
<script>
import util from "../../utils/tool.js";
import wxShare from "../../commonScript/wxShare.js";
 import User from '../../service/common/User';
import { openApp } from "../../commonScript/download.js";
import {getGiftPacksInfo} from '../../service/pages/noviceBag/service.js'

export default {
  data() {
    return {
      user: new User(),
      isShare: GB.utils.GetRequest()["isShare"] || "",
      bottomBg: "rgba(0,0,0,0.5)",
      shareCode: "noviceBagShareCode",
      isUserType: null, // 1老用户  2 未登录  3 新用户
      telephone:'',
      sessionId:'',
      cmsNewUserDepositList:'', //新手标列表
      deductibleList:'',//优惠券列表
      registerSource:'', //注册渠道显示红包 4个渠道显示红包
      price:'',

    };
  },
  watch: {},
  filters: {},
  components: {},
  mounted() {
       var that = this;
      //在这里需要判断 是否登录  登录之后之后的状态 来展示
      sessionProObj.getUserInfo((telephone, sessionId) => {
          that.telephone = telephone;
          that.sessionId = sessionId;
          console.log(that.sessionId);
          console.log(that.telephone)
          if (!telephone) {
              that.isUserType = 2 //用户未登录
          } else {  // 用户登录
              that.getGiftPacksInfo();
          }
      });
      // if(!this.isShare){
      //   getShareInfo(sharebasePath, "", this.shareCode);
      // }else{
      //   wxShare.getShareInfo('', this.shareCode);
      // }
        //that.getGiftPacksInfo();
  },
  methods: {
      //登录
    goLogin(e){ //去登陆
      this.$sa.quick('trackHeatMap', e.currentTarget) 
      this.user.callAppLogin();
    },
    //查看奖励
    viewRewards(e){
       // console.log('前往个人中心');
        this.$sa.quick('trackHeatMap', e.currentTarget) 
        var params='';
        if(GB.utils.getPlatform()== 'android'){
            params ={
                'url' :'gbanker://page_customservice',
                "params":{"orderID":""}
            };
            GB.utils.callCustomMethod("openUrl",params);
        }else{
            params ={
                'url' :'gbanker://page_mine',
                "params":{"orderID":""}
            };
            GB.utils.callCustomMethod("openUrl",params);
        }
    },
    //调取优惠卷
    getGiftPacksInfo(){
       let that = this
        var param = {
            telephone:that.telephone,
            sessionId:that.sessionId,
            // telephone:'18622222222',
            // sessionId:'b657445f618a4af5aafa13b225108d03',
        }
        getGiftPacksInfo(param).then(res => {
            let data = res.data;
            console.log(data.data.isNewUser)
            if (+data.code == 0) {
                if(data.data.isNewUser){ //新手
                    that.isUserType =3
                    console.log(that.isUserType)
                    that.cmsNewUserDepositList = data.data.cmsNewUserDepositList; //新手标
                    that.deductibleList = data.data.deductibleList ; //优惠卷
                    that.registerSource =data.data.registerSource; //注册渠道
                    that.price = data.data.newUserGoldInfo.marketPrice //特价金
                }else{ //老用户
                    that.isUserType=1
                }
            } else {
                if (data.msg) {
                    GB.utils.htoast(data.msg);
                }
            }
        });
    },
    goShare() {
      if (!this.telephone) {
        this.callAppLogin();
        return;
      }
      var params_shared = {
        type: "1", //分享类型 1：新闻类分享  2：截图分享
        code: this.shareCode, //活动code，分享统计标示
        needLogin: "1",
        platform: "0", //0:弹出选择平台 1:微信好友 2:微信朋友圈 3：QQ好友 4：QQ空间 5：复制链接
        pushShareMark: "" //是否需要统计用户分享
      };
      GB.utils.callCustomMethod("share", params_shared);
    }
  },
  beforeMount() {

  }
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
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  // font-family: "PingFangSC-Semibold";
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
  height: 100%;
  .px2rem(padding-bottom,80);
  background: -moz-linear-gradient(top, #f42a25 0%, #fa3430 100%);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, #fa3430),
    color-stop(100%, #f22625)
  );
  background: -moz-linear-gradient(top, #f42a25 0%, #fa3430 100%);
  background: -webkit-linear-gradient(top, #f42a25 0%, #fa3430 100%);
  background: -o-linear-gradient(top, #f42a25 0%, #fa3430 100%);
  background: -ms-linear-gradient(top, #f42a25 0%, #fa3430 100%);
  background: linear-gradient(to bottom, #f42a25 0%, #fa3430 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#FA3430',GradientType=0 );
  header {
    margin: 0 auto;
  }
  .User {
    .UserHeader {
      .bg-img("header.png",750,627);
    }
    .px2rem(padding-bottom,104);
    .UserText {
      background: #ef1b17;
      border: 2px solid #ffd49e;
      text-align: center;
      color: #fff;
      position: relative;
      .px2px(font-size,28);
      .px2rem(border-radius,12);
      .px2rem(margin-left,20);
      .px2rem(margin-right,20);
      .px2rem(padding-top,170);
      .px2rem(padding-bottom,128);
      .textTitle {
        .px2px(font-size,40);
        .px2rem(margin-bottom,80);
        font-weight: bold;
      }
      .topLine {
        .bg-img("topline.png",710,38);
        position: absolute;
        top: -2px;
        left: -2px;
      }
      .bottomLine {
        .bg-img("topline.png",710,38);
        transform: rotate(180deg);
        -ms-transform: rotate(180deg); /* IE 9 */
        -moz-transform: rotate(180deg); /* Firefox */
        -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
        -o-transform: rotate(180deg);
        position: absolute;
        bottom: -2px;
        left: -2px;
      }
    }
  }
  .noUser {
    .noUserHeader {
      .bg-img("noUser.png",750,888);
      .px2rem(margin-bottom,102);
    }
    .button {
      .bg-img("button.png",630,96);
      text-align: center;
      margin: 0 auto;
      .px2rem(line-height,96);
      .px2px(font-size,40);
      color: #a50400;
    }
  }
  .newUser {
    .newUserHeader {
      .bg-img("header.png",750,627);
    }
    /*********common.css start*********/
    .newUserText,
    .Coupon,
    .redBag {
      background: #ef1b17;
      border: 2px solid #ffd49e;
      position: relative;
      color: #353535;
      .px2rem(margin-bottom,40);
      .px2rem(margin-left,20);
      .px2rem(margin-right,20);
      .px2rem(border-radius,12);
      .px2rem(padding-bottom,50);
      .px2rem(padding-top,30);
      .titleOne{
        .px2rem(width,310);
         margin: 0 auto;
      }

      .titleTwo{
        .px2rem(width,220);
        margin: 0 auto;
      }
       .titleThree{
        .px2rem(width,440);
        margin: 0 auto;
       }
      .targTitle {
        font-family: "PingFangSC-Semibold";
        .px2px(font-size,36);
        color: #ffffff;
        // width: 40%;
        // margin: 0 auto;
        span {
          float: left;
        }
        .titleLeft {
          .bg-img("titleLeft.png",38,26);
          display: block;
          .px2rem(margin-top,12);
          .px2rem(margin-right,12);
        }
        .titleRight {
          .bg-img("titleRight.png",38,26);
          display: block;
          .px2rem(margin-top,12);
          .px2rem(margin-left,12);
        }
      }
      .topLine {
        .bg-img("topline.png",710,38);
        position: absolute;
        top: -2px;
        left: -2px;
      }
      .bottomLine {
        .bg-img("topline.png",710,38);
        transform: rotate(180deg);
        -ms-transform: rotate(180deg); /* IE 9 */
        -moz-transform: rotate(180deg); /* Firefox */
        -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
        -o-transform: rotate(180deg);
        position: absolute;
        bottom: -2px;
        left: -2px;
      }
      .footerTip{
        text-align: center;
        .px2rem(margin-top,40);
        .px2px( font-size,24);
        color: #FFFFFF;
      }
    }
    /*********common.css end*********/
    .newUserText {
      .targ {
        .bg-img("targe1.png",630,227);
        margin: 0 auto;
        .px2rem(margin-top,40);
        .px2rem(padding-left,40);
        .px2rem(padding-right,40);
        .px2rem(padding-top,20);
        .px2rem(padding-bottom,20);
        .targTop {
           font-family: "PingFangSC-Semibold";
          .px2px( font-size,28);
          .px2rem(margin-bottom,20);
          color: #353535;
          .topTip {
            .bg-img("new.png",162,34);
            display: block;
            float: left;
            .px2rem(margin-left,10);
            .px2rem(margin-top,3);
          }
        }
        .targBottom {
          // border-top:1px dotted #DCDCE0;
          .targNumber {
            .px2rem(margin-top,7);
            span:first-child {
              .px2px(font-size,62);
              color: #f15c00;
              letter-spacing: 0;
              font-weight: bold;
              font-family: "DINAlternate-Bold";
            }
            span:last-child {
              .px2px(font-size,30);
              color: #f15c00;
            }
          }
          .targGray {
            .px2px(font-size,24px);
            color: #96969a;
            .px2rem(margin-top,-8);
           
          }
          .strikethrough{
             text-decoration:line-through
          }
          .rightText {
             font-family: "PingFangSC-Semibold";
            .px2px(font-size,32px);
            color: #4a4a4a;
            .px2rem(margin-top,50);
          }
        }
      }
    }
  }
  //youhuijuan
  .Coupon {
    .targTitle {
      .px2px(font-size,36);
      color: #ffffff;
      width: 30%;
      margin: 0 auto;
    }
    .couponText {
      .px2rem(margin-top,40);
      .px2rem(margin-left,40);
      .px2px(font-size,24);
      .px2rem(padding-left,40);
      .px2rem(padding-top,10);
      color: #4a4a4a;
      .bg-img("targe2.png",630,167);
      div.leftText {
          font-family: "DINAlternate-Bold";
        .px2px(font-size,32);
         .px2rem(margin-top,6);
        color: #b44501;
        .px2rem(width,166);
        div span {
          .px2px(font-size,60);
        }
      }
      div.rightText {
        .px2rem(margin-left,62);
        div:first-child {
          .px2rem(margin-top,30);
          .px2rem(margin-bottom,26);
        }
      }
    }
  }
  //hongbao
  .redBag {
   padding-bottom:25px !important;
   .redBagContent{
    .px2rem(width,630);
      margin: 0 auto;
      .px2rem(margin-top,30);
      .px2rem(border-radius,8);
      background: #FFFFFF;
      .px2rem(padding-top,56);
      .px2rem(padding-bottom,40);
      box-shadow: 0 0 24px 0 rgba(0,0,0,0.08);
      .redBagbg{
        .bg-img("redbag.png",256,310);
        
         margin: 0 auto
      }
   }
  }
  .userFooter{
    text-align: center;
   
    .footerButton{
       font-family: "PingFangSC-Semibold";
      .bg-img("button.png",630,96);
      .px2px( font-size,40);
      .px2rem(line-height,96);
       color: #A50400;
       margin: 0 auto;
      .px2rem(margin-top,80);
    }
  }
}
:root .index-page {
  filter: none;
}

/* iphone5 */
@media screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2){
 .index-page .newUser .newUserText .targ{
      .bg-img("targe1.png",630,250);
        margin: 0 auto;
        .px2rem(margin-top,40);
        .px2rem(padding-left,40);
        .px2rem(padding-right,40);
        .px2rem(padding-top,20);
        .px2rem(padding-bottom,20);
 }
  .index-page .Coupon .couponText {
      .px2rem(margin-top,40);
      .px2rem(margin-left,40);
      .px2px(font-size,24);
      .px2rem(padding-left,40);
      .px2rem(padding-top,10);
      color: #4a4a4a;
      .bg-img("targe2.png",630,190);
  }
  .index-page .newUser .newUserText .targTitle{
    width: 45% !important;
    margin:0 auto;
  }
 .index-page .newUser .Coupon .titleTwo{
   width: 33%;
   margin:0 auto;
 }
}

//iphoneX、iphoneXs
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .index-page {
            padding-bottom: 30px !important;
        }
    }

    //iphone Xs Max
    @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
        .index-page {
            padding-bottom: 30px !important;
        }
    }

    //iphone XR
    @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
        .index-page {
            padding-bottom: 30px !important;
        }
    }

</style>
