<template>
    <div class="index-page" v-cloak>
      <!-- 答题部分 -->
      <div class="questionPart" v-if="questionStatus==1&&conductQuestion">
         <div >
          <div class="top" >
              <div class="leftButton" > {{conductQuestion[0].quNumber}} / 3</div>
              <!-- 倒计时组件 -->
              <div v-if="!singleStatus">
                  <countDown   :startseconds="answerTime" :alltime='20'  ref="countdown" @getsconds="getSeconds"></countDown>
              </div>
              <div class="longTime" v-if='singleStatus'>超时啦!</div>
          </div>
          <div class="question" v-for="(item,index) in conductQuestion" :key='index'>
            <p  class="container_p2">{{item.question}}</p>
              <!-- 超时样式 -->
              <ul class="list-group" v-if='singleStatus'>
                <li class="list-group-item" v-for="(list,listIndex) in item.answer" :class="list.value==item.rightKey?'list-group-Check':'list-group-wrong' " :key="listIndex">
                  <template>
                        <div class="group">{{list.text}}</div>
                 </template>
              </li>
            </ul>
            <!-- 未超时样式 -->
            <ul class="list-group" v-if='!singleStatus'>
                <li class="list-group-item" v-if='!checkAnswer'   v-for="(list,listIndex) in item.answer"  :key="listIndex">
                    <div class="group" @click="getChoose(item,list.value,listIndex)">{{list.text}}</div>
               </li>
                <li class="list-group-item"  v-if='checkAnswer'  v-for="(list,listIndex) in item.answer"  :class="checkClass?{'list-group-Check':checkIndex==listIndex}:{'list-group-wrong':checkIndex==listIndex, 'list-group-Check':rightIndex==listIndex}"  :key="listIndex">
                    <div class="group">{{list.text}}</div>
               </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 答题结束 -->
      <div class="questionEnd" v-if="questionStatus==2">
        <div  class="header">
            <div class="headerBg"></div>
        </div>
        <div class="questionContent">
            <div class="contentTop clearfix">
                  <div class="contentPart">
                      <div>{{rightQuestionNum}}</div>
                      <div>答对题数</div>
                  </div>
                  <div class="contentPart" v-if='recordingTime'>
                      <div>{{answerTime*3-(recordingTime.firstQuestion+recordingTime.secondQuestion+recordingTime.thirdQuesyion)}}s</div>
                      <div>答题时长</div>
                  </div>
            </div>
            <!-- 老用户有奖励 -->
            <div class="contentText">
                <div class="text" v-if="rightQuestionNum>=2">
                  <p>来APP答更多题目</p>
                  <p>你有98%可能性获得奖励</p>
                </div>
                 <div class="text"  v-if="rightQuestionNum==1">
                    <p>来APP答更多题目</p>
                    <p>你有78%可能性获得奖励</p>
                </div>
                 <div class="text"  v-if="rightQuestionNum==0">
                    <p>没有答对题目哦</p>
                    <p>来APP答更多题目拿以下大礼</p>
                </div>
                <div class="iconAll">
                  <div class="icon">
                        <img src="./res/icon3.png" />
                        <div>3000元红包</div>
                   </div>
                   <div class="icon">
                        <img src="./res/icon2.png" />
                        <div>5%加息券</div>
                   </div>
                   <div class="icon">
                        <img src="./res/p30.png" />
                        <div>华为P30</div>
                   </div>
                   
                </div>
                <div class="checkGift" id="gift" @click="getGift($event)">
                    去拿奖励
                </div>
                <div class='newUser' id="880" @click="goNewUser($event)">
                    新用户还有880元大礼可领取
                </div> 
            </div>
        </div>
      </div>
      <!-- 超时弹窗 -->
      <!-- <overtime-modal :show.sync="isLastQuestion" @submitPapers="submitPapers"></overtime-modal> -->
    </div>
</template>
<script>
import User from "../../service/common/User";
import countDown from "../../components/countDown/countDown.vue";
import {shareCode } from "../../service/pages/anActivityAnswer/service.js";
import wxShare from "../../commonScript/wxShare.js";
import overtimeModal from "./components/overtimeModal";
import { openApp } from "../../commonScript/download.js";

