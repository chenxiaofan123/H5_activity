<template>
    <div class="senventh-page" v-cloak>
      <!-- 进度 start -->
      <div class="loading"  v-if="isLoading">
         <p class="gif"></p>
         <p>爱情排队中…{{process}}%</p>
      </div>
      <!-- 进度 end -->
      
      <template v-else>
        <!-- 封面 start -->
      <div class="process-modal"  v-if="pageStatus===0">
        <div class="start">
          <div class="start-btn">
            <p @click="startTest($event)" id="startTest">开启测試</p>
            <p>黄金钱包与你过七夕</p>
          </div>
        </div>
      </div>
        <!-- 封面 end -->
        <!-- 答题部分 start -->
        <div class="content" v-if="pageStatus===1">
         <div>
           <p :class="questionBank[subject].imgClass"></p>
           <p class="question">{{questionBank[subject].question}}</p>
           <div class="answer">
             <p v-for="(item,index) in questionBank[subject].answerList" @click="check(index)" :key="index" :class="{'active':activeClass===index}">
               <span></span>
               <span><i></i>{{item.answer}}</span>
             </p>
           </div>
          </div>
          <p class="page">{{subject+1}}/5</p>
        </div>
        <!-- 答题部分 end --> 
        <!-- 答题结果部分 start -->
        <div class="result" v-if="pageStatus===2">
          <p class="logo" v-if="origin==0"></p>
          <div class="_bg_flex">
          <div class="_bg" :style="{'background-image':'url('+photoUrlResult+')'}">
           <!-- <p class="logo" v-if="origin==0"></p> -->
           <p class="title"  v-if="origin==1">你命中注定的另一半是</p>
           <p class="title title2"  v-if="origin==0">
             TA命中注定的另一半是
           </p>
           <div class="button-opt" v-if="origin==1">
             <div @click="testMore($event,1)" id="testMore"><span></span><span>再测一次</span></div>
             <div @click="share($event)" id="shareBtn"><span></span><span>告訴全世界</span></div>
           </div>
           <div class="button-result-opt" v-if="origin==0">
              <div @click="testMore($event,2)" id="meTest"><span></span><span>我也来测测</span></div>
           </div>
           
         </div>
          </div>
          
        </div>
        <div v-if="pageStatus===2"><p class="cat_right"></p></div>
        <!-- 答题结果部分 end -->
     </template>
     <!-- 选择男女弹框 start -->
     <div class="modal" v-show="showModal">
       <div class="checkSex">
         <p></p>
         <div>
           <p class="title-text">請選择你的性别</p>
           <p class="img-list">
             <span></span>
             <span></span>
           </p>
           <div class="btnList">
             <p :class="{'active':sexIndex===1}" @click="checkSex(1)"><span></span><span><i></i>我是男生</span></p>
             <p :class="{'active':sexIndex===2}" @click="checkSex(2)"><span></span><span><i></i>我是女生</span></p>
           </div>
         </div>
       </div>
     </div> 
     <!-- 选择男女弹框 end -->
     <!-- 分享弹框 start -->
     <div class="modal modal2" v-if="showShareModal" @click="showShareModal=false">
       <div class="modal-content">
         <!-- <p class="light"></p>
         <p class="xiaolian"></p> -->
         <p class="share-img"></p>
         <p class="text">点击右上角分享哦</p>
       </div>
     </div>
     <!-- 分享弹框 end -->
     <!-- 生成中 start -->
     <div class="generating-modal" v-if="isShowGenerate">
        <div class="generate">
          <i></i>
          <p><span></span><span>生成中<i>…</i></span></p>
        </div>
     </div>
     <!-- 生成中 end -->
    </div>
