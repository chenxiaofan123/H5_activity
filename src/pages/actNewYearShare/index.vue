<template>
    <div class="index-page" v-cloak>
      <header>
         <div>
           <p>当前剩余次数{{drawNum}}次</p>
         </div>
         <!-- 活动细则 -->
         <!-- <p class="rule" @click="goRule()"><span>活</span><span>动</span><span>细</span><span>则</span></p> -->
      </header>
      <article>
        <!-- 牌面区 start-->
        <div class="card-model">
           <!-- 已登录 -->
              <!-- 有翻牌次数 -->
              <p v-show="cardsStatus==0 && isClickShow=='false'"><span>点击牌面开始游戏</span></p>
              <p v-show="cardsStatus==1">洗牌中...</p>
              <p v-show="cardsStatus==2">选择想翻的牌</p>

           <div class="card-area" @click="shuffleCards">
               <div :class="['poker-item','item'+(index+1)]" v-for="(item,index) in rewardPrizeType" :key="index" >
                  <div class="poker-3d" :class="[isShowBack && drawClick!==index?'hover':'',drawClick==index?'hoverOver':'']" @click="drawReward(index)">
                      <div class="front"><img :src="item.imgUrl" /></div>
                      <div class="back"></div>
                  </div>
              </div>
           </div>
        </div>
         <!-- 牌面区 end-->
        <!-- <vue-seamless-scroll></vue-seamless-scroll> -->
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

         <p class="footer"></p>

      </article>
      <!-- 每日领取弹框 start-->
      <v-modalTip v-show="rewardShow">
         <div class="receive-eval" v-if="isClickShow=='false'">
           <p @click="download">立即前往</p>
         </div>
          <div class="receive-eval-2" v-if="isClickShow=='true'">
           <p @click="download">立即前往</p>
         </div>
         <p class="receive-close" @click="closeReward"></p>
      </v-modalTip>
      <!-- 每日领取弹框 end-->
    </div>
</template>
<script>
import util from "../../utils/tool.js";
import { openApp } from "../../commonScript/download.js";
import wxShare from "../../commonScript/wxShare.js";
import {
  getWinningList
} from "../../service/common/prizeDraw/service.js";
export default {
  data() {
    return {
      isClickShow:0,
      drawNum:1,
      activityCode:26,
      filterWinningList:[],
      actNewYearCode: "actNewYear2019",
      positionNum: 0, //每日领取弹框位置
      rewardShow: false, //是否展示抽奖结果
      cardsStatus: 0, //牌的状态 0：初始 1：洗牌中 2：洗牌完成 3：抽中 4:已抽取
      prizeType: "", //抽奖结果类型
      isShowBack: false,
      winningList:[],
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
  filters: {},
  components: {},
  mounted() {
    if(!localStorage.getItem('isClickShow')){
      this.drawNum = 1;
       this.isClickShow = 'false';
    }else{
      this.drawNum = 0;
      this.isClickShow='true';
    }
    
    this.getWinningList();
    wxShare.getShareInfo("", this.actNewYearCode);
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
      if(this.drawNum==0){
        this.rewardShow = true;
        this.isClickShow =  localStorage.getItem('isClickShow');
        return;
      }
      if (this.cardsStatus != 2) {
        return;
      }
      localStorage.setItem('isClickShow','true');
      
      this.cardsStatus = 4;
      var index; //
      this.prizeType = 1108; ///模拟抽奖结果
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
      this.$router.push({ path: "/rules" });
    },
    //关闭抽奖结果
    closeReward() {
      var that = this;
      this.rewardShow = false;
    
    },
    download() {
      openApp();
      // this.isClickShow =  localStorage.getItem('isClickShow');
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
  background-color: #921700;
  .px2px(font-size,28);
  color: #07073a;
  header {
    .bg-img("banner.png",750,670);
    margin: 0 auto;
    display: flex;
    align-items: flex-end;
    position: relative;
    div {
      font-weight:bold;
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
    .px2rem(padding-bottom,30);
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
         // border-bottom: 1px solid #db5d46;
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
      // .ul2{
      //   li:first-child{
      //     border-top: 1px solid #550000;
      //   }
      // }
    }
    .footer{
      .bg-img("logo.png", 112, 37);
      margin:0 auto;
      .px2rem(margin-top,32);

    }
  }
  //每日免费领
  .receive-eval {
    .bg-img("share-toast-bg.png", 442, 886);
    display: flex;
    align-items: flex-end;
    p {
      .bg-img("download-bg.png",350,70);
      .px2rem(line-height,70);
      text-align: center;
      .px2px(font-size,32);
      color: #f0ece2;
      margin: 0 auto;
      .px2rem(margin-bottom,146);
    }
  }
  .receive-eval-2{
     .bg-img("share-toast-bg2.png", 442, 886);
    display: flex;
    align-items: flex-end;
    p {
      .bg-img("download-bg.png",350,70);
      .px2rem(line-height,70);
      text-align: center;
      .px2px(font-size,32);
      color: #f0ece2;
      margin: 0 auto;
      .px2rem(margin-bottom,146);
    }
  }
  //关闭
  .receive-close {
    .bg-img-common("close.png",66,66);
    margin: 0 auto;
    .px2rem(margin-top,60);
  }
}
</style>
