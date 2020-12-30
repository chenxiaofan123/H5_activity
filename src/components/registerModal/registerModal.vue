<template>
 <!-- 注册区域组件 -->
 
<div class="register-div">
  <!-- 输入手机号 -->
  <div class="tel-div">
      <input  type="tel" :class="[showObj.showTelFocus?'focus':'']"  @focus="showObj.showTelFocus=false" v-model="dataObj.telephone" maxlength="11" placeholder="请输入手机号码" />
  </div>
  <!-- 输入验证码 -->
  <div class="authCode-div">
      <div>
          <input type="text" :class="[showObj.showAuthCodeFocus?'focus':'']" placeholder="请输入验证码" @focus="showObj.showAuthCodeFocus=false" v-model="dataObj.authCode"/>
      </div>
      <p class="canclick" v-show="!isSendSmg" @click="sendCode('1',$event)" :style="'background:'+registerStyle.authCodeColor">获取验证码</p>
      <p class="noclick" v-show="isSendSmg">已发送{{SmgMinute}}s</p>
  </div>
  <div class="yuyin-div" v-show="!isSendYuyin">收不到短信？ 使用<span @click="sendCode('2',$event)">语音验证码</span></div>
  <div class="yuyin-div" v-show="isSendYuyin">
      收不到短信？ 使用<span>语音验证码{{YuyinMinute}}s</span>
  </div>
  <div class="agreen-div">
        <span :class="{noclick:!checkedProtocal}" @click="checkBox($event)"></span>
        <span>我已阅读并同意<span @click="protocol($event)">《黄金钱包使用协议》</span></span>
  </div>
  <div class="register-btn" :style="'background:'+registerStyle.buttonColor" @click="register($event)">注册领取880元礼包</div>
</div>
</template>

