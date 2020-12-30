<template>
    <div class="index-page" v-cloak>
      <!-- 答题部分 -->
      <div class="questionPart" v-if="questionStatus==1&&questionsList">
          <div class="top">
              <div class="leftButton" v-if='questionsList[0].curQuestionNum'>{{questionsList[0].curQuestionNum}} / {{totalNum}}</div>
              <!-- 倒计时组件 -->
              <div v-if="!singleStatus">
                  <countDown   :startseconds="answerTime"  :alltime="totalAnswerTime" ref="countdown"  @getsconds="getSeconds"></countDown>
              </div>
              <div class="longTime" v-if='singleStatus'>超时啦!</div>
          </div>
          <div class="question" v-for="(item,index) in questionsList" :key='index' >
            <p  class="container_p2">{{item.questionDesc}}</p>
             <!-- 超时样式 -->
            <ul class="list-group" v-if='singleStatus' >
                <li class="list-group-item"  v-for="(list , index) in item.questionOptionList"  :key="index" :class="list.optionCode==rightAnswer?'list-group-Check':'list-group-wrong'" >
                    <div class="group">{{list.optionDesc}}</div>
                </li>
            </ul>
             <!-- 正常答题样式 -->
            <ul class="list-group" v-if='!singleStatus' >
                <li v-cloak class="list-group-item"  v-if="!userSelect" v-for="(value,listIndex) in item.questionOptionList"  :key="listIndex" :class="{'list-group-blue':checkIndex==listIndex}">
                    <div class="group" @click="getChoose(value.optionCode,listIndex)">{{value.optionDesc}}</div>
                </li>
                <li v-cloak  class="list-group-item clickTrue" v-if="!isRight&&userSelect|| isRight===1&&userSelect"  v-for="(value,listIndex) in item.questionOptionList"  :key="listIndex" :class="isRight==1?{'list-group-Check':checkIndex==listIndex}:{'list-group-wrong':checkIndex==listIndex, 'list-group-Check':rightIndex==listIndex}">
                    <div class="group">{{value.optionDesc}} </div>
                </li>
            </ul>

          </div>
          <div class="bottom">
            <div class="gift clearfix">
              <div class="imgList">
                <div class="gitImg">
                   <img v-if='totalRightNum>=1' src="./res/lgift.png" />
                   <img  v-else src="./res/gift.png" />
                  </div>
                  <div class="gitImg">
                    <img v-if="totalRightNum>=4" src="./res/lgift.png" />
                    <img v-else src="./res/gift.png" />
                  </div>
                  <div class="gitImg imgBig">
                    <img v-if="totalRightNum==7" src="./res/lhb.png" />
                     <img v-else src="./res/hb.png" />
                  </div>
               </div>
               <div class="blockList clearfix">
                   <div class="left"  v-for="(item,index) in giftBlockLsit " :key="index">
                      <div class="blueLsit" :class="{'greenLsit': index+1<=totalRightNum}"></div>
                  </div>
               </div>
             
            </div>
          </div>
       
      </div>
      <!-- 答题结束 -->
      <div class="questionEnd" v-if="questionStatus==2">
        <div  class="header" v-if='giftList'>
            <div class="headerBg"></div>
            <!-- 0题 -->
            <div class="headerText" v-if='number==1'>别人高考缺实力，你缺运气～</div>
            <!-- 1-4题 -->
            <div class="headerText" v-if="number==2">中等生，都会成为中流砥石</div>
            <!-- 5-7题 -->
            <div class="headerText"  v-if="number==3" >考的全都会，蒙的全都对</div> 
        </div>
        <div class="questionContent"  v-if='giftList'>
            <div class="contentTop clearfix">
                  <div class="contentPart">
                      <div>{{giftList.totalRightNum}}</div>
                      <div>答对题数</div>
                  </div>
                  <div class="contentPart">
                      <div>{{giftList.consumptionTime}}s</div>
                      <div>答题时长</div>
                  </div>
            </div>
            <div class="contentText" v-if='giftList.rewardList.length!=0'>
                <div class="text">恭喜你在本场答题中获得</div>
                <div class="iconAll" >
                   <div class="icon"  :class="giftList.rewardList.length==2?{'iconRight':index==1}:{'iconLR':index==1}"  v-for='(list,index) in  giftList.rewardList' :key='index' >
                        <img v-if='list.rewardType==1' src="./res/icon1.png" />
                        <img v-else-if='list.rewardType==2' src="./res/icon2.png" />
                        <img v-else-if='list.rewardType==3' src="./res/icon3.png" />
                        <div>{{list.rewardDesc}}</div>
                   </div>
                </div>
                <div class="checkGift" @click="checkGift">
                    查看奖励
                </div>
            </div>
             <div class="noGift" v-if='giftList.rewardList.length==0'>
                <div class="noGiftText">
                  遗漏超多大奖～
                </div>
                 <div class="noGiftButton" v-if='giftList.remainTimes==0' >
                    <span id="goShare" @click='goToShare($event)'>邀请好友赢机会</span>
                </div>
                 <div class="noGiftButton" v-if='giftList.remainTimes!=0'>
                  <span id="trayAgain" @click="tryAgain($event)">再来一局</span>
                </div>
            </div>
        </div>
      </div>
      <!-- 试卷超时弹窗 -->
      <overtime-modal :show.sync="isOverTime" @submitPapers="submitPapers"></overtime-modal>
      <!-- 分享彈框 -->
      <share-modal :show.sync="isShare"></share-modal>
    </div>
