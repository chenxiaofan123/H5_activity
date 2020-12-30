<template>
    <div class="container">
        <div class="detail-header-model">
            <div class="headers">
              <div class="_header">
                <p>目标年化回报率</p> 
                <p><span>{{annualInterestRate}}<span>%</span></span></p>
              </div> 
              <div class="detail">
                <div>
                  <p class="textFont">锁定期限(天)</p> 
                  <p>{{duration}}</p>
                </div> 
                <div class="line"></div> 
                <div>
                  <p class="textFont">起投金额(元)</p> 
                  <p>{{limitAmount}}</p>
                </div>
              </div>
            </div>
           <div class="hengfeng-model"><span class="icon"></span> <span>新网银行资金全程存管</span></div>
        </div>
        <div class="detail-intro-model">
          <div class="intro-part-1">
            <div @click="gotoPro">
              <p>产品信息</p> 
              <p class="_right"></p>
            </div> 
            <div @click="gotoSource">
              <p>标的来源</p> 
              <p class="_right"></p>
            </div> 

          </div>
        </div>
        <div class="step-intro-model">
          <div>
            <div><span></span></div> 
            <div><p>今日加入</p> <p>立即匹配</p></div>
          </div> 
          <div><div><span></span></div> <div><p>出借成功</p> <p>开始计息</p></div></div> 
          <div><div><span></span></div> <div><p>30天锁定期限</p> <p></p></div></div>
          <div><div><span></span></div> <div><p>30天后自动发起转让</p> <p></p></div></div>  <div><div><span></span></div> <div><p>等待其他出借人受让转让债权</p> <p>时间说明：债权转让所需时间，根据市场情况，<br>出借活跃度决定；</p></div></div> <div><div><span></span></div> <div><p>债权全部转让成功</p> <p>本息回款到存管余额中</p></div></div> <div><div><span></span></div> <div><p>申请提现至银行卡</p> <p></p></div></div> <div><div><span></span></div> <div><p>提现完成</p> <p>预计1-3个工作日到账</p></div></div></div>
        <div class="detail-intro-model"><div class="telephone-model" @click="callPhone"><div class="tel"><p class="p1">4000-339-993</p> <p class="p2">客服电话(工作日 9:00-21:00 非工作日 10:00-15:00)</p></div> <div class="_right"></div></div></div>
        <div class="invest-tips">
            <img src="./res/invest-tips.png" alt="">
        </div>
        <div class="fixed-footer-model bottom-menu-fixed">
          <div class="option-model">
            <div class="caculator-model">
              <div class="button" @click="gotoHome">请回到活动主页进行出借</div>
            </div>
          </div>
        </div>
     </div>
</template>

