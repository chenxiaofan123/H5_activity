<template>
    <div class="record-page">
        <div class="fixed">
          <div class='record-fix-wrap'>
           <p class="top"></p>
           <div class="record-total">
             <div>
               <p>累计已翻牌次数</p>
               <p><span>{{userPrizeInfo.usedTotal}}</span>次</p>
             </div>
             <p></p>
             <div>
               <p>累计获得奖励</p>
               <p v-if="userPrizeInfo.totalMoney!=0"><span>{{userPrizeInfo.totalMoney|formatMoney}}</span>元</p>
               <p v-else><span>0.00</span>元</p>
             </div>
           </div>
           <p class="bottom"></p>
          </div>
          <div class="record-content">
            <p class="top"></p>
            <!-- 有翻牌记录 -->
            <ul  v-show="hasRecord=='true'">
              <li v-for="(item,index) in userPrizeInfo.winningRecordList" :key="index">
                <p>{{item.winningTime}}</p>
                <p>{{item.prizeName}}</p>
              </li>
            </ul>
            <!-- 无翻牌记录 -->
            <p class="no-record" v-show="hasRecord=='false'">暂无翻牌记录</p>
            <p class="bottom"></p>
        </div>
        </div>
        
    </div>
</template>
<script>
import { getUserPrizeListInfo } from "../../../service/common/prizeDraw/service.js";
export default {
  data() {
    return {
      isRun: false,
      activityCode: 26,
      telephone: "",
      sessionId: "",
      hasRecord: "",
      userPrizeInfo: {
        totalMoney: "",
        usedTotal: "",
        winningRecordList: []
      }
    };
  },
  methods: {
    handleTime(timeObj) {
      timeObj.winningRecordList.forEach(element => {
        var winningTime = element.winningTime;
        var winningTimeHandle = new Date(winningTime.replace(/-/g, "/"));
        element.winningTime = winningTimeHandle.format("yyyy.MM.dd hh:mm");
      });
      this.userPrizeInfo = timeObj;
    },
    getUserPrizeListInfo() {
      this.isRun = true;
      var data = {
        telephone: this.telephone,
        sessionId: this.sessionId,
        activityCode: this.activityCode
      };
      getUserPrizeListInfo(data).then(res => {
        var data = res.data.data.userPrizeInfo;
        var userPrizeInfo = res.data.data.userPrizeInfo;
        this.handleTime(userPrizeInfo);
        if (this.userPrizeInfo.winningRecordList.length == 0) {
          this.hasRecord = "false";
        } else {
          this.hasRecord = "true";
        }
      });
    }
  },
  mounted() {
    var that = this;
    if (GB.utils.getPlatform() == "android") {
      clientInit.done(() => {
        GB.utils.callCustomMethod("setTitle", {
          title: "翻牌记录"
        });
      });
      // GB.utils.callCustomMethod("setTitle", {
      //   title: "翻牌记录"
      // });
      // if (document.title != "翻牌记录") {
      //   GB.utils.callCustomMethod("setTitle", {
      //     title: "翻牌记录"
      //   });
      // }
    } else {
      GB.utils.callCustomMethod("setTitle", {
        title: "翻牌记录"
      });
    }
    let height = $(".fixed").height() - $(".record-fix-wrap").height() - 10;
    $(".record-content").css("height", height + "px");
    if (this.isRun) {
      return;
    }
    var timer;
    if (!this.isRun) {
      sessionProObj.getUserInfo((telephone, sessionId) => {
        that.telephone = telephone;
        that.sessionId = sessionId;
        if (!telephone) {
          //用户未登录
          that.isLogin = 0;
        } else {
          // 用户登录
          that.isLogin = 1;
          that.getUserPrizeListInfo();
        }
      });
      timer = setInterval(function() {
        if (that.isRun) {
          window.clearInterval(timer);
          return;
        }
        location.reload();
      }, 1000);
    }
  },
  beforeMount() {
    window.scrollTo(0, 0);
  },
  activated() {
    if (GB.utils.getPlatform() == "android") {
      clientInit.done(() => {
        GB.utils.callCustomMethod("setTitle", {
          title: "翻牌记录"
        });
      });
      GB.utils.callCustomMethod("setTitle", {
        title: "翻牌记录"
      });
    } else {
      GB.utils.callCustomMethod("setTitle", {
        title: "翻牌记录"
      });
    }
  }
};
</script>
<style lang="less"  scoped>
@import "../../../../statics/less/base/method.less";
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
  background-image: url("../res/@{file}");
}
.record-page {
  width: 100%;
  height: 100%;
  .padding(30,30,30,30);
  background: #921700;
  .top {
    .bg-img("huawen-top.png",668,26);
    margin: 0 auto;
    .px2rem(margin-top,11);
    .px2rem(margin-bottom,24);
  }
  .bottom {
    .bg-img("huawen-bottom.png",668,26);
    margin: 0 auto;
    .px2rem(margin-bottom,11);
    // position: absolute;
    // .px2rem(bottom,11);
    // left: 50%;
    // transform: translateX(-50%);
  }
  .fixed {
    width: 100%;
    height: 100%;
  }
  .record-fix-wrap {
    background: #fff;
    border: 2px solid #07073a;
    border-radius: 1px;
    .px2px(font-size,28);
    color: #303030;
    position: relative;
    .record-total {
      display: flex;
      align-items: center;
      justify-content: center;
      & > div {
        text-align: center;
        .px2px(font-size,26);
        color: #07073a;
        letter-spacing: 0.77px;
        span {
          .px2px(font-size,42);
          color: #aa0303;
          font-weight: bold;
        }
      }
      & > p {
        background-color: #d4c984;
        .px2rem(height,81);
        width: 1px;
        .px2rem(margin-left,60);
        .px2rem(margin-right,70);
      }
    }
  }
  .record-content {
    background: #fff;
    border: 2px solid #07073a;
    border-radius: 1px;
    .px2rem(margin-top,20);
    position: relative;
    .bottom {
      position: absolute;
      .px2rem(bottom,11);
      left: 50%;
      transform: translateX(-50%);
      margin: 0;
    }
    ul {
      .px2rem(padding-left,46);
      .px2rem(padding-right,46);
      height: 90%;
      overflow: auto;
      li {
        display: flex;
        .px2px(font-size,28);
        color: #07073a;
        justify-content: space-between;
        border-bottom: 1px solid #ece9d3;
        .px2rem(padding-top,30);
        .px2rem(padding-bottom,10);
        p:last-chils {
          text-align: right;
        }
      }
    }
    .no-record {
      .px2px(font-size,28);
      color: #07073a;
      text-align: center;
      .px2rem(margin-top,173);
    }
  }
}
</style>