</template>
<script>
import User from "../../service/common/User";
import overtimeModal from "./components/overtimeModal";
import shareModal from "./components/shareModal";
import countDown from "../../components/countDown/countDown.vue";
import { actCode,shareCode,nextQuestion,checkAnswer,submitPaperLast,startTest } from "../../service/pages/anActivityAnswer/service.js";
//定义默认的分享参数
var params = new Object();
params['methodName'] = 'getShareParams';
params['type'] = 1;
params['code'] = '';
params['needLogin'] = '0';
params['platform'] = '0';
params['pushShareMark'] = '';
export default {
  data() {
    return {
      user: new User(),
      // sessionId:'f8087de0c6b64436addff6f95353bedb',
      // telephone:'18244684886',
      sessionId:'',
      telephone:'',
      questionStatus:1, //答题状态
      singleStatus:false,//单题是否超时
      remainingSecond:null, //答题剩余秒数
      giftBlockLsit:[ //累计多少题
        1,2,3,4,5,6,7
      ],
      number:0,
      paperCode:'',//试卷code
      questionId:'',//题目id
      answerTime:20,//答题倒计时
      totalAnswerTime:20,//单题总答题时间
      totalNum:null,//总题数
      totalRightNum:0,//已答对题数
      userSelect:null,//用户选项
      isRight:-1,//答题是否正确
      rightAnswer:null,//正确答案
      checkIndex:null,//当前选择索引
      rightIndex:null,//正确答案的索引     
      questionsList: [
          {
            curQuestionNum:null
          }
        ],
      
      isShare:false,//是否分享
      isOverTime:false,//试卷整体超时
      giftList:null,
      hasGift:true,//是否有奖励
      isLastQuestion:false,//是否最后一题
    }
  },
   watch:{
       
    },
  filters: {
   
  },
  components: {
    shareModal,
    overtimeModal,
    countDown
  },
   mounted() {
      let that = this;
      that.paperCode = GB.utils.GetRequest()["paperCode"]||'';
      that.questionId = GB.utils.GetRequest()["questionId"] || "";
      sessionProObj.getUserInfo((telephone, sessionId) => {
          that.telephone = telephone;
          that.sessionId = sessionId;
          console.log(this.telephone +"手机号")
          console.log(this.sessionId +"用户id")
          that.getShareInfo(sharebasePath, telephone, shareCode);
          that.getNextQuestion(); //请求下一题
      });
    //  that.tryAgain();
     
  },
  methods: {
      getShareInfo(path, tel, code) {
        var that = this;
        $.getJSON(
          path + "info/getShareInfoJsonp?jsoncallback=?",
          {
            telephone: tel,
            code: code,
            pageUrl: encodeURIComponent(location.href.split("#")[0].toString())
          },
          function(_data) {
            var lineLink = location.href;
            if (_data.wxurl) {
              lineLink = _data.wxurl;
            }
            that.url = lineLink;
            params["title"] = _data.title;
            params["imageUrl"] = _data.imageUrl;
            params["description"] = _data.description;
            params["url"] = lineLink;
          }
        );
     },
      getSeconds(data){ //获得剩余秒数
         this.remainingSecond = data;
         if(data<=0){
           this.checkAnswer();
         }
      },
      getChoose(chooseAnswer,checkIndex){ 
         this.userSelect = chooseAnswer;// 用户选择答案
         this.$refs.countdown.pause() // 方法1
         this.checkAnswer(checkIndex);//请求答案
      },
    //请求答案
    checkAnswer(checkIndex){
        let that = this;
        let isTimeoutStatus = null;
        if(this.remainingSecond<=0){
          isTimeoutStatus  = 2//超时
        }else{
          isTimeoutStatus  = 1 //未超时
        }
        let param = {
          actCode:actCode, //活动编码
          isTimeOut:isTimeoutStatus,//1-未超时，2-超时
          paperCode:that.paperCode, //试卷code
          questionId:that.questionId,//题目id
          sessionId: that.sessionId,
          telephone:that.telephone,
          userSelect:that.userSelect,
       };
        checkAnswer(param).then(res => {
          if(res.data.code=="0000"){
              let resdata = res.data.data; 
                that.rightAnswer  = resdata.rightAnswer;// 正确答案
                that.questionId  = resdata.nextQuestionNo; //下一题id
                that.totalRightNum  =resdata.totalRightNum;
                if(that.totalRightNum==0){
                    that.number=1
                  }else if(that.totalRightNum>=5){
                    that.number=3
                  }else {
                    that.number=2
                }

                that.isRight  =resdata.isRight;
                that.isLastQuestion = resdata.isLastQuestion;//最后一题
                //取到正确答案的index
                let  arr = Object.keys(that.questionsList[0].questionOptionList); 
                let list = that.questionsList[0].questionOptionList;
                for( var i=0;i<=list.length-1;i++){
                  if(resdata.rightAnswer== list[i].optionCode){
                      that.rightIndex = i;
                  }
                }
                that.checkIndex  = checkIndex;//用户选择索引
                
                if(resdata.questionIsTimeout==1){ //单题已超时
                      that.singleStatus = true;
                     if(resdata.isLastQuestion==1){ //最后一题
                         setTimeout(() => {
                          that.submitPapers() //提交试卷
                         }, 1500);
                      }else{
                         setTimeout(() => {//500ms 后请求下一题
                           that.getNextQuestion()
                        }, 1500);
                      }
                     
                }else if(resdata.questionIsTimeout==0){ //单题未超时
                    if(resdata.isLastQuestion==1){ //最后一题
                       setTimeout(() => {
                          that.submitPapers() //提交试卷
                      }, 1500);
                    }else{
                      setTimeout(() => {//500ms 后请求下一题
                        that.getNextQuestion()
                      }, 1500);
                    }
                   
                }
          }else{
            GB.utils.htoast(resData.msg);
          }
         
      });
    },
    //请求下一题
     getNextQuestion(){ 
        let that = this;
        that.singleStatus= null,
        that.userSelect = null;
        that.checkIndex = null;
        that.rightIndex = null;
        let param = {
          actCode:actCode, //活动编码
          paperCode:that.paperCode, //试卷code
          questionId:that.questionId,//题目id
          sessionId: that.sessionId,
          telephone:that.telephone,
       };
        nextQuestion(param).then(res => {
          if(res.data.code=='0000'){
              let resdata = res.data.data
              if(resdata.totalRightNum==0){
                    that.number=1
                  }else if(resdata.totalRightNum>=5){
                    that.number=3
                  }else {
                    that.number=2
                }
              that.$nextTick(function(){
                  that.totalNum = resdata.totalNum;
                  that.totalRightNum  =resdata.totalRightNum;
                  that.answerTime = resdata.answerTime;
                  that.questionsList  = resdata.questionsList;// 题干信息
                  that.totalAnswerTime = resdata.totalAnswerTime;
                  if(resdata.paperStatus==2){ //试卷超时超
                    that.isOverTime = true
                  }else if(resdata.paperStatus==1){ //未超时
                    if(resdata.questionIsTimeout===1){ //单题超时
                          that.singleStatus = true;
                          that.checkAnswer()
                    }else{
                         that.$nextTick(function(){ //等倒计时元素渲染完后初始化组件
                            that.$refs.countdown.initctd();
                            that.questionsList  = resdata.questionsList;// 题干信息
                        })
                    }
                  }
              })
              
          }else{
             GB.utils.htoast(resData.msg);
          }
          
      });
    },
    //提交试卷
    submitPapers(){
       let that = this;
       let param ={
         actCode:actCode,
         paperCode:that.paperCode,
         sessionId:that.sessionId,
         telephone:that.telephone,
       }
      submitPaperLast(param).then(res => {
        if(res.data.code=='0000'){
            that.questionStatus = 2 //答题奖励 
             let resData = res.data.data;
             that.isOverTime = false;
             that.giftList = resData;
             if(!resData.rewardList){
               that.giftList.rewardList =[];
             }
        }else{
          if(resData.code=='9999999'){
             GB.utils.htoast(resData.msg);
             that.submitPapers();
          }else{
             GB.utils.htoast(resData.msg);
          }
        }
      });
    },
    goToShare(e){ //邀请好友
      if(e){
        this.$sa.quick('trackHeatMap', e.currentTarget) 
      }
      var params_shared = {
          type: "1", //分享类型 1：新闻类分享  2：截图分享
          code: shareCode, //活动code，分享统计标示
          needLogin: "1",
          platform: "0", //0:弹出选择平台 1:微信好友 2:微信朋友圈 3：QQ好友 4：QQ空间 5：复制链接
          pushShareMark: "1" //是否需要统计用户分享
      };
      GB.utils.callCustomMethod("share", params_shared);
    },
    checkGift(){
      GB.utils.callCustomMethod("openUrl", {
                url: basePath + '/html/pages/anActivityPreheatMyAward/' ,
                params: {}
      });
      // window.location.href = basePath + "/html/pages/anActivityPreheatMyAward/"
    },
    tryAgain(e){//再来一局
         let that = this
         if(e){
            that.$sa.quick('trackHeatMap', e.currentTarget) 
         }  
        let param = {
            actCode:actCode,
            sessionId:that.sessionId,
            telephone:that.telephone,
        }
        startTest(param).then(res=>{
            let resData = res.data;
            if(resData.code=='0000'){
                that.paperCode = resData.data.paperCode;
                that.questionId = resData.data.questionNo;
                that.questionStatus = 1;//显示开始答题页面
                that.getNextQuestion()
            }else{
                GB.utils.htoast(resData.msg);
            }
        })

    }
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
   background: #00319A url(./res/kuang.png) repeat;
    background-size:15px 15px;
    font-family: PingFang-SC-Medium;
    height: 100%;
  color: #fff;
  .px2px(padding-top,20);
  .px2rem(font-size,32);
  .questionPart{
     background:  url(./res/answerBg.png) no-repeat ;
     height: 100%;
     background-size:100% 100%;
    //  .px2px(padding-left,50);
    //  .px2px(padding-right,50);
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
       .px2px(width,650);
       margin:0 auto;
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
     .bottom{
        position: fixed;
        margin:auto;
        left:0;
        right:0;
       .px2px(bottom,62);
        .px2px(width,650);
       .gift{
         .px2px(margin-left,2);
         .imgList{
            display: flex;
             flex-wrap:wrap;
             justify-content:space-between;
             .px2px(padding-left,8);
             .px2px(padding-right,20);
           .gitImg{
             .px2px(width,65);
             .px2px(height,71);
              img{
                .px2px(width,65);
                .px2px(height,71);
                display: block;
              }
           }
           .imgBig{
             .px2px(width,54);
             .px2px(height,70);
              img{
                .px2px(width,54);
                .px2px(height,70);
                display: block;
              }
           }
         
         }

         .blockList{
            .blueLsit{
              .px2px(margin-top,20);
              .px2px(width,92);
              .px2px(height,40);
              background: #0074EA;
              border:2px solid #391543;
              box-sizing: border-box;
              border-radius: 3px;
            }
            .greenLsit{
              .px2px(margin-top,20);
              .px2px(width,92);
              .px2px(height,40);
              background: #0CC75B;;
              border:2px solid #391543;
              border-radius: 3px;
            }
         }
        
       }


     }
  }
  .questionEnd{
     background:  url(./res/endBg.png) no-repeat ;
     height: 100%;
     background-size:100% 100%;
    .px2px(padding-left,40);
    .px2px(padding-right,40);
    .px2px(padding-top,139);
     .header{
       .headerBg{
         margin: 0 auto;
         .px2px(width,358);
         .px2px(height,94);
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
          .px2px(padding-left,64);
          .px2px(padding-right,64);
          .text{
             color: #391543;
            font-weight: bold;
            letter-spacing: 1px;
            text-align: center;
            .px2px(margin-top,40);
            .px2px(margin-bottom,40);
          }
          .iconAll{
            // .px2px(padding-left,64);
            // .px2px(padding-right,64);
            display: flex;
            flex-direction: row;
            justify-content:center;
            .icon{
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
            .iconLR{
               .px2px(margin-left,20); 
               .px2px(margin-right,20);
            }
            .iconRight{
               .px2px(margin-left,20); 
               .px2px(margin-right,0);
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
            .px2px(margin-top,58);
            .px2px(margin-bottom,68);
             .px2px(border-radius,50);
          }
         
        }

        .noGift{
          .noGiftText{
            color: #391543;
            letter-spacing: 1px;
            text-align: center;
            .px2px(margin-top,147);
            .px2px(margin-bottom,160);
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
 .index-page .questionEnd .questionContent .contentText{
   .px2px(padding-left,58);
   .px2px(padding-right,58);
 }
 .index-page .questionPart .bottom{
   .px2px(bottom,0);
  }

 .index-page .questionEnd{
   padding-top:50px;
 }
 .index-page .questionEnd .questionContent .contentText .checkGift{
   margin-top:10px;
   margin-bottom:30px;
 }
 .index-page .questionEnd .questionContent .contentText .newUser{
   margin-bottom:10px;
 }

}


@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .index-page {
     height:105% !important;
  }
  .index-page .questionPart .bottom{
   .px2px(bottom,160);
  }
}
//iphone Xs Max
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
 .index-page {
     height:105% !important;
  }
  .index-page .questionPart .bottom{
   .px2px(bottom,160);
  }
}
//iphone XR
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
 .index-page {
     height:105% !important;
  }
  .index-page .questionPart .bottom{
   .px2px(bottom,160);
  }
}
</style>