export default {
  data() {
    return {
      user: new User(),
      questionStatus:1, //答题状态
      answerTime:20,//答题时间
      stopTime:null,// 停止时间
      singleStatus:false,//单题是否超时
      checkIndex:-1,//选中index
      rightIndex:null,//选对时答案索引
      checkAnswer:null,  //选中答案
      checkClass:null,
      rightQuestionNum:0,//答对题数
      recordingTime:{
        firstQuestion:null,
        secondQuestion:null,
        thirdQuesyion:null,
      }, //每道题时间
      conductQuestion:null,
      questionsArry: [
        { question: "老板在群里分享一个创意，最有可能的情况是？", 
          quNumber:1,
          rightKey:'A',
          answer:[
            {text:"A.刚看完一篇文章", value:"A"},
            {text:"B.深思熟虑很久 ", value:"B"},
            {text:"C.突然想到的", value:"C"},
            {text:"D.觉得员工工作不饱和", value:"D"}
          ],
        },
         { question: "以下哪种职业最忙？ ", 
           quNumber:2,
           rightKey:'B',
           answer:[
            {text:"A.织方便面", value:"A"},
            {text:"B.黄金钱包员工", value:"B"},
            {text:"C.给鱼贴鳞片", value:"C"},
            {text:"D.给火龙果塞芝麻", value:"D"}
          ],
        },
         { question: "小明想买黄金进行理财，最有可能的情况是？", 
           quNumber:3,
           rightKey:'A',
           answer:[
              {text:"A.其余选项都是", value:"A"},
              {text:"B.股市赔了", value:"B"},
              {text:"C.基金赔了", value:"C"},
              {text:"D.现金贬值", value:"D"}
            ],
        },
      ],
      userCode: "",
      channelCode:""

    }
  },
   watch:{
       
    },
  filters: {
   
  },
  components: {
    overtimeModal,
    countDown
  },
  methods: {
    
    getChoose(data,checkedValue,checkIndex){
      let that  = this;
       that.$refs.countdown.pause() // 方法1
       if(data.quNumber==1){ //存储当前时间
          that.recordingTime.firstQuestion = that.stopTime;
       }else if(data.quNumber==2){
         that.recordingTime.secondQuestion = that.stopTime;
       }else if(data.quNumber==3){
         that.recordingTime.thirdQuesyion = that.stopTime;
       }
       if(that.stopTime<=0){ //是否超时
         that.singleStatus=true;
       }else{ //单题未超时
          that.checkAnswer = checkedValue;
          that.checkIndex  = checkIndex;
          for( var i=0;i<=data.answer.length-1;i++){
              if(data.rightKey == data.answer[i].value){
                   that.rightIndex = i;
              }
            }
          if( that.checkAnswer==data.rightKey){ //答对
            that.rightQuestionNum =  that.rightQuestionNum+1;
             that.checkClass  = true;
          }else{  //答错
            that.checkClass=false;
          }
          that.nextQuestion();
       }
       
    },
    //下一题
    nextQuestion(){
       let that = this;
         if(that.conductQuestion[0].quNumber==3){ //是否最后一题
              setTimeout(() => {//500ms 显示提交试卷
                     that.questionStatus = 2;
              }, 1500);
         }else{
           that.singleStatus = false;
            setTimeout(() => {
                that.checkIndex=null;//选中index
                that.rightIndex=null;//选错时答案索引
                that.checkAnswer = null;
                let nextNumber=  that.conductQuestion[0].quNumber
                that.$nextTick(function(){
                  that.conductQuestion =  [this.questionsArry[nextNumber]]
                  that.$refs.countdown.initctd() // 方法1
                })
               
            }, 1500);
         }
    },
    getSeconds(data){
      let that  = this;
       that.stopTime= data; 
       if(data<=0){ //单题已经超时
         that.singleStatus = true;
          setTimeout(() => {//500ms 显示提交试卷
                    that.nextQuestion();
          }, 1500);
         
       }
    },
    getGift(e){ //去拿奖励
      if(e){
        this.$sa.quick('trackHeatMap', e.currentTarget) 
      }
      openApp();
    },
    goNewUser(e){ //领奖励
      if(e){
        this.$sa.quick('trackHeatMap', e.currentTarget) 
      }
      
      window.location.href = basePath + '/html/pages/noviceBagLandingPage/?userCode='+this.userCode+'&channelCode='+this.channelCode;
    },
  },
  mounted() {
    var request = GB.utils.GetRequest();
    var userCode = request["userCode"] || "";
    var channelCode = request["channelCode"] || "";
    this.userCode = userCode;
    this.channelCode = channelCode;
    this.conductQuestion = [this.questionsArry[0]];
    this.$nextTick(function(){
        this.$refs.countdown.initctd()
    })
    wxShare.getShareInfo(this.userCode, shareCode);
    
  },
  beforeMount() {}
};
</script>
<style lang="less"  scoped>
@import "../../../statics/less/base/method.less";
@font-face {
  font-family: "DIN-Bold";
  src: url("../../assets/DIN-Bold.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
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
  background:  #00319A  url(./res/kuang.png) repeat ;
  background-size:15px 15px;
  font-family: PingFangSC-Medium;
  color: #fff;
   height: 100%;
  .px2px(padding-top,20);
  .px2rem(font-size,32);
  .questionPart{
     background:  url(./res/answerBg.png) no-repeat ;
     height: 100%;
     background-size:100% 100%;
     .px2px(padding-left,50);
     .px2px(padding-right,50);
     .top{
        .px2px(padding-top,20);
       .leftButton{
         position: fixed;
         left: 0;
         .px2px(top,70);
          background: #0074EA;
         .px2px(width,180);
         .px2px(height,70);
         .px2px(line-height,66);
         text-align: center;
         border: 2px solid #391543;
         border-radius: 0px 35px 35px 0px;
       }
       .countSecond{
        .px2px(width,120);
        .px2px(height,120);
         background: #fff;
         border-radius: 50%;
         margin:0 auto;
         .px2px(margin-bottom,44);
         .px2px(margin-top,30);
       }
       .longTime{
         .px2px(width,170);
         
          .px2px(height,170);
          .px2px(line-height,170);
          font-weight: bold;
          margin: 0 auto;
          
          .px2rem(font-size,28);
           .px2px(margin-bottom,24);
          text-align: center;
          background: url(./res/longTime.png) no-repeat;
          background-size:100% 100%;
          letter-spacing: 2px;
          color: #fff;
          
       }
     }
     .question{
       font-family: PingFangSC-Medium;
       font-weight: bold;
       letter-spacing: 0.89px;
       .list-group{
         text-align: center;
            .list-group-item{
               .px2px(width,550);
               .px2px(height,90);
               .px2px(line-height,90);
                background: #fff;
                color: #391543;
                margin:0 auto;
               .px2px(margin-top,36);
               .px2px(border-radius,8px);
            }
            .list-group-blue{
               .px2px(width,550);
               .px2px(height,90);
               .px2px(line-height,90);
                background: #A8DDFF;
                color: #391543;;
               .px2px(margin-top,36);
               .px2px(border-radius,8px);
            }

            .list-group-Check{
               .px2px(width,550);
               .px2px(height,90);
               .px2px(line-height,90);
               background: #0CC75B;
                color: #fff;
               .px2px(margin-top,36);
               .px2px(border-radius,8px);
            }
            .list-group-wrong{
               .px2px(width,550);
               .px2px(height,90);
               .px2px(line-height,90);
                background: #FE4343;
                color: #fff;
               .px2px(margin-top,36);
               .px2px(border-radius,8px);
            }

       }
      
     }
   
  }
  .questionEnd{
     background:  url(./res/endBg.png) no-repeat ;
     height: 100%;
     background-size:100% 100%;
    .px2px(padding-left,45);
    .px2px(padding-right,45);
    .px2px(padding-top,153);
     .header{
       .headerBg{
         margin: 0 auto;
         .px2px(width,358);
         .px2px(height,94);
         .px2px(margin-bottom,40);
         background: url(./res/endHeader.png) no-repeat;
         background-size: 100% 100%;

       }
       .headerText{
         text-align: center;
         .px2px(letter-spacing,2.25);
         text-align: center;
         color: #fff;
        .px2px(margin-top,14);
        .px2px(margin-bottom,40);
         font-weight: bold;
       }

     }
     .questionContent{
       background: #fff;
        .px2px(border-radius,8);
        box-sizing: border-box;
        border: 2px solid #391543;
        .contentTop{
          .contentPart{
            div{
              &:nth-child(1){
                 .px2px(margin-top,25);
                 .px2px(margin-bottom,6);
              }
            }
            font-weight: bold;
            text-align: center;
            color: #fff;
            float: left;
           width: 50%;
           .px2px(height,150);
           box-sizing:border-box;
           background: #0688ED;
          //  border-radius: 2px;
           border: 2px solid #391543;
           border-top:none;
           &:nth-child(1){
             border-left: none;
           }
           &:nth-child(2){
             border-right: none
           }

          }

        }
        .contentText{
          .text{
            // .px2px(width,383);
             color: #391543;
            font-weight: bold;
            letter-spacing: 1px;
            text-align: center;
             margin:0 auto;
            .px2px(margin-top,40);
            .px2px(margin-bottom,40);
          }
          .iconAll{
            // .px2px(padding-left,64);
            // .px2px(padding-right,64);
            display: flex;
            // flex-direction: row;
            justify-content:center;
            .icon{
              &:nth-child(2){
                .px2px(margin-left,40); 
                .px2px(margin-right,40);
              }
              color: #391543;
              text-align: center;
              img{
                .px2px(width,120);
                .px2px(height,120);
                display: block;
                margin: 0 auto;
              }
              div{
                font-weight: bold;
                .px2px(margin-top,4);

              }
            }
          }
          .checkGift{
            text-align: center;
            color: #fff;
            font-weight: bold;
            .px2rem(font-size,34);
            .px2px(width,350);
            .px2px(height,90);
            .px2px(line-height,90);
             background: url(./res/buttonBig.png) no-repeat;
             background-size: 100% 100%;
             box-shadow: 4px 4px 0 0 #FEC5BC;
             margin: 0 auto;
            .px2px(margin-top,41);
            .px2px(margin-bottom,30);
             .px2px(border-radius,50);
          }
          .newUser{
            text-align:center;
            .px2rem(font-size,28);
            .px2px(margin-top,30);
             font-weight:bold;
             color: #F03012;
            .px2px(margin-bottom,58);
             text-decoration: underline;
          }
         
        }

        .noGift{
          .noGiftText{
            color: #391543;
            letter-spacing: 1px;
            text-align: center;
            .px2px(margin-top,140);
            .px2px(margin-bottom,140);
            font-weight: bold;
          }
          .noGiftButton{
            .px2px(width,350);
            .px2px(height,90);
            .px2px(line-height,90);
            .px2px(border-radius,50);
              font-weight: bold;
             text-align: center;
              background: #F03012;
              background: url(./res/buttonBig.png) no-repeat;
              background-size: 100% 100%;
              margin:0 auto;
              .px2px(margin-bottom,68);
              box-shadow: 4px 4px 0 0 #FEC5BC;
          }


        }
        .newUser{
          .newUserText{
            color: #391543;
            letter-spacing: 1px;
            text-align: center;
            .px2px(margin-top,40);
            .px2px(margin-bottom,22);
             font-weight: bold;
          }
          .userImg{
            img{
              .px2px(width,133);
              .px2px(height,144);
              display: block;
              margin: 0 auto;
              
            }
            p{
              color: #391543;
              letter-spacing: 1px;
              text-align: center;
              font-weight: bold;
              .px2px(margin-top,10);
             .px2px(margin-bottom,46);
            }
            
          }
          .newUserButton{
            .px2px(width,350);
            .px2px(height,90);
            .px2px(line-height,90);
            .px2px(border-radius,50);
              font-weight: bold;
             text-align: center;
              background: #F03012;
              background: url(./res/buttonBig.png) no-repeat;
              background-size: 100% 100%;
              margin:0 auto;
              .px2px(margin-bottom,68);
              box-shadow: 4px 4px 0 0 #FEC5BC;
          }

        }
     }
  }
  


 
}
/* iphone5 */
@media screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2){
 .index-page .questionPart .bottom .gift .blockList .blueLsit{
   .px2px(width,76);
  .px2px(height,40);
 }
  .index-page .questionPart .bottom .gift .blockList .greenLsit{
   .px2px(width,76);
  .px2px(height,40);
 }
 .index-page .questionEnd{
   padding-top:50px;
 }
 .index-page .questionEnd .questionContent .contentText .checkGift{
   margin-top:10px;
   margin-bottom:10px;
 }
 .index-page .questionEnd .questionContent .contentText .newUser{
   margin-bottom:20px;
 }

}


@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
   .index-page {
     height:105% !important;
  }
}
//iphone Xs Max
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
 .index-page {
     height:105% !important;
  }
}
//iphone XR
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
 .index-page {
     height:105% !important;
  }
}
</style>
