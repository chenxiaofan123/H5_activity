<template>
    <div class="index-page" v-cloak>
      <header>
         <div>
           <!-- 已登录 -->
           <p v-if="isLogin===1">当前剩余次数{{userTotalCount}}次</p>
           <!-- 未登录 -->
           <p v-if="isLogin===0">请前往<span @click="callAppLogin">登录</span></p>
         </div>
         <!-- 活动细则 -->
         <p class="rule" @click="goRule()"><span>活</span><span>动</span><span>细</span><span>则</span></p>
         <!-- 翻牌记录 -->
         <p class="record" @click="goRecord()"><span>翻</span><span>牌</span><span>记</span><span>录</span></p>
      </header>
      <article>
        <!-- 牌面区 start-->
        <div class="card-model">
           <!-- 未登录 -->
           <p v-if="isLogin===0">登录后可查看翻牌次数</p>
           <!-- 已登录 -->
           <template v-if="isLogin===1">
              <!-- 无翻牌次数 -->
              <p class="nochange" v-show="userTotalCount==0" @click="addChange"><span>去增加翻牌机会</span></p>
              <!-- 有翻牌次数 -->
              <template v-if="userTotalCount>0">
                <p v-show="cardsStatus==0">点击牌面开始游戏</p>
                <p v-show="cardsStatus==1">洗牌中...</p>
                <p v-show="cardsStatus==2">选择想翻的牌</p>
              </template>
              
           </template>
           

           <div class="card-area" @click="shuffleCards">
               <div :class="['poker-item','item'+(index+1)]" v-for="(item,index) in rewardPrizeType" :key="index" >
                  <div class="poker-3d" :class="[isShowBack && drawClick!==index?'hover':'',drawClick==index?'hoverOver':'']" @click="luckDraw(index)">
                      <div class="front"><img :src="item.imgUrl" /></div>
                      <div class="back"></div>
                  </div>
              </div>
           </div>
        </div>
         <!-- 牌面区 end-->

         <!-- 抽奖记录 start-->
         <div class="reward-list" v-if="filterWinningList.length!=0">
            <ul :style="rollWinningStyle">
              <li v-for="(item,index) in filterWinningList" :key="index">
                <p>{{item.telephone}}</p>
                <p>刚刚抽到</p>
                <p>{{item.prizeName}}</p>
              </li>
            </ul>
             <ul :style="rollWinningStyle" v-if="filterWinningList.length>3" class="ul2">
              <li v-for="(item,index) in filterWinningList" :key="index">
                <p>{{item.telephone}}</p>
                <p>刚刚抽到</p>
                <p>{{item.prizeName}}</p>
              </li>
            </ul>
         </div>
         <!-- 抽奖记录 end-->

         <!-- 如何获得翻牌机会 start-->
         <div class="flopCard">
           <div class="title">
             <p>如何获得翻牌机会</p>
           </div>
            <div class="content">
              <div class="div1">
                 <p class="top"></p>
                 <p class="content-title">投资</p>
                 <p class="intro">活动期间，累计投资每满10000元可获得1次翻牌机会（规则详见活动细则）</p>
                 <button class="button" @click="gotoInvest">前往投资</button>
                 <p class="line"></p>
                 <div class="invest-info">
                   <div>
                     <p>当前累计投资额</p>
                     <p v-if="isLogin===1">{{investTotalMoney|moneyUnit}}元</p>
                     <p v-if="isLogin===0">--元</p>
                   </div>
                   <div>
                     <p>累计获得翻牌机会</p>
                     <p v-if="isLogin===1">{{userInvestCount}}次</p>
                     <p v-if="isLogin===0">--次</p>
                   </div>
                 </div>
                 <p class="bottom"></p>
              </div>   
              <div class="div2">
                 <p class="top"></p>
                 <p class="content-title">邀请好友</p>
                 <p class="intro">每邀请1位用户完成首购，可获得1次翻牌机会（规则详见活动细则）</p>
                 <button class="button" @click="gotoInvite">前往邀请</button>
                 <p class="invite-info" v-if="isLogin===1">当前累计<span>{{userInviteCount}}</span>位好友首购成功</p>
                 <p class="invite-info" v-if="isLogin===0">当前累计<span>--</span>位好友首购成功</p>
                 <p class="bottom"></p>
              </div> 
               <div class="div3">
                 <p class="top"></p>
                 <p class="content-title">免费领取</p>
                 <p class="intro">每日可免费领取一次翻牌机会，祝大家新年玩得开心。</p>
                 <div class="button" v-if="!isDraw" @click="drawChance(1)">立即领取</div>
                 <div class="gray" v-if="isDraw">今日已领取</div>
                 <p class="bottom"></p>        
             </div>         
             </div>
         </div>
         <!-- 如何获得翻牌机会 end-->
         <p class="footer-tips">市场有风险  投资需谨慎</p>
      </article>
      <!-- 每日领取弹框 start-->
      <v-modalTip v-show="firstShow" :positionNum="positionNum">
         <div class="receive-eval">
           <p @click="drawChance(2)">立即领取</p>
         </div>
         <p class="receive-close" @click="closeReceiveModel"></p>
      </v-modalTip>
      <!-- 每日领取弹框 end-->

      <!-- 抽奖结果弹框 start -->
      <v-modalTip v-show="rewardShow">
        <div class="receive-record-bg">
           <div class="have-reward" v-show="prizeType!=1108">
             <p class="receive-text">恭喜你，获得</p>
             <div class="money">
               <span>¥</span><span>{{prizeName.split('元')[0]}}</span>
             </div>
             <div class="close-button" @click="closeReward">知道了</div>
             <p class="tips">预计5分钟内发放至你的钱包余额账户</p>
          </div>
          <div class="no-reward" v-show="prizeType==1108">
             <p class="thanks">谢谢参与</p>
             <p class="receive-text">哎呀，还差一点就抽到了，再接再厉哟～</p>
             <div class="close-button" @click="closeReward">知道了</div>
          </div>
        </div>
        
      </v-modalTip>
      <!-- 抽奖结果弹框 end -->
    </div>