</template>
<script>
import { openApp } from "../../commonScript/download.js";
import getShareInfo from "../../commonScript/shareParam.js";
import wxShare from "../../commonScript/wxShare.js";
import {
  getQixiAnswerResult,
  getQixiAnswerRecord
} from "../../service/pages/anActivityAnswer/service.js";
export default {
  data() {
    return {
      isIphonex: "",
      isShare:'',
      count: 0,
      resultCount: 0,
      isShowGenerate: false,
      isLoading: true,
      subject: 0,
      process: 10,
      pageStatus: -1, //0 未开启 1 答题中 2 答题结果
      origin: 0, //1为答题结果页 0为分享结果页
      sexIndex: "",
      isWechat: "",
      requestNo: "",
      photoUrlResult: "",
      showModal: false,
      showShareModal: false,
      checkAnswer: [],
      activeClass: "",
      clearTime:"",
      questionBank: [
        {
          imgClass: "img-no1",
          checkIndex: "",
          question: "一覺醒来，发现自己在一张玉床上，你会覺得…",
          answerList: [
            {
              answerIndex: "A",
              answer: "A.穿越了"
            },
            {
              answerIndex: "B",
              answer: "B.床硬了"
            },
            {
              answerIndex: "C",
              answer: "C.升仙了"
            },
            {
              answerIndex: "D",
              answer: "D.有点餓"
            }
          ]
        },
        {
          imgClass: "img-no2",
          question: "你立刻爬起来走到一面鏡子前，你发现自己…",
          answerList: [
            {
              answerIndex: "A",
              answer: "A.美翻了"
            },
            {
              answerIndex: "B",
              answer: "B.丑哭了"
            },
            {
              answerIndex: "C",
              answer: "C.帅炸了"
            }
          ]
        },
        {
          imgClass: "img-no3",
          question: "突然門被打开了，走進来一个人，TA是…",
          answerList: [
            {
              answerIndex: "A",
              answer: "A.道骨仙風的男人"
            },
            {
              answerIndex: "B",
              answer: "B.丑陋的巫婆"
            },
            {
              answerIndex: "C",
              answer: "C.穿紅肚兜的小孩"
            },
            {
              answerIndex: "D",
              answer: "D.貌美如花的仙女"
            }
          ]
        },
        {
          imgClass: "img-no4",
          question: "TA告訴了你真实身份，你竟然是…",
          answerList: [
            {
              answerIndex: "A",
              answer: "A.女娲的后人"
            },
            {
              answerIndex: "B",
              answer: "B.到处漂泊的孤儿"
            },
            {
              answerIndex: "C",
              answer: "C.遺落民間的皇室子孙"
            }
          ]
        },
        {
          imgClass: "img-no5",
          question: "TA留給你了一样____，并轉身走出屋",
          answerList: [
            {
              answerIndex: "A",
              answer: "A.写满銘文的卷书"
            },
            {
              answerIndex: "B",
              answer: "B.披荊斩棘的宝剑"
            },
            {
              answerIndex: "C",
              answer: "C.盛满神奇藥水的魔瓶"
            }
          ]
        }
      ],
      gotoUrl: "",
      isApp: ""
    };
  },
  watch: {
    // count(){
    //   this.process = this.count/11*100;
    // },
    // process(){
    //   if(this.process==100){
    //     this.pageStatus = 0;
    //     this.isLoading = false;
    //   }
    // }
    resultCount() {
      if (this.resultCount == 2) {
        setTimeout(() => {
          this.isShowGenerate = false;
          this.showResult();
          this.resultCount = 0;
        }, 400);
      }
    }
  },
  mounted() {
    //获取参数
    this.getparam();
    //预加载图片
    this.preload();
    //分享
    if (this.isWechat) {
      wxShare.getShareInfo("", "senvenCode");
    }
    // if (document.readyState == "complete") {
    //   this.isLoading = false;
    // }

    if (this.isLoading) {
      this.handleProcess();
    }
  },
  methods: {
    preload() {
      var imgs = [
        require("./res/index_bg_iphonex.png"),
        require("./res/index_bg1.png"),
        require("./res/Boy.png"),
        require("./res/Girl.png"),
        require("./res/logo.png"),
        require("./res/Question_1.png"),
        require("./res/Question_2.png"),
        require("./res/Question_3.png"),
        require("./res/Question_4.png"),
        require("./res/Question_5.png")
      ];
      for (let i = 0; i < imgs.length; i++) {
        let image = new Image();
        image.src = imgs[i];
        image.onload = () => {
          this.count++;
        };
      }
      // for (let img of imgs) {
      //   let image = new Image();
      //   image.src = img;
      //   image.onload = () => {
      //     this.count++;
      //   };
      // }
    },
    getQixiAnswerResult() {
      let data = {
        fourthQuestion: this.checkAnswer[3],
        thirdQuestion: this.checkAnswer[2],
        sex: this.sexIndex
      };
      getQixiAnswerResult(data).then(res => {
        var resData = res.data;
        var imgs = [];
        this.isShowGenerate = true;
        if (+resData.code == 0) {
          this.requestNo = resData.data.requestNo;
          this.photoUrl = resData.data.photoUrl;
          this.iphoneXPhotoUrl = resData.data.iphoneXPhotoUrl;

          if (this.isIphonex) {
            this.photoUrlResult = this.iphoneXPhotoUrl;
          } else {
            this.photoUrlResult = this.photoUrl;
          }
          //图片预加载
          imgs.push(this.photoUrl);
          imgs.push(this.iphoneXPhotoUrl);
          // for (let img of imgs) {
          //   let image = new Image();
          //   image.src = img;
          //   image.onload = () => {
          //     this.resultCount++;
          //   };
          // }
          for (let i = 0; i < imgs.length; i++) {
            let image = new Image();
            image.src = imgs[i];
            image.onload = () => {
              this.resultCount++;
            };
          }
        } else {
          GB.utils.htoast(resData.msg);
        }
      });
      // wxShare.getShareInfo("", "senvenCode", { code: 0 });
    },
    showResult() {
      this.origin = 1;
      this.pageStatus = 2;
      if (this.isWechat) {
        wxShare.getShareInfo("", "senvenCode", {
          requestNo: this.requestNo
        });
      } else {
        getShareInfo(sharebasePath, "", "senvenCode", param => {
          this.param = param;
          if (this.param.url.indexOf("?") !== -1) {
            this.param.url = `${this.param.url}&requestNo=${this.requestNo}`;
          } else {
            this.param.url = `${this.param.url}?requestNo=${this.requestNo}`;
          }
        });
      }
    },
    getQixiAnswerRecord() {
      let data = {
        requestNo: this.requestNo
      };
      getQixiAnswerRecord(data).then(res => {
        var resData = res.data;
        if (+resData.code == 0) {
          this.photoUrl = resData.data.photoUrl;
          this.iphoneXPhotoUrl = resData.data.iphoneXPhotoUrl;

          if (this.isIphonex) {
            this.photoUrlResult = this.iphoneXPhotoUrl;
          } else {
            this.photoUrlResult = this.photoUrl;
          }
          this.pageStatus = 2;
          this.origin = 0;
        } else {
          GB.utils.htoast(resData.msg);
        }
      });
    },
    //获取各种参数
    getparam() {
      this.requestNo = GB.utils.GetRequest()["requestNo"] || "";
      this.isWechat = GB.utils.isWechat() || GB.utils.isQQ();
      this.isIphonex = GB.utils.isIphonex() || GB.utils.isSpeScreen();
      this.isShare = GB.utils.GetRequest()["isShare"] || "";
      if (this.requestNo) {
        this.isLoading = false;
        this.getQixiAnswerRecord();
      }
    },
    //再测一次
    testMore(e, index) {
      if (e) {
        this.$sa.quick("trackHeatMap", e.currentTarget);
      }
      if (index == 2) {
        this.isLoading = true;
        this.handleProcess();
      }
      this.sexIndex = "";
      this.activeClass = "";
      this.subject = 0;
      this.pageStatus = 0;
    },
    //开启测
    startTest(e) {
      if (e) {
        this.$sa.quick("trackHeatMap", e.currentTarget);
      }
      this.showModal = true;
    },
    //选择男女
    checkSex(index) {
      this.sexIndex = index;
      setTimeout(() => {
        this.pageStatus = 1;
        this.showModal = false;
      }, 400);
    },
    //进度动效
    handleProcess() {
      var that = this;
      var time = 200;
      var handleProcess = setInterval(fn, time);
      function fn() {
        if (that.process < 90) {
          that.process = that.process + 10;
        } else {
          that.process++;
        }

        if (that.process == 90) {
          clearInterval(handleProcess);
          time = 200;
          handleProcess = setInterval(fn, time);
        }
        if (that.process == 100) {
          clearInterval(handleProcess);
          that.pageStatus = 0;
          that.isLoading = false;
        }
      }
    },
    //选择答案
    check(index) {
      var that = this;
      
      this.activeClass = "";
      let i = index;
      let answerIndex = this.questionBank[this.subject].answerList[i]
        .answerIndex;
      this.checkAnswer[this.subject] = answerIndex;
      this.activeClass = index;
      clearTimeout(this.clearTime);
      if (this.subject === 4) {
        this.getQixiAnswerResult();
      } else {
        this.clearTime = setTimeout(fn, 600);
        // clearTime = setTimeout(() => {}, 600);
      }
      function fn() {
        that.subject++;
        that.activeClass = "";
      }
    },
    share(e) {
      if (e) {
        this.$sa.quick("trackHeatMap", e.currentTarget);
      }
      if(!!!this.isWechat && this.isShare){
         GB.utils.htoast("该环境可能无法分享，您可以截屏并分享给好友。");
         return;
      }
      if (this.isWechat) {
        this.showShareModal = true;
      } else {
        GB.utils.callCustomMethod("getShareParams", this.param);
      }
      
    }
  }
};
</script>
<style lang="less"  scoped>
@import "../../../statics/less/base/method.less";
@import "../../less/special.less";
.senventh-page {
  font-family: "SetoFont", "黑体";
  height: 100%;
  overflow-x: hidden;
  .cat-position {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    .px2rem(height,140);
    overflow-x: hidden;
  }
  .cat_right {
    .bg-img("cat-right-3.png",140,140);
    position: absolute;
    z-index: 200;
    bottom: 0;
    right:0;
    text-align: center;
  }
  // 媒体查询开始
  @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
    // html,
    // body {
    // //  height: 812px !important;
    // height:100vm !important;
    // }
    .start {
      .bg-img("index_bg_iphonex.png",750,1448) !important;
      .start-btn p:first-child {
        .px2rem(margin-bottom,140) !important;
      }
    }
    ._bg {
      .px2rem(height,1328) !important;
      .button-opt {
        .px2rem(padding-bottom,128) !important;
      }
      .button-result-opt {
        .px2rem(padding-bottom,128) !important;
      }
    
    }
      .cat_right {
        position: absolute !important;
        .px2rem(bottom,80) !important;
        .px2rem(right,0) !important;
      }
  }
  //iphone Xs Max
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
    // html,
    // body {
    //   height: 896px !important;
    // }
    .start {
      .bg-img("index_bg_iphonex.png",750,1448) !important;
      .start-btn p:first-child {
        .px2rem(margin-bottom,140) !important;
      }
    }
    ._bg {
      .px2rem(height,1328) !important;
      .button-opt {
        .px2rem(padding-bottom,128) !important;
      }
      .button-result-opt {
        .px2rem(padding-bottom,128) !important;
      }
      
    }
     .cat_right {
        position: absolute !important;
        .px2rem(bottom,80) !important;
        .px2rem(right,0) !important;
      }
  }
  //iphone XR
  @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
    // html,
    // body {
    //   height: 896px !important;
    // }
    .start {
      .bg-img("index_bg_iphonex.png",750,1448) !important;
      .start-btn p:first-child {
        .px2rem(margin-bottom,140) !important;
      }
    }
    ._bg {
      .px2rem(height,1328) !important;
      .button-opt {
        .px2rem(padding-bottom,128) !important;
      }
      .button-result-opt {
        .px2rem(padding-bottom,128) !important;
      }
   
    }
     .cat_right {
        position: absolute !important;
        .px2rem(bottom,80) !important;
        .px2rem(right,0) !important;
      }
  }
    @media screen and (max-device-aspect-ratio:90/185) {
    // html,
    // body {
    // //  height: 812px !important;
    // height:100vm !important;
    // }
    .start {
      .bg-img("index_bg_iphonex.png",750,1448) !important;
      .start-btn p:first-child {
        .px2rem(margin-bottom,140) !important;
      }
    }
    ._bg {
      .px2rem(height,1328) !important;
      .button-opt {
        .px2rem(padding-bottom,128) !important;
      }
      .button-result-opt {
        .px2rem(padding-bottom,128) !important;
      }
    
    }
      .cat_right {
        position: absolute !important;
        .px2rem(bottom,80) !important;
        .px2rem(right,0) !important;
      }
    
  }
  // 媒体查询结束
  .bg-img( @file , @width, @height ) {
    .px2rem(width, @width);
    .px2rem(height, @height);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url("./res/@{file}");
  }
  * {
    box-sizing: border-box;
  }
  .process-modal {
    display: flex;
    // align-items: center;
    min-height: 100%;
  }
  .loading {
    height: 100%;
    .px2rem(font-size,28);
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    .gif {
      .bg-img("catClaw.gif",240,169);
      .px2rem(margin-bottom,22);
    }
  }
  .start {
    .bg-img("index_bg1.png",750,1206);
    .px2rem(font-size,28);
    color: #9b9b9b;
    position: relative;
    .start-btn {
      position: absolute;
      .px2rem(bottom,40);
      left: 0;
      right: 0;
      text-align: center;
      font-family: "黑体";
      p:first-child {
        font-family: "SetoFont";
        background: #ffffff;
        border: 2px solid #000000;
        .px2rem(border-radius,12);
        .px2rem(width,350);
        .px2rem(height,90);
        .px2rem(line-height,90);
        margin: 0 auto;
        .px2rem(margin-bottom,60);
        .px2rem(font-size,40);
        color: #000000;
      }
    }
  }
  .content {
    .bg-img("point-content.png",750,14);
    margin: 0 auto;
    background-size: contain;
    height: auto;
    min-height: 100%;
    background-repeat: repeat-y;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .px2rem(padding,30);
    .px2rem(padding-left,20);
    .px2rem(padding-right,20);
    .content-part1 {
    }
    .img-no1 {
      .bg-img("Question_1.png",710,470);
    }
    .img-no2 {
      .bg-img("Question_2.png",710,470);
    }
    .img-no3 {
      .bg-img("Question_3.png",710,470);
    }
    .img-no4 {
      .bg-img("Question_4.png",710,470);
    }
    .img-no5 {
      .bg-img("Question_5.png",710,470);
    }
    .question {
      margin: 0 auto;
      .px2rem(margin-top,80);
      .px2px(font-size,50);
      .px2rem(width,610);
    }
    .answer {
      display: flex;
      flex-flow: row wrap;
      .px2rem(font-size,36);
      .px2rem(padding-left,20);
      .px2rem(padding-right,20);
      justify-content: center;
      .px2rem(margin-top,76);

      p {
        display: block;
        .px2rem(min-width,320);
        .px2rem(margin-top,30);

        > span:last-child {
          display: block;
          .px2rem(min-width,320);
          .px2rem(height,90);
          .px2rem(line-height,90);
          text-align: center;
          .px2rem(border-radius,12);
          border: 2px solid #000;
          .px2rem(padding-left,10);
          .px2rem(padding-right,10);
          background-color: #fff;
        }
        &:nth-child(odd) {
          .px2rem(margin-right,30);
        }
        &:last-child {
          margin-right: 0;
        }
        &.active {
          position: relative;
          span:first-child {
            width: 100%;
            .px2rem(height,90);
            .px2rem(line-height,90);
            text-align: center;
            .px2rem(border-radius,18);
            border: 2px solid #000;
            .px2rem(top,10);
            .px2rem(left,10);
            position: absolute;
            .px2rem(padding-left,10);
            background-color: #fff;
            .px2rem(padding-right,10);
          }
          span:last-child {
            background: #bafff0;
            position: relative;
            i {
              .bg-img("btn-light.png",190,50);
              position: absolute;
              top: 0;
              left: 0;
            }
          }
        }
      }
    }
    .page {
      width: 100%;
      text-align: right;
      .px2rem(padding-right,25);
      .px2rem(font-size,40);
      .px2rem(margin-top,100);
    }
  }
  .result {
    background: #fffef6;
    min-height: 100%;
    width: 100%;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    padding-top: 1px;
    overflow-x: hidden;
    position:relative;
       .logo {
        display: block;
        .bg-img("logo.png",228,104);
        position: absolute;
        .px2rem(top,10);
        left:0;
        z-index:3000;
      }
    ._bg_flex{
       display: flex;
    justify-content: center;
    align-items: center;
    position:absolute;
    min-height:100%;
    top:0;
    left:0;
    right:0;
    left:0;
    }
    ._bg {
      .px2rem(width,690);
      .px2rem(height,1146);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      position: relative;
      // overflow-x: hidden;
      .logo {
        display: block;
        .bg-img("logo.png",228,104);
        position: absolute;
        .px2rem(top,-30);
        .px2rem(left,-30);
      }
      .title {
        .px2rem(font-size,40);
        text-align: center;
        .px2rem(margin-top,30);
      }
      .title2 {
        .px2rem(padding-right,40);
        position: relative;
        text-align: right;
        span {
          display: block;
          .bg-img("logo.png",228,104);
          position: absolute;
          .px2rem(top,-60);
          .px2rem(left,-30);
        }
      }
      .button-opt {
        width: 100%;
        .px2rem(padding-left,40);
        .px2rem(padding-right,40);
        .px2rem(padding-bottom,60);
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        .px2rem(font-size,36);
        > div {
          .px2rem(width,280);
          position: relative;
          span:first-child {
            width: 100%;
            .px2rem(height,90);
            .px2rem(line-height,90);
            text-align: center;
            .px2rem(border-radius,18);
            border: 2px solid #000;
            .px2rem(top,10);
            .px2rem(left,10);
            position: absolute;
            .px2rem(padding-left,10);
            .px2rem(padding-right,10);
          }
          span:last-child {
            position: relative;
            display: block;
            width: 100%;
            .px2rem(height,90);
            .px2rem(line-height,90);
            text-align: center;
            .px2rem(border-radius,12);
            border: 2px solid #000;
          }
          &:first-child {
            span:first-child {
              background-color: #bafff0;
            }
            span:last-child {
              background-color: #fff;
            }
          }
          &:last-child {
            span:first-child {
              background-color: #fff;
            }
            span:last-child {
              background-color: #fcf2b6;
            }
          }
        }
      }
      .button-result-opt {
        .px2rem(padding-left,40);
        .px2rem(padding-right,40);
        .px2rem(padding-bottom,60);
        .px2rem(font-size,36);
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        > div {
          .px2rem(width,380);
          position: relative;
          span:first-child {
            width: 100%;
            .px2rem(height,90);
            .px2rem(line-height,90);
            text-align: center;
            .px2rem(border-radius,18);
            border: 2px solid #000;
            .px2rem(top,10);
            .px2rem(left,10);
            position: absolute;
            .px2rem(padding-left,10);
            .px2rem(padding-right,10);
          }
          span:last-child {
            position: relative;
            display: block;
            width: 100%;
            .px2rem(height,90);
            .px2rem(line-height,90);
            text-align: center;
            .px2rem(border-radius,12);
            border: 2px solid #000;
          }
          &:first-child {
            span:first-child {
              background-color: #bafff0;
            }
            span:last-child {
              background-color: #fff;
            }
          }
        }
      }
      .cat-position {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        .px2rem(height,140);
        background-color: #0056a0;
      }
      .cat_right {
        .bg-img("cat-right.png",156,140);
        // position: absolute;
        z-index: 200;
        bottom: 0;
        .px2rem(right,-20);
        text-align: center;
      }
    }
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 800;
    .checkSex {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .px2rem(width,690);
      .px2rem(height,666);
      position: fixed;
      > p {
        background: #fcf2b6;
        border: 2px solid #000000;
        .px2rem(border-radius,40);
        .px2rem(width,670);
        .px2rem(height,646);
        position: absolute;
        .px2rem(left,20);
        .px2rem(top,20);
      }
      > div {
        position: relative;
        text-align: center;
        .px2rem(width,670);
        .px2rem(height,646);
        background: #ffffff;
        border: 2px solid #000000;
        .px2rem(border-radius,20);
        .px2rem(padding-top,80);
        .title-text {
          .px2rem(font-size,70);
        }
        .img-list {
          display: flex;
          justify-content: center;
          .px2rem(margin-top,50);
          span {
            display: block;
          }
          span:first-child {
            .bg-img("Boy.png",280,246);
          }
          span:last-child {
            .bg-img("Girl.png",280,246);
            .px2rem(margin-left,30);
          }
        }
        .btnList {
          display: flex;
          justify-content: center;
          .px2rem(margin-top,30);
          .px2rem(font-size,36);
          > p {
            span {
              display: block;
            }
            &:last-child {
              .px2rem(margin-left,30);
            }
            span:last-child {
              .px2rem(width,280);
              .px2rem(height,90);
              .px2rem(line-height,90);
              text-align: center;
              background: #ffffff;
              border: 2px solid #000000;
              .px2rem(border-radius,12);
            }
          }
          .active {
            position: relative;
            span:first-child {
              width: 100%;
              .px2rem(height,90);
              .px2rem(line-height,90);
              text-align: center;
              .px2rem(border-radius,18);
              border: 2px solid #000;
              .px2rem(top,10);
              .px2rem(left,10);
              position: absolute;
              .px2rem(padding-left,10);
              .px2rem(padding-right,10);
            }
            span:last-child {
              background: #bafff0;
              position: relative;
              i {
                .bg-img("btn-light.png",190,50);
                position: absolute;
                top: 0;
                left: 0;
              }
            }
          }
        }
      }
    }
  }
  @keyframes dot {
    0% {
      width: 0;
      .px2rem( margin-right,60);
    }
    33% {
      .px2rem(width,20);
      .px2rem( margin-right,40);
    }
    66% {
      .px2rem(width,40);
      .px2rem( margin-right,20);
    }
    100% {
      .px2rem(width,60);
      margin-right: 0;
    }
  }
  .ani_dot {
  }
  .generating-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    .generate {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: fixed;
      display: flex;
      justify-content: center;
      .px2px(font-size,50);
      > i {
        .bg-img("cat-left.png",180,162);
        position: relative;
        z-index: 200;
      }
      p {
        position: relative;
        .px2rem(width,440);
        .px2rem(margin-left,-80);
        .px2rem(margin-top,16);
        span {
          display: block;
          width: 100%;
          .px2rem(height,130);
          .px2rem(line-height,130);
          border: 2px solid #000;
          .px2rem(border-radius,20);
          text-align: center;
        }
        span:first-child {
          .px2rem(top,10);
          .px2rem(left,10);
          position: absolute;
          .px2rem(padding-left,10);
          .px2rem(padding-right,10);
          .px2rem(border-radius,28);
          background: #fcf2b6;
        }
        span:last-child {
          background: #fff;
          position: relative;
           
          i {
            display: inline-block;
            .px2rem(width,60);
            vertical-align: bottom;
            overflow: hidden;
            animation: dot 1s infinite step-start;
            text-align: left;
          }
        }
      }
    }
  }
  .modal2 {
    .modal-content {
      position: fixed;
      right: 0;
      top: 0;
      left: 0;
      bottom: 0;
      z-index: 800;
    }
    // .light {
    //   .bg-img("light.png",295,454);
    //   position: absolute;
    //   right: 0;
    //   top: 0;
    // }
    // .xiaolian {
    //   .bg-img("xiaolian.png",198,198);
    //   margin: 0 auto;
    //   .px2rem(margin-top,464);
    //   animation: transfer 1.5s linear infinite;
    // }
    .share-img {
      .bg-img("share-img.png",482,652);
      position: absolute;
      right: 0;
      top: 0;
    }
    .text {
      text-align: center;
      .px2rem(margin-top,682);
      color: #ffffff;
      .px2px(font-size,50);
    }
  }
}
</style>
