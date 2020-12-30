<template>
    <div class="wx-landing-page" v-cloak>
       <header  ref='banner'>
         <p class="head-text">
           <span></span>
           <span>我一直用黄金钱包，你也来试试~</span>
         </p>
         <p class="intro-tips"><span>{{totalUserIntHandle}}</span><span></span></p>
       </header>
       <article>
           <div class="total-modal">
               <div>
                   <p>累计成交金额</p>
                   <p><span>{{totalMoneyHandle}}</span>亿</p>
               </div>
               <div>
                   <p>累计服务用户</p>
                   <p><span>{{totalUserHandle}}</span>万人</p>
               </div>
               <div>
                   <p>安全运营</p>
                   <p><span>{{safeOperationYear}}</span>天</p>
               </div>
           </div>
           <!-- 银行全程资金存管 start-->
           <div class="register-modal"  ref='register'>
               <p class="title-modal">
                   <span></span>
                   <span>银行全程资金存管</span
                   ><span></span>
                </p>
                <v-registerModal 
                @register='register'
                :userCode="userCode"
                :channelCode="channelCode"
                :salesmanCode="salesmanCode"
                :registSource="registSource"
                :registerStyle="registerStyle">
                </v-registerModal>
                <p class="reg-tips">*注册同时会帮你完成手机号和微信账号的绑定</p>
           </div>
           <!-- 银行全程资金存管 end-->
           <!-- 银行系·顶级风投共同入股 start -->
           <div class="bank-modal">
                <p class="title-modal">
                   <span></span>
                   <span>银行系·顶级风投共同入股</span><span></span>
                </p>
                <v-investInfo :bgColor="investBgColor" :textColor="investTextColor"></v-investInfo>
           </div>
           <!-- 银行系·顶级风投共同入股 end -->
           <!-- 他们也在用黄金钱包 start -->
           <div class="use-modal">
              <p class="title-modal">
                   <span></span>
                   <span>他们也在用黄金钱包</span><span></span>
              </p>
              <div class="hjzzd-modal">
                 <div class="title-intro">
                   <span></span>
                   <div>
                     <p>每日互金早知道</p>
                     <p>权威互联网金融资讯平台</p>
                   </div>
                 </div>
                 <p>黄金钱包的黄金投资非常方便，用户可以在网上直接操作黄金实物投资，而闲置黄金也可以线上售出，收费透明，除此以外，黄金钱包还兼有网贷出借产品，方便固收投资，投资更为全面。</p>
              </div>
              <div class="hjzzd-modal">
                 <div class="title-intro">
                   <span class="wlx"></span>
                   <div>
                     <p>王立新</p>
                     <p>中银渤海产业投资基金 · 代总经理</p>
                   </div>
                 </div>
                 <p>黄金钱包致力于个人黄金资产灵活配置，为普通消费者和投资者提供“方便，低价，全面”的黄金服务。同时黄金钱包提供的网贷服务，风控严格独具特色，这在业界是首屈一指的。</p>
              </div>
           </div>
           <!-- 他们也在用黄金钱包 end -->
           <!-- 受行业认可，值得投资者信赖 start -->
           <div class="invest-modal">
              <p class="title-modal">
                   <span></span>
                   <span>受行业认可，值得投资者信赖</span><span></span>
              </p>
               <!-- 弹幕区域 start-->
              <div class="active-model">
               <div id="barrage" class="barrage">
                <div :style="{height:linehei+'px'}" :key="index" class="line" v-for="(item,index) in count">
                 <barrage-item :list="listArr" :height="linehei" :index="index"></barrage-item>
                </div>
               </div>
             </div>
            <!-- 弹幕区域 end-->
           </div>
           <!-- 受行业认可，值得投资者信赖 end -->
           <!-- 优质合作伙伴 start -->
            <div class="coPartner">
              <p class="title-modal">
                   <span></span>
                   <span>优质合作伙伴</span><span></span>
              </p>
              <div class="icon-modal">
                <p class="eval">
                  <span class="heima"></span>
                  <span class="arui"></span>
                  <span class="sohu"></span>
                </p>
                <p class="eval">
                  <span class="kr-img"></span>
                  <span class="youku"></span>
                  <span class="aqy"></span>
                </p>
              </div>
           </div>
           <!-- 优质合作伙伴 end  -->
           <!-- 立即注册送新手惊喜礼包 start-->
           <div class="newer-package">
              <p class="title-modal">
                   <span></span>
                   <span>立即注册送新手惊喜礼包</span><span></span>
              </p>
              <div class="autoInvest">
                <p class="top">
                  <span>安心智选15天</span>
                  <span>新手专享</span>
                </p>
                <p class="left_recyle"></p>
                <p class="right_recyle"></p>
                <p class="line"></p>
                <div class="detail">
                  <div>
                    <p><span>12.0</span>%</p>
                    <p>目标年化回报率</p>
                  </div>
                  <div>
                    <p>出借期15天</p>
                    <p>银行全程存管</p>
                  </div>
                </div>
              </div>
              <div class="newerPackage">
                <p class="top top2">
                  <span></span>
                  <span>新手专享</span>
                </p>
                 <div class="detail detail2">
                  <div>
                    <p><span>880</span>元</p>
                    <p>礼包总价值</p>
                  </div>
                  <div>
                    <p>新手大礼包</p>
                    <p>限时领取</p>
                  </div>
                </div>
              </div>
           </div>
           <!-- 立即注册送新手惊喜礼包 end-->
           <p class="marketWarn"></p>
       </article>
       <div class="footer-text">
         <p class="text1">4000-339-993</p>
         <p class="text2">工作日 9:00-21:00  非工作日 10:00-15:00</p>
         <p class="text3">
           Copyright © G-banker.com, All Rights Reserved. <br/>
           北京盈衍网络科技有限公司<br/>
            京ICP备14027891号-1  |  京ICP证160991号
         </p>
       </div>
       <footer v-show="isShowFooter">
         <div class="fixed" @click="goBackRegister">
             <div>注册领取880元礼包</div>
         </div>
       </footer>
       <v-modalTip v-show="modalShow">
         <div class="modal-div">
             <p class="close" @click="modalShow=false"></p>
             <div class="modal-content" v-show="isNewer=='false'">
               <p>您已经注册过黄金钱包户<br/>去参加其他活动吧</p>
               <p class="confirm"  @click="closeModal($event)">确定</p>
             </div>
             <div class="modal-content" v-show="isNewer=='true'">
               <p>注册成功，快来APP领礼包吧</p>
               <p class="confirm" @click="openApp($event)">领取</p>
             </div>
          </div>
       </v-modalTip>
    </div>