<script>
import util from "../../utils/tool.js";
import {
  getCode,
  checkPhoneNum,
  userRegisterByValid,
  getPrice
} from "../../service/common/common.js";
export default {
  data() {
    return {
      checkedProtocal: true,
      SmgMinute: 60,
      YuyinMinute: 60,
      isSendSmg: false,
      isSendYuyin: false,
      showObj: {
        showTelFocus: false,
        showAuthCodeFocus: false
      }, //页面展示
      dataObj: {
        telephone: "", //手机号
        hideTelephone: "", //隐藏手机号
        userCode: "", //邀请码
        channelCode: "", //渠道号
        authCode: "", //验证码
        telErrInfo: "", //手机号错误信息
        autoCodeErrInfo: ""
      }
    };
  },
  props: {
    registerStyle:{
      default:{
        authCodeColor:'',
        buttonColor:''
      },
      type:Object
    },
    bottomBg: {
      default: "#fff",
      type: String
    },
    userCode:{
      default:"",
      type:String
    },
    channelCode:{
      default:"",
      type:String
    },
    salesmanCode:{
      default:"",
      type:String
    },
    registSource:{
       default:"",
      type:String
    }
  },
  watch: {},
  methods: {
    openApp() {
      openApp();
    },
    checkTelephone(telephoneStr) {
      if (!/1[23456789]\d{9}/.test(telephoneStr) || telephoneStr.length != 11) {
        return false;
      }
      return true;
    },
    inputfocus: function(event) {
      var classname = event.target.className;
      classname = classname.replace(/\sfocus/g, "");
      event.target.className = classname;
    },
    //注册领红包
    register(e) {
      if (!this.dataObj.telephone) {
        this.showObj.showTelFocus = true;
        util.toast("手机号不能为空");
        return;
      }
      if (!this.dataObj.authCode) {
        this.showObj.showAuthCodeFocus = true;
        util.toast("验证码不能为空");
        return;
      }
      if (!this.checkedProtocal) {
        util.toast("您必须先同意黄金钱包服务协议");
        return;
      }

      this.$sa.quick("trackHeatMap", e.currentTarget);

      var dataObj = {
        telephone: this.dataObj.telephone,
        authCode: this.dataObj.authCode,
        userInviteCode: this.userCode,
        channelCode: this.channelCode,
        salesmanCode: this.salesmanCode,
        registSource: "newUserGiftPacks"
      };
      userRegisterByValid(dataObj).then(res => {
        var result = res.data;
        var msg = result.msg;
        if (+result.code == 0) {
          this.dataObj.telephone = null;
          this.dataObj.authCode = null;
          this.$emit("register",1);
        } else {
          if (msg) {
            util.toast(msg);
          }
          this.$emit("register",2);
        }
      });
    },
    //发送验证码
    sendCode(type, e) {
      this.$sa.quick("trackHeatMap", e.currentTarget);
      if (!this.checkTelephone(this.dataObj.telephone)) {
        this.showObj.showTelFocus = true;
        if (!this.dataObj.telephone) {
          util.toast("手机号不能为空");
        } else {
          util.toast("手机号格式不正确，请重新输入");
        }
        return;
      }
      //发送验证码
      var data = {
        telephone: this.dataObj.telephone,
        authCodeType: type
      };
      getCode(data).then(res => {
        var result = res.data;
        var msg = result.msg;
        if (+result.code == 0) {
          if (msg == "手机号已注册") {
            //老用户
            // var mo = function(e) {
            //   e.preventDefault();
            // };
            // document.body.style.overflow = "hidden";
            // document.addEventListener("touchmove", mo, false); //禁止页面滑动
            this.$emit("register",0);
          } else {
            //新用户
            this.countDown(type);
          }
        } else {
          if (msg) {
            util.toast(msg);
          }
        }
      });
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
        if (minute == 0) {
          that.isfirstTime = true;
        }
      }, 1000);
    },
    //点击是否同意协议
    checkBox(e) {
      this.$sa.quick("trackHeatMap", e.currentTarget);
      this.checkedProtocal = !this.checkedProtocal;
    },
    //服务协议
    protocol(e) {
      if (e) {
        this.$sa.quick("trackHeatMap", e.currentTarget);
      }
      window.location =
        "http://static.huangjinqianbao.com/static/html/app/protocol/userProtocol.html";
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../../statics/less/base/method.less";
.bg-img( @file , @width, @height ) {
  .px2rem(width, @width);
  .px2rem(height, @height);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("./@{file}");
}
.register-div {
  .px2rem(padding-left,40);
  .px2rem(padding-right,40);
  input {
    border: 1px solid #dcdce0;
    .px2rem(border-radius,10);
    .px2rem(padding-left,20);
    box-sizing: border-box;
    .px2px(font-size,28);
    outline: none; //轮廓
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-appearance: none;
    height: 100%;
    width: 100%;
    &.focus {
      border: 1px solid #ffa000;
      background: #fff;
    }
    ::-moz-placeholder {
      color: #b4b4b8;
    }
    ::-webkit-input-placeholder {
      color: #b4b4b8;
    }
    :-ms-input-placeholder {
      color: #b4b4b8;
    }
  }
  .tel-div {
    margin: 0 auto;
    // .px2rem(width,590);
    color: #000;
    .px2rem(height,88);
    .px2rem(line-height,88);
    .px2rem(border-radius,8);
    .px2px(font-size,28);
    .px2rem(height,88);
    input {
      width: 100%;
      height: 100%;
      &.focus {
        border: 1px solid #ffa000;
        background: #fff;
      }
    }
  }
  .authCode-div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .px2rem(margin-top,20);
    .px2rem(height,88);
    > div {
      .px2rem(width,394);
      height: 100%;
    }
    > p {
      .px2rem(width,216);
      height: 100%;
      background-color: #ffbe66;
      .px2rem(border-radius,8);
      text-align: center;
      color: #ffffff;
      .px2px(font-size,28);
      .px2rem(line-height,88);
    }
    .noclick {
      background: #f6f6f6;
      color: #b4b4b8;
    }
  }
  .yuyin-div {
    .px2rem(margin-top,20);
    color: #b4b4b8;
    span {
      color: #ffa000;
    }
  }
  .agreen-div {
    display: flex;
    align-items: center;
    .px2px(font-size,24);
    color: #b4b4b8;
    margin: 0 auto;
    .px2rem(margin-top,20);

    & > span:first-child {
      .bg-img("choice.png",28,28);
      .px2rem(margin-right,8);
      &.noclick {
        .bg-img("noselected.png",28,28);
      }
    }
    & > span:last-child {
      span {
        color: #ffa000;
      }
    }
  }
  .register-btn {
    background-image: linear-gradient(90deg, #ffb800 0%, #ff8700 100%);
    .px2rem(border-radius,8);
    text-align: center;
    color: #ffffff;
    .px2px(font-size,34);
    font-weight:bold;
    .px2rem(margin-top,40);
    .px2rem(height,96);
    .px2rem(line-height,96);
  }
}
</style>

