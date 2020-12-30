<template>
    <div class="index-page" v-cloak>
        <div class="newUser">
             <header class="newUserHeader"></header>
             <!-- 优惠标 -->
              <div class="newUserText">
                <div class="topLine"></div>
                 <div class="carList clearfix">
                    <div class="car1"></div>
                    <div class="car2"></div>
                    <div class="car3"></div>

                 </div>
                  <div class="targTitle titleOne clearfix">
                    <span class="titleLeft"></span>
                    <span>首次注册领取价值880元大礼包</span>
                    <span class="titleRight"></span>
                  </div>
                <!-- 注册区域-->
                <div class="register-div">
                    <div class="tel-div">
                        <input  type="tel" id="tel" maxlength="11" placeholder="请输入手机号码" @focus="inputfocus"  @blur="inputblur" v-model="dataObj.telephone" v-if="showObj.telephoneInputShow"/>
                        <div class="err" v-if="!showObj.telephoneInputShow" @click="repeatInput('1')">
                            <div class="err-logo"></div>
                            <div>{{dataObj.telErrInfo}}</div>
                        </div>
                    </div>
                    <div class="code-div">
                        <input type="text" id="autuCode" oninput="if(value.length>6)value=value.slice(0,6)" placeholder="请输入验证码" @focus="inputfocus"  @blur="inputblur" v-model="dataObj.authCode"  v-if="showObj.autuCodeInputShow"/>
                        <div class="err yzm" v-if="!showObj.autuCodeInputShow" @click="repeatInput('2')">
                            <div class="err-logo"></div>
                            <div>{{dataObj.autoCodeErrInfo}}</div>
                        </div>
                        <div class="line"></div>
                        <div class="getCode" v-show="!isSendSmg" @click="sendCode('1',$event)" id="send-button">{{{true:"重新发送",false:'获取验证码'}[isfirstTime]}}</div>
                        <div class="getCodeGray" v-show="isSendSmg">已发送{{SmgMinute}}s</div>
                    </div>
                    <div class="yuyin-div" v-show="!isSendYuyin">
                        收不到短信？ 使用
                        <span   @click="sendCode('2',$event)" id="yuyin-code">语音验证码</span>
                    </div>
                     <div class="yuyin-div" v-show="isSendYuyin">
                        收不到短信？ 使用
                        <span >语音验证码{{YuyinMinute}}</span>
                    </div>

                    <div class="agreen-div">
                        <span :class="{noclick:!checkedProtocal}" id="check" @click="checkBox($event)"></span>
                        <span>我已阅读并同意<span id="protocol" @click="protocol($event)">《黄金钱包使用协议》</span></span>
                    </div>
                    <div class="reg-btn">
                        <div id="reg-btn" @click="register($event)">注册立领大礼包</div>
                    </div>
                </div>
                <!-- 富多样的投资组合 -->
                <div class="group">
                  <div class="targTitle titleTwo clearfix">
                    <span class="titleLeft"></span>
                    <span>丰富多样的投资组合</span>
                    <span class="titleRight"></span>
                  </div>
                  <div class="targetList">
                        <div class="targ">
                            <div class="targTop clearfix"><span class='left'>安心智选30天</span><span class="topTip"></span></div>
                            <div class="targBottom clearfix">
                                <div class="left">
                                    <div class="targNumber"><span>7.20</span><span>+4.80%</span></div>
                                    <div class="targGray">目标年化回报率</div>
                                </div>
                                <div class="right rightText">
                                    锁定期30天
                                </div>
                            </div>

                        </div>
                          <div class="targ">
                            <div class="targTop clearfix"><span class='left'>臻选金条</span></div>
                            <div class="targBottom clearfix">
                                <div class="left">
                                    <div class="targNumber"><span>{{price}}</span><span></span></div>
                                    <div class="targGray">实时金价（元/克）</div>
                                </div>
                                <div class="right rightText">
                                    保值投资首选
                                </div>
                            </div>

                        </div>

                  </div>
                </div>
                <!-- 互联网黄金行业 -->
                <div class="industry">
                    <div class="targTitle titleThree clearfix" >
                        <span class="titleLeft"></span>
                        <span>黄金钱包&nbsp;|&nbsp;能买黄金能理财</span>
                        <span class="titleRight"></span>
                     </div>
                     <div class="pic clearfix">
                        <div class="picList1"></div>
                        <div class="picList2"></div>
                     </div>
                     <!-- <div class="pic clearfix">
                        <div class="picList3"></div>
                        <div class="picList4"></div>
                     </div> -->

                </div>
                <div class="platform_modal"></div>
                <div class="bottomLine"></div>
              </div>
        </div>
        <div class="footerTip">
            <div>投资有风险 入市需谨慎</div>
            <div  class="thrid">法律允许范围内，本活动解释权归黄金钱包</div>
           <div>如有疑问咨询客服热线:  4000-339-993</div>
            <div>工作日：9:00-21:00；非工作日：10:00-15:00</div>
        </div>
        <!-- 底部悬浮 -->
        <!-- <footer>
            <div class="download-block" >
              <div class="download-btn  download-app" @click='download'>立即下载</div>
            </div>
        </footer> -->
         <footer class="clearfix">
            <button class='invite-footer-btn left'></button>
            <div class="logoText left">
               <div>黄金钱包</div>
               <div>能买黄金&nbsp;能理财</div>
            </div>
            <button class='invite-footer-poster left'  id='dowmload'  @click='download($event)'>立即下载</button>
        </footer>
        <!-- 老用户 -->
         <div  class="x-floating x-mask"  v-if="showObj.showMask">
           <div class="receive-alert">
               <div>
                   <!--老用户提示-->
                   <p >您已经注册黄金钱包，快打开APP查<br/>看最新活动吧！</p>
                   <img src="./res/close.png" class="_close" @click="closeMask"/>
               </div>
               <div>
                   <div @click="download($event)">前往黄金钱包APP</div>
               </div>
           </div>
        </div>
        <!-- 新用户 -->
        <div  class="x-floating x-mask" v-if="showObj.isNewuser">
           <div class='success'>
               <div class="successBg">
               </div>
               <div  @click="download($event)" id="load1" class="download">
               </div>
               <div @click="closeMask" class="close"></div>
           </div>
        </div>

    </div>