</template>
<script>
import util from "../../utils/tool.js";
import wxShare from "../../commonScript/wxShare.js";
import { openApp } from "../../commonScript/download.js";
import tongdun from "../../utils/tongdun.js";
import barrageItem from "./components/barrage-item.vue";
import { findHomeInfo } from "../../service/common/info/service.js";
//import{getNewUserGoldInfo} from '../../service/common/info/service.js';
export default {
  data() {
    return {
      userCode: "",
      channelCode: "",
      salesmanCode: "",
      registSource: "",

      totalUser: "", //累计服务用户
      totalMoney: "", //累计交易额
      safeOperationYear: "", //安全运营
      //组件配置
      investBgColor:'#f9f9f9',
      investTextColor:'#96969a',
      
      registerStyle:{
        authCodeColor:'',
        buttonColor:''
      },
      modalShow: false,
      isShowFooter: false,
      linehei: 0,
      linecount: 3,
      isNewer: "",
      count: [{}, {}, {}],
      listArr: [
        "2018胡润新金融百强榜“科技创新奖”",
        "中国黄金市场创新联席会常务副理事长单位",
        "国家高新技术企业",
        "2016中国财经峰会“企业创新典范奖”",
        "上海市互联网金融行业协会首批会员",
        "创业邦“2015中国年度创新成长企业100强”",
        "中国黄金协会第三届理事会常务理事单位"
      ]
    };
  },
  watch: {},
  filters: {},
  components: {
    barrageItem
  },
  mounted() {
    this.userCode = GB.utils.GetRequest()["userCode"];
    this.channelCode = GB.utils.GetRequest()["channelCode"];
    this.salesmanCode = GB.utils.GetRequest()["salesmanCode"];
    this.registSource = GB.utils.GetRequest()["registSource"];
    this.shareCode = GB.utils.GetRequest()["shareCode"];
    tongdun();
    this.findHomeInfo();
    wxShare.getShareInfo(this.userCode, this.shareCode);
    let barrageHei = window.getComputedStyle(
      document.getElementById("barrage"),
      null
    )["height"];
    this.linehei = parseInt(barrageHei) / this.linecount;
    window.addEventListener("scroll", this.handleScroll);
  },
  computed: {
    totalUserHandle() {
      return (this.totalUser / 10000).toFixed(2);
    },
    totalUserIntHandle() {
      let length = (((this.totalUser / 10000).toFixed(2) + "").split(".")[0] +'').length;
      let total = Math.floor((((this.totalUser / 10000).toFixed(2) + "").split(".")[0]/Math.pow(10,length-1)));
      return total*Math.pow(10,length-1);
    },
    totalMoneyHandle() {
      return (this.totalMoney / 10000000000).toFixed(2);
    }
  },
  methods: {
    handleScroll: function(event) {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var bannerH = this.$refs.banner.offsetHeight;

      var regBlockH = this.$refs.register.offsetHeight;
      var AllHeight = bannerH + regBlockH;
      if (scrollTop > AllHeight) {
        this.isShowFooter = true;
      } else {
        this.isShowFooter = false;
      }
    },
    closeModal(e){
      this.$sa.quick("trackHeatMap", e.currentTarget);
      this.modalShow=false;
    },
    goBackRegister() {
      $("body,html").animate({ scrollTop: 0 }, 500);
    },
    findHomeInfo() {
      findHomeInfo().then(res => {
        var result = res.data;
        var msg = result.msg;
        if (+result.code == 0) {
          this.totalUser = result.data.totalUser;
         // this.totalUser = 8973678;
          this.totalMoney = result.data.totalMoney;
          this.safeOperationYear = result.data.safeOperationYear;
        } else {
          if (msg) {
            util.toast(msg);
          }
        }
      });
    },
    register(i) {
      switch (i) {
        case 0:
          this.isNewer = "false";
          this.modalShow = true;
          break;
        case 1:
          this.isNewer = "true";
          this.modalShow = true;
          break;
        case 2:
          break;  
      }
    },
    openApp(e) {
      this.$sa.quick("trackHeatMap", e.currentTarget);
      openApp();
    }
  },
  beforeMount() {}
};
</script>
<style lang="less"  scoped>
@import "../../../statics/less/base/method.less";
@import "../../less/special.less";
.barrage {
  height: 100%;
}
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
.padding {
  .px2rem(padding-left,40);
  .px2rem(padding-right,40);
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

.wx-landing-page {
  font-family: "DIN-Regular", "黑体";
  header {
    .bg-img("banner.png",750,660);
    .px2rem(padding-top,24);
    .head-text {
      display: flex;
      .px2rem(border-radius,35);
      background: rgba(255, 255, 255, 0.26);
      .px2rem(width,520);
      .px2rem(padding-right,20);
      .px2rem(height,70);
      .px2rem(font-size,24);
      .px2rem(margin-left,43);

      color: #fff;
      display: flex;
      align-items: center;
      span {
        display: block;
      }
      span:first-child {
        .bg-img("head-portrait.png",70,70);
        .px2rem(margin-right,20);
      }
    }
    .intro-tips {
      text-align: center;
      .px2rem(font-size,70);
      .px2rem(margin-top,32);
      //letter-spacing: 1px;
      font-family: "DIN-Bold";
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      span:first-child {
        text-shadow: 2px 3px 0px rgba(124, 0, 0, 0.1);
        .px2rem(margin-bottom,10);
      }
      span:last-child {
        .bg-img("head-text-img.png",546,73);
      }
    }
  }
  article {
    .px2rem(width,710);
    margin: 0 auto;
    .px2rem(margin-top,-200);
    background-color: #fff;
    .px2rem(border-radius,16);
    .px2rem(padding-bottom,20);
    .px2rem(margin-bottom,110);
    .total-modal {
      display: flex;
      justify-content: space-between;
      .padding();
      .px2rem(padding-top,26);
      .px2rem(margin-bottom,50);
      & > div {
        .px2rem(border-radius,8);
        .px2rem(width,198);
        .px2rem(min-height,120);
        text-align: center;
        .px2px(font-size,24);
        color: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        span {
          .px2px(font-size,30);
          .px2rem(margin-right,5);
        }
        &:first-child {
          background-image: linear-gradient(-45deg, #ffa800 0%, #ffde86 100%);
        }
        &:nth-child(2) {
          background-image: linear-gradient(135deg, #ffb371 0%, #ff6f2e 100%);
        }
        &:last-child {
          background-image: linear-gradient(-45deg, #ffa800 0%, #ffde86 100%);
        }
      }
    }
    .title-modal {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #4a4a4a;
      .px2px(font-size,36);
      font-weight: bold;
      .px2rem(margin-bottom,40);
      span {
        display: block;
      }
      span:nth-child(2) {
        .px2rem(margin-left,14);
        .px2rem(margin-right,14);
      }
      span:first-child {
        .bg-img("icon_right.png", 38, 26);
      }
      span:last-child {
        .bg-img("icon_left.png", 38, 26);
      }
    }
    .register-modal {
      .px2rem(margin-bottom,120);
      .reg-tips{
        text-align: center;
        .px2rem(margin-top,20);
        color: #B4B4B8;
        .px2px(font-size,24);
      }
    }
    .bank-modal {
      .px2rem(margin-bottom,100);
    }
    .use-modal {
      .px2rem(padding-left,40);
      .px2rem(padding-right,40);
      color: #4a4a4a;
      .px2px(font-size,28);
      .px2rem(line-height,44);
      .hjzzd-modal {
        background: #f9f9f9;
        .px2rem(border-radius,20);
        .px2rem(padding,30);
        .px2rem(padding-top,60);
        .px2rem(padding-bottom,60);
        .px2rem(margin-bottom,30);
      }
      .title-intro {
        display: flex;
        align-items: center;
        span {
          display: block;
        }
        .px2rem(margin-bottom,18);
        span {
          .bg-img("hjzzd.png",104,104);
          .px2rem(margin-right,20);
          &.wlx {
            .bg-img("wlx.png",104,104);
          }
        }
        > div {
          color: #9b9b9b;
          .px2px(font-size,24);
          p:first-child {
            color: #333333;
            .px2px(font-size,30);
            font-weight: bold;
            margin-bottom: 2px;
          }
        }
      }
    }
    .invest-modal {
      .title-modal {
        .px2rem(margin-bottom,30);
      }
      .active-model {
        .px2rem(height,360);
        padding-top: 10px;
        .px2rem(padding-top,50);
        .px2rem(padding-bottom,50);
        .px2rem(margin-bottom,50);
        box-sizing: border-box;
        position: relative;
      }
    }
    .coPartner {
      .px2rem(padding-left,40);
      .px2rem(padding-right,40);
      .px2rem(margin-bottom,100);
      .icon-modal {
        background: #f9f9f9;
        .px2rem( border-radius,20);
        .px2rem(padding,40);
        .px2rem(padding-top,60);
        .px2rem(padding-bottom,60);
        .eval {
          display: flex;
          justify-content: space-between;
          align-items: center;
          &:nth-child(2) {
            .px2rem(margin-top,30);
          }
          .heima {
            .bg-img("hm.png",170,88);
          }
          .arui {
            .bg-img("airui.png",170,88);
          }
          .sohu {
            .bg-img("sohu.png",170,88);
          }
          .kr-img {
            .bg-img("kr-img.png",170,88);
          }
          .youku {
            .bg-img("youku.png",170,88);
          }
          .aqy {
            .bg-img("aiqiyi.png",170,88);
          }
        }
      }
    }
    .newer-package {
      .px2rem(padding-left,40);
      .px2rem(padding-right,40);
      .top {
        .px2rem(height,87);
        .px2rem(line-height,87);
        color: #4a4a4a;
        .px2px(font-size,32);
        .px2rem(border-top-left-radius,8);
        .px2rem(border-top-right-radius,8);
        .px2rem(padding-left,52);
        display: flex;
        justify-content: space-between;
        span {
          display: block;
        }
        span:last-child {
          background-image: linear-gradient(135deg, #ffb371 0%, #ff6f2e 100%);
          // border-radius: 2px;
          .px2rem(border-top-left-radius,8);
          border-bottom-left-radius:2px;
          color: #ffffff;
          .px2px(font-size,24);
          .px2rem(height,41);
          .px2rem(line-height,41);
          .px2rem(padding,8);
          padding-top:0;
          padding-bottom:0;
          .px2rem(margin-top,16);
        }
      }
      .detail {
        .px2rem(padding-left,40);
        display: flex;
        align-items: flex-end;
        .px2rem(margin-top,10);
        .px2rem(padding-bottom,40);
        > div {
          p:last-child {
            .px2px(font-size,24) !important;
            color: rgba(68, 68, 68, 0.4);
          }
          &:first-child {
            color: #ff7a28;
            .px2rem(margin-right,117);
            p:first-child {
              font-family: "DIN-Bold", "黑体";
            }

            .px2px(font-size,38);
            span {
              .px2px(font-size,58);
            }
          }
          &:last-child {
            color: #4a4a4a;
            .px2px(font-size,32);
            p:first-child {
              .px2rem(margin-bottom,14);
            }
          }
        }
      }
      .autoInvest {
        background: #ffffff;
        box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.08);
        .px2rem(border-radius,8);
        // .bg-img("card_bg.png",678,300);
        position: relative;
        .px2rem(margin-bottom,30);
        .line {
          .px2rem(width,550);
          height: 1px;
          border-top: 1px dashed #dcdce0;
          margin: 0 auto;
        }

        // .left_recyle{
        //   position:absolute;
        //   .px2rem(width,30);
        //   .px2rem(height,30);
        //   border-radius: 100%;
        //   box-shadow: 0 0 12px 0 rgba(0,0,0,0.08);
        //   .px2rem(top,72);
        //   .px2rem(left,-15);
        // }
      }
      .newerPackage {
        background: #ffffff;
        box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.08);
        .px2rem(border-radius,8);
        .top2 {
          .px2rem(height,57);
          .px2rem(line-height,57);
        }
        .detail2 {
          margin-top:0;
          > div {
            &:first-child {
              .px2rem(margin-right,165);
            }
          }
        }
      }
    }
    .marketWarn {
      .bg-img("footer-tips.png",332,119);
      margin: 0 auto;
      .px2rem(margin-top,40);
    }
  }
  .footer-text {
    text-align: center;
    .px2rem(margin-top,110);
    color: #fff;
    .px2rem(padding-bottom,65);
    .text1 {
      .px2px(font-size,48);
    }
    .text2 {
      .px2px(font-size,24);
      .px2rem(margin-top,45);
    }
    .text3 {
      .px2px(font-size,20);
      color: rgba(255, 255, 255, 0.4);
      .px2rem(margin-top,65);
    }
  }
  footer {
    .fixed {
      .px2rem(height,136);
      background-color: #fff;
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      > div {
        background-image: linear-gradient(90deg, #ffb800 0%, #ff8700 100%);
        .px2rem(border-radius,8);
        text-align: center;
        color: #ffffff;
        .px2rem(height,96);
        .px2rem(line-height,96);
        .px2rem(width,670);
        .px2px(font-size,36);
        margin: 0 auto;
        .px2rem(margin-top,20);
        font-weight: bold;
      }
    }

    &:before {
      content: "";
      display: block;
      .px2rem(height,136);
    }
  }
  .modal-div {
    .px2rem(width,670);
    .close {
      .bg-img("close.png", 54, 94);
      .px2rem(margin-left,26);
    }
    .modal-content {
      width: 100%;
      background: #ffffff;
      box-shadow: 0 2px 10px 0 rgba(74, 74, 74, 0.26);
      .px2rem(border-radius,20);
      text-align: center;
      .px2rem(padding-top,115);
      .px2rem(padding-bottom,90);
      color: #333333;
      .px2px(font-size,32);
      p:first-child {
        .px2rem(min-height,100);
      }
      .confirm {
        background-image: linear-gradient(90deg, #ffb800 0%, #ff8700 100%);
        .px2rem(border-radius,44);
        text-align: center;
        .px2rem(width,550);
        .px2rem(height,88);
        .px2rem(line-height,88);
        color: #ffffff;
        margin: 0 auto;
        .px2rem(margin-top,45);
      }
    }
  }
}
</style>