</template>
<script>
import User from "../../service/common/User";
import util from "../../utils/tool.js";
import {
  getUserPrizeListInfo,
  getUserDrawPrizeInfo,
  drawChance,
  getWinningList,
  luckDraw
} from "../../service/common/prizeDraw/service.js";
export default {
  data() {
    return {
      user: new User(),
      come: "",
      telephone: "",
      sessionId: "",
      status:'',
      isLogin: "", //是否登录 0-未登录 1-已登录
      activityCode: 26,
      filterWinningList:[],
      actNewYearCode: "actNewYear2019",
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
      key: new Date().toLocaleDateString(),
      winningList: [],
      rollWinningStyle: "",
      coordinateArr: [
        [0, 0],
        [0, 212],
        [0, 424],
        [311, 0],
        [311, 212],
        [311, 424],
        [622, 0],
        [622, 212],
        [622, 424]
      ],
      rewardPrizeType: [
        {
          imgUrl: require("./res/card-88.png"),
          num: 88,
          prizeType: 1100
        },
        {
          imgUrl: require("./res/card-58.88.png"),
          num: 58.88,
          prizeType: 1101
        },
        {
          imgUrl: require("./res/card-18.88.png"),
          num: 18.88,
          prizeType: 1102
        },
        {
          imgUrl: require("./res/card-8.88.png"),
          num: 8.88,
          prizeType: 1103
        },
        {
          imgUrl: require("./res/card-0.58.png"),
          num: 0.58,
          prizeType: 1105
        },
        {
          imgUrl: require("./res/card-0.28.png"),
          num: 0.28,
          prizeType: 1106
        },
        {
          imgUrl: require("./res/card-thanks.png"),
          num: 0,
          prizeType: 1108
        },
        {
          imgUrl: require("./res/card-0.18.png"),
          num: 0.18,
          prizeType: 1107
        },
        {
          imgUrl: require("./res/card-1.88.png"),
          num: 1.88,
          prizeType: 1104
        }
      ],
      drawClick: -1 //点击区域
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
  components: {},
  mounted() {

    //this.positionNum = 129;
    //this.firstShow = true;
    // this.rewardShow = true;
    this.status = GB.utils.GetRequest()["status"]||'';
    this.come = GB.utils.GetRequest()["come"] || "";
    this.getWinningList();
    getShareInfo(sharebasePath, "", this.actNewYearCode);
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
        this.getUserDrawPrizeInfo(); //用户新年活动首页信息
        
      }
    });
  },
  methods: {
    getWinningList() {
      var data = {
        activityCode: this.activityCode,
        prizeType: 2
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
        if (length > 3) {
          let animdurlTime = length * 2;
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
    gotoInvite() {
      var url;
      if (this.come) {
        GB.utils.callCustomMethod("goBack", {});
        return;
      }
      // if (GB.utils.isDev()) {
      //   url =
      //     "https://test-app-activity.g-banker.com/html/pages/newYearInvite/?come=true";
      // } else {
      //   url =
      //     "https://app-activity.g-banker.com/html/pages/newYearInvite/?come=true";
      // }
      location.href = basePath + '/html/pages/newYearInvite/?come=true&status='+this.status;
    },
    //前往投资
    gotoInvest() {
      var data = {
        tabIndex: 1
      };
      GB.utils.callCustomMethod("showProductTab", data);
    },
    luckDraw(idx) {
      if (this.cardsStatus != 2) {
        return;
      }
      if (!this.telephone) {
        this.callAppLogin();
        return;
      }
      this.cardsStatus = 4;

      var data = {
        activityCode: this.activityCode,
        seqNo: 0,
        telephone: this.telephone,
        sessionId: this.sessionId
      };
      luckDraw(data).then(res => {
        if (res.data.code == "0000") {
          this.prizeType = res.data.data.prizeType;
          this.prizeName = res.data.data.prizeName;
          this.winningResult = res.data.data.winningResult;
          this.drawReward(idx);
        } else {
          GB.utils.htoast(res.data.msg);
        }
      });
    },
    //用户领取每日翻盘机会
    drawChance(i) {
      if (!this.telephone) {
        this.callAppLogin();
        return;
      }
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
        // setTimeout(function() {
        //   if (that.receiveStatus == 1) {
        //     GB.utils.htoast("领取成功");
        //   }
        //   if (that.receiveStatus == 2) {
        //     GB.utils.htoast("需完成首购可领取");
        //   }
        // }, 1500);
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

    //用户新年活动首页信息
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
          this.isShowFirst(); //是否展示弹框
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
              top: 311 / 75 + "rem",
              left: 212 / 75 + "rem"
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
    goRule() {
      //this.$router.push({ path: "/rules" });
      location.href = basePath + '/html/pages/actNewYearRules/';
    },
    //翻牌记录
    goRecord() {
      if (!this.telephone) {
        this.callAppLogin();
        return;
      }
     // this.$router.push({ path: "/myRecord" });
     location.href = basePath + '/html/pages/actNewYearRecord/';
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
    closeReward() {
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

.border(@size,@color) {
  @bor: @size / 75 * 1rem;
  border: @bor solid @color;
}
[v-cloak] {
  display: none !important;
}
.index-page {
  background-color: #921700 !important;
  .px2px(font-size,28);
  color: #07073a;
  header {
    .bg-img("banner.png",750,670);
    margin: 0 auto;
    display: flex;
    align-items: flex-end;
    position: relative;
    div {
      font-weight: bold;
      .bg-img("bg.png",545,98);
      margin: 0 auto;
      .px2rem(margin-bottom,10);
      text-align: center;
      .px2rem(line-height,98);
      .px2px(font-size,32);
      color: #eae1aa;
      letter-spacing: 2px;
      span {
        border-bottom: 1px solid #eae1aa;
        padding-bottom: 2px;
      }
    }
    .rule {
      color: #eae1aa;
      position: absolute;
      right: 0;
      .px2rem(top,316);
      background: #07073a;
      border: 1px solid #eae1aa;
      border-radius: 1px;
      .px2rem(width,60);
      .px2rem(height,200);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span {
        display: block;
      }
    }
    .record {
      color: #eae1aa;
      position: absolute;
      right: 0;
      .px2rem(bottom,-80);
      background: #07073a;
      border: 1px solid #eae1aa;
      border-radius: 1px;
      .px2rem(width,60);
      .px2rem(height,200);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span {
        display: block;
      }
    }
  }
  article {
    .px2rem(padding-bottom,75);
    .card-model {
      .width();
      background-color: #680000;
      border: 3px solid #aa0303;
      border-radius: 1px;
      .px2rem(padding-top,30);
      box-sizing: border-box;
      p {
        color: #db5d46;
        letter-spacing: 1.35px;
        text-align: center;
        .px2rem(margin-bottom,30);
        span {
          border-bottom: 1px solid #db5d46;
          padding-bottom: 2px;
        }
      }
      .card-area {
        position: relative;
        .px2rem(width,608);
        .px2rem(height,960);
        margin: 0 auto;

        .poker-item {
          .pa();
          .px2rem(width, 184);
          .px2rem(height, 283);
          perspective: 500px;
          left: 0;
          top: 0;
          &.item1 {
            top: 0;
            left: 0;
          }
          &.item2 {
            top: 0;
            .px2rem(left, 212);
          }
          &.item3 {
            top: 0;
            .px2rem(left, 424);
          }
          &.item4 {
            .px2rem(left, 0);
            .px2rem(top, 311);
          }
          &.item5 {
            .px2rem(top, 311);
            .px2rem(left, 212);
          }
          &.item6 {
            .px2rem(top, 311);
            .px2rem(left, 424);
          }
          &.item7 {
            .px2rem(top, 622);
            .px2rem(left, 0);
          }
          &.item8 {
            .px2rem(top, 622);
            .px2rem(left, 212);
          }
          &.item9 {
            .px2rem(top, 622);
            .px2rem(left, 424);
          }
        }
        .poker-3d {
          transform-style: preserve-3d;
          transition: all 1s ease 0s;
          -webkit-transition: all 1s ease 0s;
          width: 100%;
          height: 100%;
          color: #000;
          .px2px(font-size, 45);
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
            .bg-img("card-bk.png",184,283);
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
    }
    .reward-list {
      .width();
      background: #680000;
      border: 1px solid #aa0303;
      border-radius: 1px;
      .px2px(font-size,24);
      color: #f3846f;
      .px2rem(margin-top,30);
      .px2rem(height, 200);
      overflow: hidden;
      ul {
        .px2rem(padding-left,30);
        .px2rem(padding-right,30);
        box-sizing: border-box;
        li {
          .px2rem(padding-top,16);
          .px2rem(padding-bottom,16);
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #550000;
          p:first-child {
            .px2rem(width,312);
          }
          p:last-child {
            flex: 1;
            text-align: right;
          }
        }
      }
      //  .ul2{
      //   li:first-child{
      //     border-top: 1px solid #550000;
      //   }
      // }
    }
    .flopCard {
      .px2rem(margin-top,18);
      .title {
        .bg-img("change-bg.png",750,141);
        margin: 0 auto;
        display: flex;
        align-items: flex-end;
        position: relative;
        p {
          font-weight: bold;
          margin: 0 auto;
          .bg-img("bg.png",545,98);
          text-align: center;
          .px2rem(line-height,98);
          .px2px(font-size,32);
          color: #eae1aa;
          letter-spacing: 2px;
        }
      }
      .content {
        .width();
        background-color: #680000;
        border: 3px solid #aa0303;
        .px2rem(padding-top,62);
        .px2rem(margin-top,-20);
        & > div {
          position: relative;
          background-color: #ffffff;
          border: 2px solid #07073a;
          border-radius: 1px;
          .px2rem(width,610);
          margin: 0 auto;
          .px2rem(margin-bottom,74);
          padding-top: 1px;
          .top {
            .bg-img("huawen-top1.png",588,26);
            margin: 0 auto;
            .px2rem(margin-top,11);
          }
          .bottom {
            .bg-img("huawen-bottom1.png",588,26);
            margin: 0 auto;
            .px2rem(margin-bottom,11);
          }
          .content-title {
            font-weight: bold;
            .bg-img("bg2.png",274,65);
            .px2rem(line-height,65);
            .px2px(font-size,28);
            color: #eae1aa;
            text-align: center;
            position: absolute;
            left: 50%;
            .px2rem(top,-65/2);
            transform: translateX(-50%);
          }
          .intro {
            .px2rem(width,520);
            margin: 0 auto;
            .px2rem(margin-top,34);
          }
          .button {
            border:0px;background-color:transparent;
            display: block;
            font-weight: bold;
            .bg-img("button-bg.png",510,70);
            margin: 0 auto;
            .px2rem(margin-top,30);
            .px2rem(line-height,70);
            text-align: center;
            .px2px(font-size,32);
            color: #f6f2d4;
            letter-spacing: 1.29px;
            text-align: center;
            text-shadow: 0 1px 0 #ac0303;
          }
          .gray {
            .bg-img("button-gray.png",510,70);
            margin: 0 auto;
            .px2rem(margin-top,30);
            .px2rem(line-height,70);
            text-align: center;
            .px2px(font-size,32);
            color: #ffffff;
            letter-spacing: 1.29px;
            text-align: center;
            text-shadow: 0 1px 0 #b2b1b1;
          }
        }
        .div1 {
          .line {
            background-color: #ece9d3;
            .px2rem(width,538);
            height: 1px;
            margin: 0 auto;
            .px2rem(margin-top,21);
            .px2rem(margin-bottom,14);
          }
          .invest-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .px2rem(padding-left,65);
            .px2rem(padding-right,65);
            box-sizing: border-box;
            color: #9090a0;
            .px2rem(font-size,24);
            & > div {
              p {
                text-align: center;
              }
              p:last-child {
                color: #aa0303;
                font-weight: bold;
                .px2px(font-size,28);
              }
            }
          }
        }
        .div2 {
          .invite-info {
            .px2px(font-size,24);
            color: #9090a0;
            text-align: center;
            .px2rem(margin-top,34);
            .px2rem(margin-bottom,9);
            span {
              color: #aa0303;
              .px2px(font-size,28);
              .px2rem(margin-left,10);
              .px2rem(margin-right,10);
              font-weight: bold;
            }
          }
        }
        .div3 {
          .button {
            .px2rem(margin-bottom,29);
          }
        }
      }
    }
    .footer-tips {
      text-align: center;
      .px2px(font-size,24);
      color: #550202;
      .px2rem(margin-top,30);
    }
  }
  //每日免费领
  .receive-eval {
    .bg-img("in-toast-bg.png", 566, 570);
    display: flex;
    align-items: flex-end;
    p {
      .px2rem(width,350);
      .px2rem(height,64);
      .px2rem(line-height,64);
      text-align: center;
      .px2px(font-size,32);
      color: #ce1717;
      background: #fff9d6;
      border: 1px solid #af0404;
      .px2rem(border-radius,32);
      font-weight: bold;
      margin: 0 auto;
      .px2rem(margin-bottom,89);
    }
  }
  //关闭
  .receive-close {
    .bg-img-common("close.png",66,66);
    margin: 0 auto;
    .px2rem(margin-top,60);
  }
  //抽到奖励
  .receive-record-bg {
    .bg-img("toast-bg.png",442,679);
    text-align: center;
    color: #ce1717;
    .px2px(font-size,32);
    .close-button {
      background-color: #ffffff;
      border: 1px solid #ce1717;
      .px2rem(border-radius,32);
      .px2rem(width,290);
      .px2rem(height,64);
      .px2rem(line-height,64);
      margin: 0 auto;
      .px2rem(margin-top,60);
    }
    .have-reward {
      .px2rem(padding-top,160);
      .receive-text {
        .px2rem(margin-bottom,16);
      }
      .money {
        position: relative;
        .px2px(font-size,64);
        font-weight: bold;
        span:last-child {
          .px2rem(font-size,112);
          font-family: "DIN-Bold";
          line-height: 1;
        }
      }

      .tips {
        .px2px(font-size,24);
        color: #07073a;
        .px2rem(width,290);
        margin: 0 auto;
        .px2rem(margin-top,24);
      }
    }
    .no-reward {
      .px2rem(padding-top,160);
      .px2rem(width,290);
      margin: 0 auto;
      .thanks {
        font-weight: bold;
        .px2px(font-size,46);
        color: #ce1717;
        .px2rem(margin-bottom,30);
      }
      .receive-text {
      }
      .close-button {
        .px2rem(margin-top,97);
      }
    }
  }
}
</style>