</template>
<script>
import util from "../../utils/tool.js";
import wxShare from "../../commonScript/wxShare.js";
import { openApp } from "../../commonScript/download.js";
import tongdun from '../../utils/tongdun.js';
import {getCode,checkPhoneNum,userRegisterByValid,getPrice} from '../../service/common/common.js'
//import{getNewUserGoldInfo} from '../../service/common/info/service.js';
export default {
  data() {
    return {
       isShare: GB.utils.GetRequest()["isShare"] || "",
       shareCode: "",
       checkedProtocal:true,
       TELEPHONELEN:11,
       TELEVALIDDARRAY:[1,3,4,5,6,7,8,9],
        isSendSmg: false,
        isSendYuyin: false,
        isfirstTime:false,
        SmgMinute: 60,
        YuyinMinute: 60,
        spePrice:'',
        type: 0, //注册
        price:'',//实时金价
        showObj:{
            showMask:false,
            isNewuser:false,
            telephoneInputShow:true,
            autuCodeInputShow:true
        },//页面展示
        dataObj:{
            telephone:'',//手机号
            hideTelephone:'',//隐藏手机号
            userCode:'',//邀请码
            channelCode:'',//渠道号
            authCode:'',//验证码
            telErrInfo:'',//手机号错误信息
            autoCodeErrInfo:'',
        }
    };
  },
  watch: {},
  filters: {},
  components: {},
  mounted() {
        //从url上截取参数
        this.dataObj.channelCode = 'distribution_register';
        this.dataObj.userCode = this.getUrlVars()['userCode']||'';
        this.dataObj.salesmanCode = this.getUrlVars()['salesmanCode'];
        // wxShare.getShareInfo(this.dataObj.userCode, this.shareCode);
        this.getPrice();
        //this.getNewUserGoldInfo();
        tongdun();

        // var userCode = getCookie('userCode')||null;
        // sa.login(userCode);   
        // console.log(userCode+'用户ID');

  },
  methods: {
    getNewUserGoldInfo(){
      getNewUserGoldInfo().then(res=>{
        if(res.data.code == '0000'){
            this.spePrice = res.data.data.salePrice;
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
        code: shareCode, //活动code，分享统计标示
        needLogin: "1",
        platform: "0", //0:弹出选择平台 1:微信好友 2:微信朋友圈 3：QQ好友 4：QQ空间 5：复制链接
        pushShareMark: "" //是否需要统计用户分享
      };
      GB.utils.callCustomMethod("share", params_shared);
    },
     getUrlVars(){
            var vars = [], hash;
            var href = unescape(window.location.href);
            var hashes = href.slice(window.location.href.indexOf('?')+1).split('&');
            for(var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        },
        inputfocus:function(event) {
            event.target.className += ' focus';
        },
        inputblur:function(event) {
            var classname = event.target.className;
            classname = classname.replace(/\sfocus/g, '');
            event.target.className = classname;
        },
        //重新输入
        repeatInput:function(index){
            var that = this;
             if(index == '1'){
                 that.showObj.telephoneInputShow=true;
             }
            if(index == '2'){
                that.showObj.autuCodeInputShow=true;
            }
        },
    
    //     //注册领红包
        register(e){
            var that = this;
            //   //神策数据添加
            //         sa.track("RegisterStart",{
            //   operate_terminal:'推广页',
            //   is_ad_page:true,
            //   url_ad_page:window.location.href,
			// 	//  is_succeed: data.success?"是":"否"
            // });
            
            if(!that.dataObj.telephone){
                // GB.utils.landingalert('验证码不能为空');
                that.showObj.telephoneInputShow = false;
                that.dataObj.telErrInfo = '手机号不能为空';
                return;
            }
            if(!that.dataObj.authCode){
                // GB.utils.landingalert('验证码不能为空');
                that.showObj.autuCodeInputShow = false;
                that.dataObj.autoCodeErrInfo = '验证码不能为空';
                return;
            }
            console.log(that.checkedProtocal)
            if(!that.checkedProtocal){
                util.toast('您必须先同意黄金钱包服务协议');
                return;
            }

            that.$sa.quick('trackHeatMap', e.currentTarget) 

            var dataObj =  {
                "telephone": that.dataObj.telephone,
                "authCode": that.dataObj.authCode,
                "userInviteCode":that.dataObj.userCode,
                "channelCode":that.dataObj.channelCode,
                "salesmanCode":that.dataObj.salesmanCode,
                "registSource":'newUserGiftPacks'
            }
            userRegisterByValid(dataObj).then((res) => {
                 var result = res.data;
                  var msg = result.msg;
                    if (+result.code == 0) {
                        that.dataObj.telephone = null;
                        that.dataObj.authCode = null;
                        that.showObj.isNewuser = true;
                    } else {
                        if (msg) {
                            util.toast(msg);
                        }
                    }
                })
          
        },
   
    //倒计时
    countDown(type) {
      var that = this;
      let minute = 60;
      let timer = window.setInterval(function() {
        if (type == 1) {
          that.SmgMinute = minute;
          that.isSendSmg = true;
        } else if (type == 2) {
          that.YuyinMinute = minute;
          that.isSendYuyin = true;
        }
        if (minute == 0) {
          window.clearInterval(timer);
          if (type == 1) {
            that.isSendSmg = false;
            that.SmgMinute = 60;
          } else if (type == 2) {
            that.isSendYuyin = false;
            that.YuyinMinute = 60;
          }
          return;
        }
        minute--;
        if(minute==0){
            that.isfirstTime = true;
        }
      }, 1000);
    },

        //发送验证码
        sendCode(type,e){
        //     //添加神策数据
        //     sa.track("LoginStart",{
        //       operate_terminal:'推广页',
        //       is_ad_page:true,
        //       url_ad_page:window.location.href,
				// //  is_succeed: data.success?"是":"否"
        //     });
            this.$sa.quick('trackHeatMap', e.currentTarget) 
            var that = this;
            if(!that.checkTelephone(that.dataObj.telephone)){
                that.showObj.telephoneInputShow = false;
                if(!that.dataObj.telephone){
                    that.dataObj.telErrInfo = '手机号不能为空';
                }else{
                    that.dataObj.telErrInfo = '手机号格式不正确，请重新输入';
                }
                return;
            }
                //发送验证码
                var data = {
                    telephone: that.dataObj.telephone,
                    authCodeType: type
                }
                getCode(data).then((res) => {
                    var result = res.data;
                    var msg = result.msg;
                    if (+result.code == 0) {
                        if (msg == '手机号已注册') {
                            //老用户
                             that.showObj.showMask = true;
                             var mo=function(e){e.preventDefault();};
                              document.body.style.overflow='hidden';
                              document.addEventListener("touchmove",mo,false);//禁止页面滑动

                        } else { //新用户
                          that.countDown(type);
                           
                        }
                    } else {
                        if (msg) {
                            util.toast(msg);
                        }
                    }
                })
          
        },
         getPrice(){
                let data={
                    queryFlag:3
                }
                getPrice(data).then((res)=>{
                    console.log(res);
                    if(res.realtime_price){
                        this.price = (res.realtime_price/100).toFixed(2);
                        console.log(this.price)
                    }
                })
            },
        //服务协议
        protocol(e){
            if(e){
              this.$sa.quick('trackHeatMap', e.currentTarget) 
            }
            window.location = "http://static.huangjinqianbao.com/static/html/app/protocol/userProtocol.html";
        },
        gotoTop(){
            window.scrollTo(0,0);
        },
       //点击是否同意协议
        checkBox(e){
            var that = this;
            that.$sa.quick('trackHeatMap', e.currentTarget) 
            that.checkedProtocal = !that.checkedProtocal;
        },
        //关闭弹框
        closeMask(){
            var that = this;
            that.showObj.showMask = false;
            that.showObj.isNewuser = false;
        },
        //下载app
        download(e){
            if(e){ //热力图
              this.$sa.quick('trackHeatMap', e.currentTarget) 
            }
            openApp();
        },
        checkTelephone (telephoneStr) {
            // if(telephoneStr.length < this.TELEPHONELEN || telephoneStr.indexOf('1')!= 0) return false;
            // for (var i = 0; i < this.TELEVALIDDARRAY.length; i++){
            //     if(parseInt(this.TELEVALIDDARRAY[i]) == parseInt(telephoneStr[1])) return true;
            // }
            if (!/1[3457869]\d{9}/.test(telephoneStr) || telephoneStr.length != 11) {
              return false
            }
            return true;
        },
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
  .px2rem(padding-bottom,140);
   height: 100%;
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
  .newUser {
    .newUserHeader {
      .bg-img("header.png",750,627);
    }
    /*********common.css start*********/
    .newUserText {
      background: #fff;
      border: 2px solid #ffd49e;
      position: relative;
      color: #353535;
      .px2rem(margin-bottom,40);
      .px2rem(margin-left,20);
      .px2rem(margin-right,20);
      .px2rem(border-radius,12);
      .px2rem(padding-left,40);
      .px2rem(padding-bottom,40);
      .px2rem(padding-top,40);
       .px2rem(padding-right,40);
       .titleOne{
        .px2rem(width,640);
         margin: 0 auto;
       }
       .titleTwo{
         .px2rem(width,460);
         margin: 0 auto;
       }
       .titleThree{
        .px2rem(width,528);
         margin: 0 auto;
       }
      .targTitle {
        font-family: "PingFangSC-Semibold";
        .px2px(font-size,36);
        color: #4A4A4A;;;
        // width: 100%;
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
    }
    /*********common.css end*********/
    .newUserText {
      .carList{
        div{
          .px2rem(margin-right,12);
          float: left;
        }
        .px2rem(margin-bottom,80);
        .car1{
          .bg-img("car11.png",198,120);
        }
          .car2{
          .bg-img("car2.png",198,120);
        }
          .car3{
          .bg-img("car33.png",198,120);
          .px2rem(margin-right,0);

        }

      }
      // 丰富多样的投资组合
      .targ {
        .bg-img("li-bg.png",620,251);
        // width:107%;
        // background-position-x: -10px;
        //  background-position-y: -10px;
        margin: 0 auto;
        .px2rem(margin-top,40);
        .px2rem(padding-left,40);
        .px2rem(padding-right,40);
        .px2rem(padding-top,20);
        .px2rem(padding-bottom,20);
        .targTop {
          font-family: "PingFangSC-Semibold";
          .px2px( font-size,28);
          .px2rem(margin-top,8);
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
            .px2rem(margin-top,-8);
            .px2px(font-size,24px);
            color: #96969a;
           
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
             /*注册区域*/
        .register-div{
          font-family: "PingFangSC-Regular";
          .px2rem(padding-bottom,50);
          background-color:#fff;
          input{
            .px2rem(height,88);
            border: 1px solid #DCDCE0;
            .px2rem(border-radius,10);
            .px2rem(padding-left,20);
            box-sizing:border-box;
            .px2px(font-size,28);
            outline:none ;//轮廓
            -webkit-tap-highlight-color:rgba(0,0,0,0);
            -webkit-appearance: none;
          }
          .tel-div{
            margin:0 auto;
            .px2rem(margin-top,38);
            .px2rem(width,590);
            color:#000;
            input{
             width:100%;
              &.focus {
                border: 1px solid #FFA000;
                background: #fff;
              }
            }

          }
          .code-div{
            margin:0 auto;
            .px2rem(margin-top,30);
            display:flex;
            align-items:center;
            justify-content:space-between;
            .px2rem(width,590);
            position: relative;
            color:#000;
            input{
              .px2rem(width,590);
              &.focus {
                border: 1px solid #FFA000;
                background: #fff;
              }

            }
            div.line{
                .px2rem(width,2);
                .px2rem(height,20);
                background: #DCDCE0;
                position: absolute;
                top:18px;
                right:130px;

            }
            div.getCodeGray{
                 position: absolute;
                right:0;
                top:0;
               color: #B4B4B8;;
              .px2rem(width,216);
              .px2rem(height,88);
              .px2rem(line-height,88);
              text-align:center;
              font-size: 28px;
              .px2px(font-size,28);
              &.noclick{
                background: #E6E6E6;
              }
            }
            div.getCode{
                position: absolute;
                right:0;
                top:0;
               color: #FFA000;
              .px2rem(width,216);
              .px2rem(height,88);
              .px2rem(line-height,88);
              text-align:center;
              font-size: 28px;
              .px2px(font-size,28);
              &.noclick{
                background: #E6E6E6;
              }
            }
            .yzm{
              .px2rem(width,590);
          }
          }
          .yuyin-div{
            margin:0 auto;
            .px2rem(margin-top,20);
            .px2rem(width,590);
            color: #A0A0A0;
            span{
              color: #FFA000;
            }
          }
          .agreen-div{
            display:flex;
            align-items:center;
            .px2px(font-size,24);
            color: #A0A0A0;
            margin:0 auto;
            .px2rem(margin-top,20);
            .px2rem(width,590);
            &>span:first-child{
              .bg-img("choice.png",28,28);
              .px2rem(margin-right,8);
              &.noclick{
                .bg-img("noselected.png",28,28);
              }
            }
            &>span:last-child{
              span{color: #FFA000;}
            }
          }
          .reg-btn{
            font-family: "PingFangSC-Semibold";
            .bg-img("button1.png",630,96);
            text-align:center;
            .px2px(font-size,40);
            margin:0 auto;
            color: #A50400;
            .px2rem(margin-top,64);
            div{
              .px2rem(height,96);
              .px2rem(line-height,96);

            }
          }
          .zhcx-tips{
            display:flex;
            align-items:center;
            .px2px(font-size,26);
            color: #FF4A00;
            //.px2rem(width,590);
            width:100%;
            margin:0 auto;
            .px2rem(margin-top,20);
            span:first-child{
              // background-image: url("../images/page/landingpage/zhcx.png");
              background-repeat: no-repeat;
              background-size: 100% 100%;
              .px2rem(width,42);
              .px2rem(height,30);
              .px2rem(margin-right,8);

            }
          }
          .err{
            background: #FFF6F2;
            border: 1px solid #FF4A00;
            .px2rem(border-radius,10);
            .px2px(font-size,28);
            color: #FF4A00;
            display:flex;
            align-items:center;
            .px2rem(height,88);
            .err-logo{
               .bg-img("err-tips.png",24,24);
              background-repeat: no-repeat;
              background-size: 100% 100%;
              .px2rem(width,24);
              .px2rem(height,24);
              .px2rem(margin-left,20);
              .px2rem(margin-right,8);
            }
          }
        } 
      // 黄金行业
      .industry{
        .px2rem(margin-top,54);
         .px2rem(margin-bottom,125);
         .pic{
           display: flex;
           justify-content: center;
          //  div{
          //    float: left;
          //  }
           .picList1{
             .px2rem(margin-top,60);
            //  .px2rem(margin-left,30);
              .px2rem(margin-right,79);
              .bg-img("111.png",191,314);
           }
            .picList2{
              .px2rem(margin-top,60);
              .bg-img("33.png",206,314);
           }
          //  .picList2{
          //    .px2rem(margin-top,60);
          //    .bg-img("22.png",235,314);
          //  }
          //  .picList3{
          //    .px2rem(margin-top,60);
          //    .px2rem(margin-left,60);
          //     .px2rem(margin-right,130);
          //     .bg-img("33.png",206,314);
          //  }
          .picList4{
             .px2rem(margin-top,60);
             .bg-img("4.png",178,314);
           }
         }

      }
      // .platform_modal{
      //   .bg-img("platform_bg.png",);
      // }
    }
  }
   .footerTip{
        color: #FAF8D4;
        text-align: center;
        font-family:'PingFangSC-regular' !important;
        .px2px(font-size,22);
        .px2rem(margin-top, 40);
        .px2rem(margin-bottom, 70);
        div.thrid{
        .px2rem(margin-bottom, 40)
         }
   }
    footer {
          width: 100%;
          .pf();
          bottom: 0;
          left: 0;
          z-index: 999;
          background-color: rgba(0,3,23,0.6);
          .px2rem(padding-left, 40);
          .px2rem(padding-right, 40);
          .px2rem(padding-top, 25);
          .px2rem(padding-bottom, 25);
           .logoText{
                color: #fff;
              .px2rem(margin-left, 20);
              .px2rem(margin-top, 10);
               .px2px(font-size,32);
               font-family: "PingFangSC-Medium";
               div:last-child{
                    .px2px(font-size,24);
                     .px2rem(margin-top, 10);
                    font-family: "PingFangSC-Regular";
               }
            }
          button {
              border: none;
              outline: none;
              background: none;
              font-weight: bold;
              &.invite-footer-btn {
                   .bg-img('logo.png', 110, 110);
                  .px2rem(font-size, 40);
                  color: #F65500;
                  .px2rem(letter-spacing, 3);
                  .pr();
              }
             
              &.invite-footer-poster {
                  .pa();
                  font-family:" PingFangSC-Semibold";
                  .px2rem(width,180);
                  .px2rem(height,79);
                  text-align:center;
                  .px2rem(line-height,79);
                  .px2rem(border-radius,35);
                  color:#FB550D;
                  background: #fff;
                  .px2px(font-size,28);
                  .px2rem(right,40);
                  top: 50%;
                  transform: translateY(-50%);
              }
          }
      }

.x-mask {
  height: 100%;
  display: flex;
  display: -webkit-box;
  display: -ms-flexbox;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5) center center no-repeat;
  .receive-alert{
    .px2rem(width,670);
    .px2rem(height,438);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    z-index: 9999999 !important;
    background-color:#fff;
    border-radius: 12px;
    &>div{
      &:first-child{
        .px2rem(height,250);
        color:#333;
        .px2px(font-size,32);
        text-align:center;
        display: flex;
        align-items:center;
        justify-content:center;
        line-height: 1.5;
        img._close {
          .px2rem(width, 60);
           .px2rem(height,60);
          position: absolute;
          .px2rem(bottom,-120);
          right:45%;
        }

      }
      &:last-child{
        display: flex;
        align-items:center;
        div{
          .bg-img("button1.png",510,96);
          .px2rem(line-height,96);
          .px2rem(width,452);
          margin:0 auto;
          color: #A50400;
          .px2px(font-size,
                  34);
          text-align: center;
         
        }
      }
    }
  }
  .success{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    z-index: 9999999 !important;
    .successBg{
      .bg-img("successbg.png",519,536);

      .px2rem(margin-bottom,10);
    }
    .download{
       .bg-img("successButton.png",510,96);
       margin: 0 auto;
       .px2rem(margin-bottom,30);
    }
    .close{
      .bg-img("close.png",60,60);
      margin: 0 auto;
    }
    
  }

}



}
:root .index-page {
  filter: none;
}

/* iphone5 */
@media screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2){
 .index-page .newUser .newUserText .targ{
      .bg-img("li-bg.png",620,280);
        // width:107%;
        // background-position-x: -10px;
        //  background-position-y: -10px;
      margin: 0 auto;
      .px2rem(margin-top,40);
      .px2rem(padding-left,40);
      .px2rem(padding-right,40);
      .px2rem(padding-top,20);
      .px2rem(padding-bottom,20);
 }
 .index-page .newUser .newUserText .titleOne{
   width: 110%;
   margin-left:-12px;
 }
 .index-page .newUser .newUserText .titleTwo{
    width: 80%;
   margin:0 auto;
 }
 
 .index-page .newUser .newUserText .titleThree{
    width: 80%;
   margin:0 auto;
 }
}
 //iphoneX、iphoneXs
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        footer {
            padding-bottom: 20px !important;
        }

        // .index-page {
        //     padding-bottom: 3.8rem !important;
        // }
    }

    //iphone Xs Max
    @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
         footer {
            padding-bottom: 20px !important;
        }

        // .index-page {
        //     padding-bottom: 3.8rem !important;
        // }
    }

    //iphone XR
    @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
         footer {
            padding-bottom: 20px !important;
        }

        // .index-page {
        //     padding-bottom: 3.8rem !important;
        // }
    }
</style>