<script>
export default {
  data() {
    return {
      annualInterestRate: "",
      duration: "",
      limitAmount: "",
      version:""
    };
  },
  activated() {
    window.scrollTo(0, 0);
  },
  created() {
    this.annualInterestRate = this.GetQueryString("annualInterestRate");
    this.duration = this.GetQueryString("duration");
    this.limitAmount = this.GetQueryString("limitAmount");
    this.version = this.GetQueryString("version");
  },
  methods: {
    gotoPro() {
      location.href = webV2Path + "/html/pages/autoInvest/productIntro.html";
    },
    gotoSource() {
      location.href = webV2Path + "/html/pages/autoInvest/sourceDetail.html";
    },
    gotoHome() {
      // location.href = basePath + "/html/pages/dailyBid/?version="+this.version;
        GB.utils.callCustomMethod("goBack", {});
    },
    callPhone() {
      GB.utils.callServicePhone();
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

<style lang="less" scoped>
@import "../../../statics/less/base/method.less";
.img(@width, @height, @imgurl) {
  .px2rem(height, @height);
  .px2rem(width, @width);
  background: url(@imgurl) no-repeat;
  background-size: 100% 100%;
}
.container {
  width: 100%;
  height: auto;
  min-height: 100%;
  background: #f5f5f5;
  .detail-header-model .headers {
    color: #fff;
    background: #005eff;
    background-image: -webkit-linear-gradient(
      -180deg,
      #005eff 0%,
      #3e82f7 100%
    );
    background-image: linear-gradient(-180deg, #005eff 0%, #3e82f7 100%);
    padding-top: 0.74666667rem;
    box-sizing: border-box;
    text-align: center;
  }
  .detail-header-model ._header {
    text-align: center;
    .px2px(font-size, 14);
  }
  .detail-header-model ._header {
    .px2px(font-size, 28);
  }
  .detail-header-model ._header {
    .px2px(font-size, 35);
  }
  .detail-header-model ._header p:last-child {
    line-height: 1;
    margin-top: 2px;
    margin-bottom: 0.53333333rem;
    .px2px(font-size, 36);
  }
  .detail-header-model ._header p:last-child {
    .px2px(font-size, 72);
  }
  .detail-header-model .newer-icon2 {
    position: absolute;
    width: 2.13333333rem;
    right: 0;
    top: 0.69333333rem;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    border-top-left-radius: 0.8rem;
    border-bottom-left-radius: 0.8rem;
    border: 1px solid #fff;
    border-right: 0;
  }
  .detail-header-model .newer-icon {
    height: 0.53333333rem;
    line-height: 0.53333333rem;
    text-align: center;
    border: 1px solid #ffffff;
    border-radius: 0.53333333rem;
    margin: 0 auto;
    margin-bottom: 0.08rem;
    display: inline-block;
    padding-left: 0.08rem;
    padding-right: 0.08rem;
  }
  .detail-header-model .newer-icon-div {
    margin-bottom: 0.08rem;
    .px2px(font-size, 10);
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
  }
  .detail-header-model .newer-icon-div {
    .px2px(font-size, 20);
  }
  .detail-header-model .equalInterest {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  .detail-header-model .detail {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding: 0.37333333rem;
    box-sizing: border-box;
    margin-top: 0.08rem;
    background: rgba(255, 255, 255, 0.08);
    .px2px(font-size, 18);
  }
  .detail-header-model .detail {
    .px2px(font-size, 36);
  }
  .detail-header-model .detail > div {
    text-align: center;
    .px2px(font-size, 18);
  }
  .detail-header-model .detail > div {
    .px2px(font-size, 36);
  }
  .detail-header-model .detail > div .textFont {
    .px2px(font-size, 14);
  }
  .detail-header-model .detail > div .textFont {
    .px2px(font-size, 28);
  }
  .detail-header-model .detail .line {
    width: 1px;
    height: 0.85333333rem;
    background: #fff;
    margin-left: 1.42666667rem;
    margin-right: 1.42666667rem;
  }
  .detail-header-model .hengfeng-model {
    background: #fff;
    color: #4a4a4a;
    height: 1.25333333rem;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    .px2px(font-size, 12);
  }
  .detail-header-model .hengfeng-model {
    .px2px(font-size, 24);
  }
  .detail-header-model .hengfeng-model .icon {
    background-image: url(./res/xinwang-icon.png);
    background-repeat: no-repeat;
    width: 0.72rem;
    height: 0.3066667rem;
    display: block;
    margin-right: 0.18666667rem;
    background-size: 100% 100%;
  }
  .detail-intro-model .intro-part-1 {
    background: #fff;
    padding-left: 0.53333333rem;
    margin-top: 0.26666667rem;
  }
  .detail-intro-model .intro-part-1 > div {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: space-between;
    -webkit-justify-content: space-between;
    -ms-flex-pack: space-between;
    justify-content: space-between;
    padding-top: 0.36rem;
    padding-bottom: 0.36rem;
    .px2px(font-size, 16);
    color: #333333;
  }
  .detail-intro-model .intro-part-1 > div {
    //   font-size: 32px;
    .px2rem(font-size, 32);
  }
  .detail-intro-model .intro-part-1 > div:not(:last-child) {
    border-bottom: 1px solid #e0e0e0;
  }
  .detail-intro-model .intro-part-1 > div .spe {
    // font-size: 14px;
    .px2rem(font-size, 14);
    color: #c0c0c0;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .detail-intro-model .intro-part-1 > div .spe {
    .px2rem(font-size, 28);
  }
  .detail-intro-model .intro-part-1 > div .spe ._right {
    margin-left: 0.10666667rem;
  }
  .detail-intro-model .intro-part-1 > div span {
    display: block;
  }
  .detail-intro-model ._right {
    background-image: url("./res/_right.png");
    background-size: 100% 100%;
    width: 0.21333333rem;
    height: 0.48rem;
    margin-right: 0.26666667rem;
  }
  .detail-intro-model .telephone-model {
    background: #fff;
    padding-left: 0.53333333rem;
    margin-top: 0.26666667rem;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: space-between;
    -webkit-justify-content: space-between;
    -ms-flex-pack: space-between;
    justify-content: space-between;
    padding-top: 0.26666667rem;
    padding-bottom: 0.26666667rem;
  }
  .detail-intro-model .telephone-model .tel .p1 {
    .px2px(font-size, 16);
    color: #333333;
  }
  .detail-intro-model .telephone-model .tel .p1 {
    .px2px(font-size, 32);
  }
  .detail-intro-model .telephone-model .tel .p2 {
    .px2px(font-size, 12);
    color: #9b9b9b;
  }
  .detail-intro-model .telephone-model .tel .p2 {
    .px2px(font-size, 24);
  }
  .invest-tips {
    img {
      display: block;
      .img(296, 44, "./res/invest-tips.png");
      margin: 0 auto;
    }
    background: #f5f5f5;
    .px2rem(padding-top, 40);
    .px2rem(padding-bottom, 200);
  }
  .step-intro-model {
    background: #fff;
    .px2rem(padding, 60);
    .px2rem(padding-left, 40);
    padding-right: 0;
    padding-bottom: 0;
    .px2rem(margin-top, 20);
    & > div {
      display: flex;
      border-left: 1px solid #d5d5d5;
      .px2rem(padding-bottom, 35);
      .px2rem(min-height, 75);
      box-sizing: border-box;
      &:last-child {
        border-left: 0;
      }
      & > div:first-child {
        .px2rem(width, 26);
        .px2rem(height, 26);
        background-color: #fff;
      }
      span:first-child {
        display: block;
        /* .px2rem(width,24);
                .px2rem(height,24);*/
        width: 12px;
        height: 12px;
        border-radius: 100%;
        border: 2px solid #d5d5d5;
        box-sizing: border-box;
        .px2rem(margin-left, -12);
        background: #fff;
        position: relative;
      }
      & > div:last-child {
        .px2rem(margin-left, 30);
        .px2px(font-size, 24);
        color: #c0c0c0;
        p:first-child {
          .px2px(font-size, 28);
          color: #333333;
          .px2rem(margin-bottom, 10);
          line-height: 1;
        }
      }
    }
  }
  .fixed-footer-model {
    background: #fff;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    box-shadow: 0 0 2px #d5d5d5; /*.px2rem(height,180);*/
  }
  .fixed-footer-model .percent {
    background: #ff3d3d;
    height: 2px;
    width: 30%;
  }
  .fixed-footer-model .option-model {
    padding: 0.26666667rem;
    box-sizing: border-box;
  }
  .fixed-footer-model .option-model p {
    .px2px(font-size, 14);
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    color: #c0c0c0;
  }
  .fixed-footer-model .option-model p {
    .px2px(font-size, 28);
  }
  .fixed-footer-model .option-model p .speColor {
    color: #ff3d3d;
  }
  .fixed-footer-model .option-model p > span {
    display: block;
  }
  .fixed-footer-model .option-model p > span.line {
    background: #d5d5d5;
    width: 1px;
    height: 0.4rem;
    margin-left: 0.32rem;
    margin-right: 0.32rem;
  }
  .fixed-footer-model .option-model .caculator-model {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: space-between;
    -webkit-justify-content: space-between;
    -ms-flex-pack: space-between;
    justify-content: space-between;
    margin-top: 0.26666667rem;
  }
  .fixed-footer-model .option-model .caculator-model .caculator {
    background: #005eff;
    background-image: -webkit-linear-gradient(45deg, #005eff 0%, #3e82f7 100%);
    background-image: linear-gradient(45deg, #005eff 0%, #3e82f7 100%);
    border-radius: 0.10666667rem;
    width: 1.28rem;
    height: 1.28rem;
    padding-top: 0.32rem;
    box-sizing: border-box;
  }
  .fixed-footer-model .option-model .caculator-model .caculator .img {
    background-image: url("./res/caculator-img.png");
    background-size: 100% 100%;
    width: 0.58666667rem;
    height: 0.64rem;
    margin: 0 auto;
  }
  .fixed-footer-model .option-model .button {
    color: #ffffff;
    .px2px(font-size, 18);
    width: 7.92rem;
    height: 1.28rem;
    line-height: 1.28rem;
    text-align: center;
    background: #005eff;
    background-image: -webkit-linear-gradient(45deg, #005eff 0%, #3e82f7 100%);
    background-image: linear-gradient(45deg, #005eff 0%, #3e82f7 100%);
    border-radius: 0.10666667rem;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .fixed-footer-model .option-model .button {
    .px2px(font-size, 36);
  }
  .fixed-footer-model .option-model .button.noClick {
    background: #e0e0e0;
  }
  .why-intro-model {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    background: rgba(0, 0, 0, 0.3) center center no-repeat;
    display: none;
  }
  .pop-risk-waring {
    width: 90%;
    left: 50%;
    top: 50%;
    background: #ffffff;
    border-radius: 0.10666667rem;
    position: fixed;
    z-index: 100000000;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    padding: 0 5%;
    padding-top: 0.53333333rem;
    padding-bottom: 0.53333333rem;
    box-sizing: border-box;
  }
  .pop-risk-waring .source-title {
    .px2px(font-size, 16);
    color: #333333;
    line-height: 1.5;
  }
  .pop-risk-waring .source-title {
    .px2px(font-size, 32);
  }
  .pop-risk-waring .close {
    width: 0.53333333rem;
    float: right;
  }
  .pop-risk-waring .content {
    background: #fff;
    .px2px(font-size, 14);
    color: #9b9b9b;
    padding-top: 0;
  }
  .pop-risk-waring .content {
    .px2px(font-size, 28);
  }
  .pop-risk-waring .content p {
    background: #fff;
    .px2px(font-size, 14);
    color: #9b9b9b;
    margin-top: 0.10666667rem;
  }
  .pop-risk-waring .content p {
    .px2px(font-size, 26);
  }
}
</style>