<template>
    <div class="index-page" v-cloak>
      <header>
        <div class="mask"></div>
         <!-- 抽奖记录-->
         <record-list :filterWinningList='filterWinningList' :rollWinningStyle='rollWinningStyle'  v-if="filterWinningList.length!=0"></record-list>
         <!-- 活动细则 -->
         <div class="rule" @click="goRule($event)" id='goRule'>
            <p class='rule-content'>
              <span>活</span><span>动</span><span>细</span><span>则</span>
            </p>
         </div>
         <!-- 翻牌记录 -->
         <div class="record" @click="goRecord($event)" id='goRecord'>
            <p class='record-content'>
              <span>我</span><span>的</span><span>奖</span><span>励</span>
            </p>
         </div>
      </header>
      <article>
        <!-- 牌面区 start-->
        <div class="card-model">
           <!-- 未登录 -->
           <div v-if="isLogin===0">
             <p>
               请前往<span class="login-in" @click="callAppLogin">登录</span>
             </p>
             <p class='flop-tip'>登录后可查看翻牌次数</p>
           </div>
           <!-- 已登录 -->
           <template v-if="isLogin===1">
              
              <p class="nochange" v-if='activityStatus==2'>剩余翻牌次数：<span class="flop-num">{{userTotalCount}}</span>次</p>
              <p class="nochange" v-else-if='activityStatus==3'>活动已结束</p>
              <!-- 有翻牌次数 -->
              <template v-if="userTotalCount>0&&activityStatus==2">
                <p v-if="cardsStatus==0" class='flop-tip'>点击牌面开始游戏</p>
                <p v-else-if="cardsStatus==1" class='flop-tip'>洗牌中...</p>
                <p v-else-if="cardsStatus==2" class='flop-tip'>选择想翻的牌</p>
                <p v-else-if="cardsStatus==3" class='flop-tip'>恭喜您中奖</p>
              </template>
              <!-- 无翻牌次数 -->
              <template v-else-if="userTotalCount==0&&activityStatus==2">
                <p  class='flop-tip flop-tip-add' @click="addChange">去增加翻牌机会</p>
              </template>
              <!-- 活动结束 -->
              <template v-if="activityStatus==3">
                <p class='flop-tip'>可在我的奖励查看获奖记录</p>
              </template>
           </template>
           <div class="card-area" @click="shuffleCards" v-if='activityStatus==2'>
               <div :class="['poker-item','item'+(index+1)]" v-for="(item,index) in rewardPrizeType" :key="index" >
                  <div class="poker-3d" :class="[isShowBack && drawClick!==index?'hover':'',drawClick==index?'hoverOver':'']" @click="luckDraw($event,index)"  :id="`luckDraw${index}`">
                      <div class="front"><img :src="item.imgUrl" /></div>
                      <div class="back"></div>
                  </div>
              </div>
           </div>
           <div class="activity-ending" v-if='activityStatus==3'>
             <p></p>
           </div>
        </div>
         <!-- 牌面区 end-->
         <!-- 如何获得翻牌机会 start-->
         <div class="flopCard" v-if='activityStatus==2'>
           <div class="title">
             <p>如何获得翻牌机会</p>
           </div>
            <div class="content">
              <div class="div1">
                  <div class="top">
                    <p class="top-title">1.每日可免费领取1次</p>
                    <div class="top-btn"  v-if="!isDraw"  @click="drawChance($event,1)" id='drawChance'>领取</div>
                    <div class="top-btn gray" v-if="isDraw">已领取</div>
                  </div>
                  <div class="bottom">
                    <p>
                      免费领取累计获得 
                      <span v-if="isLogin===1" class="bottom-num">{{userSignCount}}</span>
                      <span v-if="isLogin===0" class="bottom-num">--</span>
                      <!-- <span class="bottom-num">{{userSignCount}}</span> -->
                      次翻牌机会
                    </p>
                  </div>
              </div>
              <div class="div2">
                  <div class="top">
                    <p class="top-title">2.邀请好友注册并单笔首购2000元可获得1次</p>
                    <div class="top-btn"  @click="gotoInvite($event)" id='gotoInvite'>邀请</div>
                  </div>
                  <div class="bottom">
                    <p>
                      邀请累计获得
                      <span class="bottom-num" v-if="isLogin===1">{{userInviteCount}}</span>
                      <span class="bottom-num" v-if="isLogin===0">--</span>
                      次翻牌机会
                    </p>
                  </div>
              </div>
              <div class="div3">
                  <div class="top">
                    <p class="top-title">3.累计投资10000元可获得1次</p>
                    <div class="top-btn"  @click="gotoInvest($event)" id='gotoInvest'>投资</div>
                  </div>
                  <div class="bottom">
                    <div>
                      <p>当前累计投资额(元)</p> 
                      <span class="bottom-num" v-if="isLogin===1">{{investTotalMoney|moneyUnit}}</span>
                      <span class="bottom-num" v-if="isLogin===0">--</span>
                    </div>
                    <div>
                      <p>投资获得翻牌机会(次) </p>
                      <span class="bottom-num" v-if="isLogin===1">{{userInvestCount}}</span>
                      <span class="bottom-num" v-if="isLogin===0">--</span>
                    </div>
                  </div>
              </div>              
             </div>
         </div>
         <!-- 如何获得翻牌机会 end-->
         <!-- 底部footer -->
          <footer-tip></footer-tip>
      </article>
      <!-- 每日领取弹框 start-->
      <v-modalTip v-show="firstShow" :positionNum="positionNum">
         <div class="receive-eval">
            <p class="receive-close" @click="closeReceiveModel"></p>
            <p class="receive-hy">恭喜你</p>
            <p class="receive-hy">获得1次免费翻牌机会</p>
            <p class="receive-img"></p>
            <div class="receive-btn" @click="drawChance($event,2)" id='receiveAlert'>立即领取</div>
         </div>
      </v-modalTip>
      <!-- 每日领取弹框 end-->
      <!-- 抽奖结果弹框 start -->
      <v-modalTip v-show="rewardShow">
        <div class="receive-record-bg">
          <!-- <p class="record-close" @click="closeReward($event)"></p> -->
          <img class='recoed-img' :src="recordListInfoIndex!=-1?recordListInfo[recordListInfoIndex].img:''" alt="">
          <div class="fixed" v-show="prizeType!=1108">
              <p class="tip">恭喜你获得</p>
              <p class="record-name">{{prizeName}}</p>
              <!-- <p class="record-gary">{{recordListInfoIndex!=-1?recordListInfo[recordListInfoIndex].tip:''}}</p> -->
              <p class="record-gary" v-for='(item,index) in prizeDesc' :key='index'>{{item}}</p>
              <div class="record-btn" @click="closeReward($event)" id='closeReward'>知道了</div>
          </div>
        </div>
      </v-modalTip>
      <!-- 抽奖结果弹框 end -->
    </div>
