<template>
    <div class="index-page" v-cloak>
      <header>
        <div class="mask"></div>
        <!-- 抽奖记录-->
        <!-- <record-list></record-list> -->
        <record-list :filterWinningList='filterWinningList' :rollWinningStyle='rollWinningStyle'  v-if="filterWinningList.length!=0"></record-list>
        <!-- 活动细则 -->
        <div class="rule" @click="goRule($event)">
            <p class='rule-content'>
              <span>活</span><span>动</span><span>细</span><span>则</span>
            </p>
        </div>
      </header>
      <article>
        <!-- 牌面区 start-->
        <div class="card-model">
           <!-- 已登录 -->
            <p class="nochange">剩余翻牌次数：<span class="flop-num">{{drawNum}}</span>次</p>
              <!-- 有翻牌次数 -->
              <p class='flop-tip' v-if="cardsStatus==0 && isClickFlopShow=='false'"><span>点击牌面开始游戏</span></p>
              <p class='flop-tip' v-else-if="cardsStatus==1">洗牌中...</p>
              <p class='flop-tip' v-else-if="cardsStatus==2">选择想翻的牌</p>
              <p class='flop-tip' v-else-if="cardsStatus==3">暂无抽奖机会</p>

           <div class="card-area" @click="shuffleCards">
               <div :class="['poker-item','item'+(index+1)]" v-for="(item,index) in rewardPrizeType" :key="index" >
                  <div class="poker-3d" :class="[isShowBack && drawClick!==index?'hover':'',drawClick==index?'hoverOver':'']" @click="drawReward($event,index)">
                      <div class="front"><img :src="item.imgUrl" /></div>
                      <div class="back"></div>
                  </div>
              </div>
           </div>
        </div>
         <!-- 牌面区 end-->
        <!-- <vue-seamless-scroll></vue-seamless-scroll> -->
         <footer-tip></footer-tip>

      </article>
      <!-- 礼物领取弹框 start-->
      <v-modalTip v-show="rewardShow">
         <div class="receive-eval" v-if="isClickFlopShow=='false'">
           <div class="close"  @click="closeReward"></div>
           <p class="title">谢谢参与</p>
           <p class="content">哎呀，还差一点就抽到了~
              赶紧去黄金钱包，获得更多翻牌机会~</p>
           <p class='btn' @click="download">立即前往</p>
           <p class="goInvest" @click="gotoInvite($event)" id="participate880">新用户还有880元大礼可领取</p>
         </div>
          <div class="receive-eval" v-if="isClickFlopShow=='true'">
            <div class="close"  @click="closeReward"></div>
            <p class="title">暂无抽奖机会</p>
            <p class="content">前往黄金钱包APP可以额外领取一次翻牌机会哟！</p>
            <p class='btn' @click="download">立即前往</p>
            <p class="goInvest" @click="gotoInvite($event)" id='noChance880'>新用户还有880元大礼可领取</p>
         </div>
      </v-modalTip>
      <!-- 礼物领取弹框 end-->
    </div>