</template>
<script>
import User from "../../service/common/User";
import util from "../../utils/tool.js";
import recordList from './components/recordList.vue'
import footerTip from './components/footer.vue'
import {
  getUserPrizeListInfo,
  getUserDrawPrizeInfo,
  drawChance,
  luckDraw,
  getWinningList,
  getActInfo
} from "../../service/common/prizeDraw/service.js";
export default {
  data() {
    return {
      user: new User(),
      come: "",
      telephone: "18810893533",
      sessionId: "63994c91f9f44ed58dc7727048040a4b",
      shareCode:'flopActivity201907',
      invitationCode:'flopInvitation201907',
      status:'',
      isLogin: 0, //是否登录 0-未登录 1-已登录
      activityCode: 27,
      // actNewYearCode: "actNewYear2019",
      positionNum: 0, //每日领取弹框位置
      firstShow: false, //是否展示每日领取弹框
      rewardShow: false, //是否展示抽奖结果
      cardsStatus: 0, //牌的状态 0：初始 1：洗牌中 2：洗牌完成 3：抽中 4:已抽取
      prizeType: "", //抽奖结果类型
      winningResult: "", //	中奖结果 1-抽中；2-未抽中；3-没有机会了
      prizeName: "", //奖品名称
      isShowBack: false,
      receiveStatus: "",
      investTotalMoney: "",
      isDraw: "",
      userInvestCount: "",
      userInviteCount: "",
      userTotalCount: "",
      activityStatus:-1,
      prizeCount:"",
      userSignCount:"",
      filterWinningList:[],
      rollWinningStyle:"",
      key: new Date().toLocaleDateString(),
      winningList: [],
      coordinateArr: [
        [0, 0],
        [0, 215],
        [0, 430],
        [305, 0],
        [305, 215],
        [305, 430],
        [610, 0],
        [610, 215],
        [610, 430]
      ],
      rewardPrizeType: [
        {
          imgUrl: require("./res/card-0.58XJ.png"),
          name: '0.58元现金红包',
          prizeType: 1201
        },
        {
          imgUrl: require("./res/card-10MJ.png"),
          name: '10元满减卷',
          prizeType: 1207
        },
        {
          imgUrl: require("./res/card-50JD.png"),
          num: '50元京东卡',
          prizeType: 1206
        },
        {
          imgUrl: require("./res/card-1.8JX.png"),
          name: '1.8%加息卷',
          prizeType: 1204
        },
        {
          imgUrl: require("./res/card-10HJ.png"),
          name: "10克Au9999金条",
          prizeType: 1209
        },
        {
          imgUrl: require("./res/card-2.5JX.png"),
          name: "2.5%加息卷",
          prizeType: 1203
        },
        {
          imgUrl: require("./res/card-1JX.png"),
          name: "1%加息卷",
          prizeType: 1205
        },
        {
          imgUrl: require("./res/card-5.88XJ.png"),
          name: '5.88元现金',
          prizeType: 1202
        },
        {
          imgUrl: require("./res/card-15MJ.png"),
          name: '15元满减卷',
          prizeType: 1208
        }
      ],
      drawClick: -1, //点击区域
      recordListInfo:[
        // 2:优惠卷 3-其他金条 4-现金 5-兑换码
        {
          img:require("./res/record-JX.png"),
          prizeType:2,
          tip:'预计5分钟内发放至你的账户，可在「我的-我的优惠券」查看和使用'
        },
        {
          img:require("./res/record-HJ.png"),
          prizeType:3,
          tip:'我们将在5个工作日内与您的登录手机号码进行联系，确认身份和地址后为您邮寄。'
        },
        {
          img:require("./res/record-HB.png"),
          prizeType:4,
          tip:'预计5分钟内发放至你的钱包余额账户'
        },
        {
          img:require("./res/record-JD.png"),
          prizeType:5,
          tip:'奖励兑换流程请在「我的奖励」中查看'
        }
      ],
      recordListInfoIndex:-1,
      prizeDesc:[],
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
    recordList,
    footerTip
  },
  mounted() {
    // this.positionNum = 129;
    // this.firstShow = true;
    // this.rewardShow = true;
    this.status = GB.utils.GetRequest()["status"]||'';
    this.come = GB.utils.GetRequest()["come"] || "";
    
    // getShareInfo(sharebasePath, "", this.shareCode);
    // 在这里需要判断 是否登录  登录之后之后的状态 来展示
    sessionProObj.getUserInfo((telephone, sessionId) => {
      this.telephone = telephone;
      this.sessionId = sessionId;
      this.getActInfo();
      if (!telephone) {
        //用户未登录
        this.isLogin = 0;
      } else {
        // 用户登录
        this.isLogin = 1;
        // this.getUserDrawPrizeInfo(); //用户新年活动首页信息
      }
    });
  },
  methods: {
    /**
     * 埋点
     */
    trackHeatMap(e){
		  this.$sa.quick('trackHeatMap', e.currentTarget);
    },
     getWinningList() {
          var data = {
            activityCode: this.activityCode,
            prizeType: 2,
            size:50
          };
         var filterArray=[];
          getWinningList(data).then(res => {
            this.winningList = res.data.data.winningList;
            this.winningList.filter(function(item){
              if(item.prizeType!=1108){
                 filterArray.push(item);
              }
            });
            this.filterWinningList = filterArray;
            let length = this.filterWinningList.length;
            if (length > 1) {
              let animdurlTime = length * 3;
              this.rollWinningStyle = {
                "-webkit-animation": "rollUp " + animdurlTime + "s linear infinite",
                animation: "rollUp " + animdurlTime + "s linear infinite"
              };
            }
          });
    },
    isShowFirst() {
      var that = this;
      var key = this.key;
      GB.utils.callCustomMethod(
        "readAppStorage",
        {
          key: key
        },
        function(responseData) {
          var _responseData = JSON.parse(responseData);
          if (_responseData[key] == "true") {
            that.firstShow = false;
            return;
          } else if(!that.isDraw){
            that.firstShow = true;
          }
        }
      );
    },
    //添加机会
    addChange() {
      var height = $(".flopCard").offset().top;
      window.scrollTo(0, height);
    },
    //邀请
    gotoInvite(e) {
      if (this.come) {
        GB.utils.callCustomMethod("goBack", {});
        return;
      }
      this.trackHeatMap(e);
      var params_shared = {
          type: "1", //分享类型 1：新闻类分享  2：截图分享
          code: this.invitationCode, //分享code，分享统计标示   分享出去邀请用户
          needLogin: "1",
          platform: "0", //0:弹出选择平台 1:微信好友 2:微信朋友圈 3：QQ好友 4：QQ空间 5：复制链接
          pushShareMark: "1" //是否需要统计用户分享
      };
      GB.utils.callCustomMethod("share", params_shared);
    },
    //前往投资
    gotoInvest(e) {
      this.trackHeatMap(e);
      var data = {
        tabIndex: 1
      };
      GB.utils.callCustomMethod("showProductTab", data);
    },
    luckDraw(e,idx) {
      if (this.cardsStatus != 2) {
        return;
      }
      if (!this.telephone) {
        this.callAppLogin();
        return;
      }
      this.trackHeatMap(e);
      // this.cardsStatus = 4;//暂时用不到4这个状态

      var data = {
        activityCode: this.activityCode,
        seqNo: 5,
        telephone: this.telephone,
        sessionId: this.sessionId
      };
      luckDraw(data).then(res => {
        if (res.data.code == "0000") {
          this.cardsStatus = 3;
          this.prizeType = res.data.data.prizeType;
          this.prizeName = res.data.data.prizeName;
          this.winningResult = res.data.data.winningResult;
          this.prizeDesc = JSON.parse(res.data.data.userDrawPrizeInfo.prizeDesc);
          let type = res.data.data.userDrawPrizeInfo.prizeType
          this.recordListInfo.forEach((item,index)=>{
            if(item.prizeType==type){
               this.recordListInfoIndex = index
            }
          })
          this.drawReward(idx);
        } else {
          GB.utils.htoast(res.data.msg);
        }
      });
    },
    //用户领取每日翻盘机会
    drawChance(e,i) {
      if (!this.telephone) {
        this.callAppLogin();
        return;
      }
      this.trackHeatMap(e);
      var data = {
        activityCode: this.activityCode,
        telephone: this.telephone,
        sessionId: this.sessionId
      };
      drawChance(data).then(res => {
        if (res.data.code == "0000") {
          this.receiveStatus = res.data.data.status;
        } else {
          GB.utils.htoast(res.data.msg);
        }
        this.handleStatus(i);
      });
    },
    handleStatus(i) {
      var that = this;
      that.firstShow = false;
      if (i == 2) {
        this.getUserDrawPrizeInfo();
        this.$nextTick(() => {
         if (that.receiveStatus == 1) {
            GB.utils.htoast("领取成功");
          }
          if (that.receiveStatus == 2) {
            GB.utils.htoast("需完成首购可领取");
          }
       });
      }
      if (i == 1) {
         if (that.receiveStatus == 1) {
            GB.utils.htoast("领取成功");
          }
          if (that.receiveStatus == 2) {
            GB.utils.htoast("需完成首购可领取");
          }
        this.getUserDrawPrizeInfo();
      }
      var key = this.key;
      GB.utils.callCustomMethod("saveAppStorage", {
        key: key,
        value: "true"
      });
    },

    //用户首页信息
    getUserDrawPrizeInfo() {
      var data = {
        activityCode: this.activityCode,
        telephone: this.telephone,
        sessionId: this.sessionId
      };
      getUserDrawPrizeInfo(data).then(res => {
        if (res.data.code == "0000") {
          var data = res.data.data.userDrawPrizeInfo;
          this.investTotalMoney = data.investTotalMoney;
          this.isDraw = data.isDraw;
          this.userInvestCount = data.userInvestCount;
          this.userInviteCount = data.userInviteCount;
          this.userTotalCount = data.userTotalCount;
          this.prizeCount = data.prizeCount;
          this.userSignCount = data.userSignCount;
          if(this.activityStatus==2){
            this.isShowFirst(); //是否展示弹框
          }
        }
      });
    },
    getActInfo(){
      var that = this;
      var data = {
        activityCode: this.activityCode
      };
      getActInfo(data).then(res => {
        let resData = res.data
        if (resData.code == "0000") {
          that.activityStatus = resData.data.actStatus;
          if(that.activityStatus==2){
            that.getWinningList();
          }
//           else if(that.activityStatus==3){
//             clientInit.done(function() {
//               GB.utils.callCustomMethod("setTopRightButton", {
//                 title: ""
//               });
//             });
//           }
          if(that.activityStatus!=1){
            if(that.telephone){
              that.getUserDrawPrizeInfo();
            }
          }
        }
      });
    },
    //登录
    callAppLogin() {
      this.user.callAppLogin();
    },
    //随机排列坐标
    shuffle(arr, index) {
      var len = arr.length;
      for (var i = 0; i < len - 1; i++) {
        var idx = Math.floor(Math.random() * (len - i));
        if (i !== idx) {
        }
        var temp = arr[idx];
        arr[idx] = arr[len - i - 1];
        arr[len - i - 1] = temp;
      }
      return arr;
    },
    //抽奖
    drawReward(idx) {
      var that = this;
      var index; //
      for (let i = 0; i < 9; i++) {
        if (this.rewardPrizeType[i].prizeType == this.prizeType) {
          index = i;
        }
      }
      var currentCoor = this.coordinateArr[idx]; //当前抽奖坐标
      var prizeObj = $(".card-area").children(".poker-item")[index]; //抽奖的结果
      var prizeObjTop = $(prizeObj).css("top");
      var prizeObjLeft = $(prizeObj).css("left");
      var currentObj = $(".card-area").children(".poker-item")[idx];
      var currentTop = $(currentObj).css("top");
      var currentLeft = $(currentObj).css("left");

      $(prizeObj).css("top", currentTop);
      $(prizeObj).css("left", currentLeft);
      $(currentObj).css("top", prizeObjTop);
      $(currentObj).css("left", prizeObjLeft);
      this.drawClick = index;
      setTimeout(function() {
        that.isShowBack = false;
      }, 800);
      setTimeout(function() {
        that.rewardShow = true;
      }, 2000);
    },
    //洗牌
    shuffleCards() {
      var that = this;
      //未登录 return
      if (!this.telephone) {
        this.callAppLogin();
        return;
      }
      //无翻牌次数 return
      if (this.userTotalCount == 0) {
        GB.utils.htoast('你还没有翻牌机会，请先增加机会');
        return;
      }
      //点击牌面开始游戏
      if (this.cardsStatus == 0) {
        that.drawClick = -1;
        this.cardsStatus = 1;
        var $pokerItem = $(".card-area").children(".poker-item");
        this.isShowBack = true;
        this.randomPoker($pokerItem, 1, function() {
          that.cardsStatus = 2;
        });
      }
    },
    //洗牌中。。。
    randomPoker: function(obj, count, fn) {
      var flag = 1;
      var flag1 = 1;
      var that = this;
      setTimeout(function() {
        obj.each(function() {
          $(this).animate(
            {
              top: 305 / 75 + "rem",
              left: 215 / 75 + "rem"
            },
            500,
            function() {
              if (flag1 == 1) {
                while (count--) {
                  var arr = that.shuffle(that.coordinateArr);
                  obj.each(function(index) {
                    $(this).animate(
                      {
                        top: arr[index][0] / 75 + "rem",
                        left: arr[index][1] / 75 + "rem"
                      },
                      500,
                      function() {
                        if (flag == 1 && count == -1) {
                          // if (promotionObj.showTip) {
                          //   $dialog_tip2.show();
                          // }
                          //that.cardsStatus = 2;
                          if (fn) {
                            fn();
                          }
                        }
                        flag++;
                      }
                    );
                  });
                }
              }
              flag1++;
            }
          );
        });
      }, 400);
    },
    //活动细则
    goRule(e) {
      this.trackHeatMap(e);
      location.href = basePath + '/html/pages/flopRules/';
    },
    //翻牌记录
    goRecord(e) {
      if (!this.telephone) {
        this.callAppLogin();
        return;
      }
      this.trackHeatMap(e);
      if(this.prizeCount<=0){
        GB.utils.htoast("您还没有获得奖励哦~");
        return;
      }
      location.href = basePath + '/html/pages/flopRecord/';
    },
    //关闭每日领取弹框
    closeReceiveModel() {
      this.firstShow = false;
      var key = this.key;
      GB.utils.callCustomMethod("saveAppStorage", {
        key: key,
        value: "true"
      });
    },
    //关闭抽奖结果
    closeReward(e) {
      this.trackHeatMap(e);
      this.rewardShow = false;
      this.isShowBack = false;
      this.getUserDrawPrizeInfo();
      this.getWinningList();
      this.cardsStatus = 0; //恢复牌的状态
    }
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
  200%{
      -webkit-transform: translateY(-200%);
    -moz-transform: translateY(-200%);
    -ms-transform: translateY(-200%);
    -o-transform: translateY(-2100%);
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
.width() {
  .px2rem(width,700);
  margin: 0 auto;
}
// 行高设置问题
.lineHeight{
	display: table-cell;
	text-align: center;
	vertical-align: middle;
}
.border(@size,@color) {
  @bor: @size / 75 * 1rem;
  border: @bor solid @color;
}
[v-cloak] {
  display: none !important;
}
.index-page {
  background-color: #D1E6FF !important;
  .px2rem(font-size,28);
  color: #333333;
  header {
    .bg-img("banner.png",750,958);
    margin: 0 auto;
    display: flex;
    align-items: flex-end;
    position: relative;
    background-attachment:fixed;
    z-index: 1;
    .mask{
      width: 100%;
      height: 100%;
      .bg-img("banner.png",750,958);
      .pa();
      top: 0;
      left: 0;
      z-index:2;
    }
    .rule {
      color: #FFFFFF;
      position: absolute;
      right: 0;
      .px2rem(top,121);
      background: #B27511;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      .px2rem(width,50);
      .px2rem(height,140);
      z-index: 3;
      .rule-content{
        .px2rem(width,50);
        .px2rem(height,140);
        .px2rem(padding-top,14);
        .px2rem(padding-bottom,14);
        background: #F5A623;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        .pa();
        .px2rem(bottom,10);
        .px2rem(font-size,24);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span {
          display: block;
          line-height: 1.3;
        }
      }
    }
    .record {
      color: #FFFFFF;
      position: absolute;
      right: 0;
      .px2rem(top,291);
      background: #109842;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      .px2rem(width,50);
      .px2rem(height,140);
      z-index: 3;
      .record-content{
        .px2rem(width,50);
        .px2rem(height,140);
        .px2rem(padding-top,14);
        .px2rem(padding-bottom,14);
        background: #3CBF6D;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        .pa();
        .px2rem(bottom,10);
        .px2rem(font-size,24);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span {
          display: block;
          line-height: 1.3;
        }
      }
    }

  }
  article {
    .px2rem(padding-bottom,100);
    .pa();
    .px2rem(top,493);
    width: 100%;
     z-index:3;
    .card-model {
      .width();
      .px2rem(border-radius,30);
      background: #FFFFFF;
      .px2rem(padding-top,80);
      box-sizing: border-box;
      p{
        .px2rem(font-size,36);
        font-weight: 700;
        text-align: center;
      }
      .flop-num{
        .px2rem(font-size,36);
        color:#F72D06;
        font-family: 'DIN-Bold';
      }
      .flop-tip{
        .px2rem(font-size,26);
        .px2rem(margin-top,12);
        .px2rem(line-height,37);
        color: #9B9B9B;
        .px2rem(letter-spacing,1.26);
         font-weight: 400;
      }
      .flop-tip-add{
        text-decoration: underline;
      }
      .login-in{
        color:#FFD200;
        text-decoration: underline;
      }
      .card-area {
        position: relative;
        .px2rem(width,620);
        .px2rem(height,974);
        margin: 0 auto;
        .px2rem(margin-top,50);
        .poker-item {
          .pa();
          .px2rem(width, 190);
          .px2rem(height, 280);
          perspective: 500px;
          left: 0;
          top: 0;
          &.item1 {
            top: 0;
            left: 0;
          }
          &.item2 {
            top: 0;
            .px2rem(left, 215);
          }
          &.item3 {
            top: 0;
            .px2rem(left, 430);
          }
          &.item4 {
            .px2rem(left, 0);
            .px2rem(top, 305);
          }
          &.item5 {
            .px2rem(top, 305);
            .px2rem(left, 215);
          }
          &.item6 {
            .px2rem(top, 305);
            .px2rem(left, 430);
          }
          &.item7 {
            .px2rem(top, 610);
            .px2rem(left, 0);
          }
          &.item8 {
            .px2rem(top, 610);
            .px2rem(left, 215);
          }
          &.item9 {
            .px2rem(top, 610);
            .px2rem(left, 430);
          }
        }
        .poker-3d {
          transform-style: preserve-3d;
          transition: all 1s ease 0s;
          -webkit-transition: all 1s ease 0s;
          width: 100%;
          height: 100%;
          color: #000;
          .px2rem(font-size, 45);
          & > div {
            transition: all 1s ease;
            -webkit-transition: all 1s ease;
          }
          .front {
            .pa();
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .back {
            .pa();
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            transform: rotateY(180deg);
            -webkit-transform: rotateY(180deg);
            .bg-img("card-bk.png",190,280);
          }
          &.hover {
            & > div {
              transition: all 1s ease;
              -webkit-transition: all 1s ease;
            }
            .front {
              transform: rotateY(-180deg);
              -webkit-transform: rotateY(-180deg);
            }
            .back {
              transform: rotateY(0);
              -webkit-transform: rotateY(0);
            }
          }
          &.hoverOver {
            & > div {
              transition: all 1s ease;
              -webkit-transition: all 1s ease;
            }
            .front {
              transform: rotateY(0deg);
              -webkit-transform: rotateY(0deg);
            }
            .back {
              transform: rotateY(-180deg);
              -webkit-transform: rotateY(-180deg);
            }
          }
        }
        img {
          .px2rem(width,184);
          .px2rem(height,283);
        }
      }
      // 活动结束
      .activity-ending{
        position: relative;
        .px2rem(width,620);
        .px2rem(height,974);
        margin: 0 auto;
        .px2rem(margin-top,50);
        .px2rem(margin-bottom,75);
        p{
          .bg-img("ending.png",620,900);
        }
      }
    }
    .flopCard {
      .width();
      .px2rem(border-radius,30);
      background: #FFFFFF;
      .px2rem(padding-top,80);
      box-sizing: border-box;
      .px2rem(margin-top,30);
      .px2rem(padding-bottom,70);
      .title {
        margin: 0 auto;
        display: flex;
        align-items: flex-end;
        position: relative;
        .px2rem(margin-bottom,38);
        p {
          font-weight: bold;
          margin: 0 auto;
          text-align: center;
          .px2rem(line-height,50);
          .px2rem(font-size,36);
          .px2rem(letter-spacing,2.25);
        }
      }
      .content {
        .width();
        // background-color: #680000;
        // border: 3px solid #aa0303;
        // .px2rem(padding-top,62);
        // .px2rem(margin-top,-20);
        & > div {
          position: relative;
          background-color: #FFF7EB;
          border-radius: 5px;
          .px2rem(width,640);
          margin: 0 auto;
          .px2rem(margin-bottom,30);
          padding-top: 1px;
          .px2rem(padding-right,30);
          .px2rem(padding-left,40);
          .top{
            .px2rem(padding-top,50);
            .px2rem(padding-bottom,30);
            border-bottom:1px solid  #ECE9D3;
            display: flex;
            align-items: center;
            //  justify-content : center;
              justify-content :space-between;
            .top-title{
              .px2rem(font-size,30);
              .px2rem(margin-right,40);
              .px2rem(letter-spacing,1.88);
              font-weight: 700;
            }
            .top-btn{
              flex-shrink: 0;
              .px2rem(width,180);
              .px2rem(height,70);
              background: #FFD200;
              border: 2px solid #FFF1B1;
              border-radius: 19px;
              font-weight: 700;
              color: #322400;
              .px2rem(letter-spacing,1.7);
              display: flex;
              align-items: center;
              justify-content : center;
            }
            .gray{
              background: #EBEBEB;
              border: 2px solid #EBEEF5;
              color: #C2C2C4;
            }
          }
          .bottom{
            .px2rem(padding-top,20);
            .px2rem(padding-bottom,40);
            .px2rem(line-height,34);
            p{
              .px2rem(font-size,24);
              color: #9B9B9B;
              .bottom-num{
                .px2rem(font-size,26);
                color: #FF6137!important;
                font-family: "DIN-Bold";
              }
            }
          }
        }
        .div3{
          overflow: hidden;
          margin-bottom: 0;
          .bottom{
            display: flex;
            div{
              flex:1;
              text-align: left;
              .bottom-num{
                .px2rem(font-size,26);
                color: #FF6137!important;
                font-family: "DIN-Bold";
              }
              p{
                .px2rem(font-size,24);
                color: #9B9B9B;
              }
            }
          }
        }
      }
    }
  }
  //每日免费领
  .receive-eval {
    .px2rem(width,  542);
    .px2rem(height,716);
    background: #F6F6F6;
    box-shadow: inset 0 0 10px 0 #FFD200;
    border-radius: 15px;
    .px2rem(padding-top,96);
    .pr();
    .receive-close{
      .bg-img("close.png",22,22);
      .pa();
      .px2rem(top,40);
      .px2rem(right,40);
      z-index:999;
    }
    .receive-hy{
      .px2rem(font-size,40);
      color: #322400;
      .px2rem(line-height,50);
      font-weight: 700;
      text-align: center;
    }
    .receive-img{
      margin:0 auto;
      .bg-img("receive-day.png",210,270);
      .px2rem(margin-top,50);
      .px2rem(margin-bottom,40);
      
    }
    .receive-btn{
      margin:0 auto;
      .px2rem(width,380);
      .px2rem(height,90);
      .px2rem(font-size,32);
      background: #FFD200;
      border: 2px solid #FFF1B1;
      border-radius: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      color: #322400;
      .px2rem(letter-spacing,2);
    }
  }
  //抽到奖励
  .receive-record-bg {
    .px2rem(width, 542);
    height: auto;
  // .px2rem(height, 593);
  .px2rem(padding-left, 62);
  .px2rem(padding-right, 62);
  .px2rem(padding-top, 160);
  .px2rem(padding-bottom, 70);
  background: #F6F6F6;
  box-shadow: inset 0 0 10px 0 #FFD200;
  border-radius: 15px;
  .pr();
  .record-close{
    .bg-img("close.png",22,22);
    .pa();
    .px2rem(top, 40);
    .px2rem(right, 40);
    z-index: 999;
  }
  .recoed-img{
    .px2rem(width, 236);
    .px2rem(height, 174);
    .pa();
    .px2rem(top, -76);
    left: 50%;
    .px2rem(margin-left, -128);
  }
  .fixed{
    .tip{
      .px2rem(font-size, 34);
      .px2rem(line-height, 55);
      color: #322400;
      letter-spacing: 0;
      text-align: center;
    }
    .record-name{
      font-weight: 700;
      .px2rem(font-size, 40);
      .px2rem(line-height, 55);
      color: #322400;
      letter-spacing: 0;
      text-align: center;
      .px2rem(margin-top, 4);
    }
    .record-gary{
      .px2rem(font-size, 24);
      .px2rem(line-height, 40);
      color: #9B9B9B;
      letter-spacing: 0;
      text-align: center;
      .px2rem(margin-top, 20);
    }
    .record-btn{
      .px2rem(width, 380);
      .px2rem(height, 90);
      background: #FFD200;
      border: 2px solid #FFF1B1;
      border-radius: 22px;
      .px2rem(font-size, 32);
      color: #322400;
      .px2rem(letter-spacing,2);
      font-weight: 700;
      display: flex;
      justify-content: center;
      align-items: center;
      margin:0 auto;
      .px2rem(margin-top, 60);
    }
  }
  }
}
</style>