</template>
<script>
import util from "../../utils/tool.js";
import { openApp } from "../../commonScript/download.js";
import wxShare from "../../commonScript/wxShare.js";
import recordList from './components/recordList.vue'
import footerTip from './components/footer.vue'
import {
  getWinningList
} from "../../service/common/prizeDraw/service.js";
export default {
  data() {
    return {
      isClickFlopShow:0,
      drawNum:1,
      activityCode:27,
      filterWinningList:[],
      actNewYearCode: "flopActivity201907",
      positionNum: 0, //礼物领取弹框位置
      rewardShow: false, //是否展示抽奖结果
      cardsStatus: 0, //牌的状态 0：初始 1：洗牌中 2：洗牌完成 3：暂无抽奖机会 4:已抽取
      prizeType: "", //抽奖结果类型
      isShowBack: false,
      winningList:[],
      invitationCode:'flopInvitation201907',
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
          imgUrl: require("./res/card-thanks.png"),
          name: '谢谢参与',
          prizeType: 1208
        },
        {
          imgUrl: require("./res/card-5.88XJ.png"),
          name: '5.88元现金',
          prizeType: 1202
        },
      ],
      drawClick: -1 ,//点击区域
      rollWinningStyle:''
    };
  },
  watch: {},
  filters: {},
  components: {
    recordList,
    footerTip
  },
  mounted() {
    this.getWinningList();
    if(!localStorage.getItem('isClickFlopShow')){
      this.drawNum = 1;
      this.isClickFlopShow = 'false';
    }else{
      this.drawNum = 0;
      this.isClickFlopShow='true';
    }
    wxShare.getShareInfo("", this.actNewYearCode);
  },
  methods: {
    gotoInvite(e){
      // this.trackHeatMap(e);
      // var params_shared = {
      //     type: "1", //分享类型 1：新闻类分享  2：截图分享
      //     code: this.invitationCode, //分享code，分享统计标示   分享出去邀请用户
      //     needLogin: "1",
      //     platform: "0", //0:弹出选择平台 1:微信好友 2:微信朋友圈 3：QQ好友 4：QQ空间 5：复制链接
      //     pushShareMark: "1" //是否需要统计用户分享
      // };
      // GB.utils.callCustomMethod("share", params_shared);
      if(e){
        this.trackHeatMap(e);
      }
      window.location.href=`https://app-activity.g-banker.com/wxLogin?redirectUrl=https://app-activity.g-banker.com/html/pages/wxLandingPage/?shareCode=${this.invitationCode}&userCode={0}&channelCode=xxx`
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
    drawReward(e,idx) {
      var that = this;
      this.trackHeatMap(e);
      if(this.drawNum==0){
        this.rewardShow = true;
        this.isClickFlopShow =  localStorage.getItem('isClickFlopShow');
        return;
      }
      if (this.cardsStatus != 2) {
        return;
      }
      localStorage.setItem('isClickFlopShow','true');
      
      // this.cardsStatus = 4;
      var index; //
      this.prizeType = 1208; ///模拟抽奖结果
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
        that.drawNum = 0;
        that.cardsStatus = 3;
      }, 2000);
    },
    //洗牌
    shuffleCards() {
      var that = this;
      //点击牌面开始游戏
      if (this.cardsStatus == 0 && this.drawNum!=0) {
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
    //关闭抽奖结果
    closeReward() {
      var that = this;
      this.rewardShow = false;
    },
    download() {
      openApp();
      // this.isClickFlopShow =  localStorage.getItem('isClickFlopShow');
    },
    /**
     * 埋点
     */
    trackHeatMap(e){
		  this.$sa.quick('trackHeatMap', e.currentTarget);
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
      z-index: 10;
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
    }
  }
  //每日免费领
  .receive-eval {
    .px2rem(width,542);
    .px2rem(padding-top,116);
    .px2rem(padding-bottom,70);
    .px2rem(padding-left,70);
    .px2rem(padding-left,62);
    .px2rem(padding-right,62);
    color: #322400;
    background: #F6F6F6;
    box-shadow: inset 0 0 10px 0 #FFD200;
    border-radius: 15px;
    p{
      text-align: center;
    }
    .close{
       .bg-img("close.png",22,22);
       .pa();
       .px2rem(top,40);
       .px2rem(right,40);
       z-index:999;
    }
    .title{
      .px2rem(font-size,40);
      .px2rem(line-height,55);
      font-weight: 700;
    }
    .content{
      .px2rem(line-height,40);
       .px2rem(margin-top,25);
    }
    .btn{
      .px2rem(width,380);
      .px2rem(height,90);
      background: #FFD200;
      border: 2px solid #FFF1B1;
      border-radius: 22px;
      display: flex;
      justify-content: center;
      align-items: center;
      .px2rem(font-size,32);
      .px2rem(letter-spacing,2);
      font-weight: 700;
      margin: 0 auto;
      .px2rem(margin-top,60);
      
    }
    .goInvest{
      .px2rem(font-size,26);
      color: #FF8133;
      text-decoration: underline;
      .px2rem(margin-top,40);
    }
  }
}

</style>
