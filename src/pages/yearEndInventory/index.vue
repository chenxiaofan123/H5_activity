<template>
    <div class="index-page" v-cloak>
           <!-- 进度条 -->
        <div class="loading" v-if="isLoading">
            <div id="idContent">
                <div class="contentBg">
                    <div class="loadingText">正在开启你的财富报告</div>
                    <div id="appLoading">
                        <li><span class="bar graphic-design"></span></li>
                    </div>
                </div>
            </div>
        </div>
       <!-- 背景音乐 -->
        <section v-if="!isLoading" class="musicContent" id='musicPart'>
            <div class="Music">
                <div class='musicVideo'>
                    <div  @click="changeOn('#audio')" :class="!isOff? 'isOff':'isOn'">
                    </div>
                    <div id='audioDiv'>
                        <audio id="audio"  loop="loop" >
                                <source src='/statics/assets/mp3.mp3' type="audio/mpeg">
                        </audio>
                    </div>
                   
                </div>
            </div>
        </section>
          <div  v-if='!isLoading'   class="swiper-container swiper-container-vertical swiper-container-ios" id="swiper-container-v">
                <!-- 进入页面 -->
                <section v-if='!isShowReport' id="startPage" class="swiper-slide"  style="background:#F5FDFF" >
                    <div class="first">
                        <div class="firstTop">
                        <div class="firstText"></div>
                        </div>
                        <div class="firstBottom">
                            <a class='firstButtom' @click="getReport()">获取财富报告</a>
                        </div>
                    </div>
                </section>
                 <!--无报告-->
                <div class='frame-box' v-show='!reportFlag&&showFrameBox' @touchmove.prevent>
                    <!--活动规则-->
                    <div class='frame-main invite-info'>
                        <div class="Img"></div>
                        <p class="pop_title">
                            <span>2018</span>&nbsp;年
                        </p>
                        <p>你还没在黄金钱包投过资哦</p>
                        <p>现在去看看</p>
                        <div @click="goInvestment"><a  class="button" >确定</a></div>
                        <div class='close' @click='closeFrameBox'></div>
                    </div>
                </div>
              
                <!-- 有报告 -->
                <div v-if='reportFlag&&isShowReport' class="swiper-wrapper" style="transform: translate3d(0px, 0px, 0px);">
                    <!-- 第1屏 -->
                    <section class="swiper-slide" >
                        <div class="part1">
                            <div class="partTextAll">
                                <div class="part1Text">
                                    <div class="title">你还记得吗？</div>
                                    <div class="textPart">
                                    
                                        <p class="yellow">{{dataDetail.registerDate|formatDate}}</p>
                                        <p>你第一次打开黄金钱包</p>
                                        <p>如今，你与黄金钱包相伴成长&nbsp;<span class="yellow" style='font-family:"DIN-Bold"; font-size:20px' >
                                            {{dataDetail.registerDays}}
                                            <!-- <countTo   :startVal='startVal' style='font-family: "DIN-Bold";'   :endVal='' :duration='3000' ></countTo> -->
                                        </span>&nbsp;天</p>
                                    </div>
                                    <div class="textPart">
                                        <p class="yellow">{{dataDetail.firstInvestDate|formatDate}}</p>
                                        <p>你第一次购买了&nbsp;<span class="yellow">{{dataDetail.firstInvestProduct}}</span>&nbsp;产品</p>
                                        <p>从此，你开始了黄金钱包之旅</p>
                                    </div>
                                </div>
                                <div class="part1yezi"></div>
                            </div>
                            <div class="part1Bottom"></div>
                            <div class="arrow-box">
                            <img src="./res/arrow1.png" id="array"> 
                            </div>    
                        </div>
                    </section>
                    <!-- 第2屏 -->
                    <section class="swiper-slide swiper-slide3" >
                    <div class="part2">
                            <div class="partTextAll">
                                <div class="part1Text">
                                <div class="part2Money">
                                      <!-- <countTo :startVal='startVal' style='font-family: "DIN-Bold";'  :endVal='(dataDetail.goldInvestMoney/100+dataDetail.financeInvestMoney/100)' :useEasing='true' :duration='6000' :decimals='2' ></countTo> -->
                                    <span>
                                      {{dataDetail.totalInvestMoney|formatMoneySplit}}
                                    </span>&nbsp;元
                                </div>
                                <div class="textPart">
                                    <p >是你今年投资的总金额</p>
                                    <p>你累计投资了&nbsp;<span class="yellow">
                                            <!-- <countTo :startVal='startVal'  :endVal='dataDetail.investNumber' :duration='8000'></countTo>  -->
                                        {{dataDetail.investNumber}} 
                                        </span>&nbsp;次</p>
                                    <p>超过了&nbsp;<span class="yellow">{{(dataDetail.investRanking*100).toFixed(0)}}%</span>&nbsp;的金友</p>
                                </div>
                                <div class="part2Echart">
                                    <div id="echartContainer" style="width:52%; height:180px;margin-top:10px"></div>
                                     <div class="container2Tip">
                                        <div class="clearfix" >
                                            <span class='tip1'></span><span>黄金</span><span>{{(dataDetail.goldInvestRadio*100).toFixed(0)}}%</span>
                                        </div>
                                            <div class="clearfix">
                                            <span class='tip2'></span><span>理财</span><span>{{(dataDetail.financeInvestRadio*100).toFixed(0)}}%</span>
                                        </div>
                                        <div class="clearfix">
                                            <span class='tip3'></span><span>零钱</span><span>{{(dataDetail.looseChangeRadio*100).toFixed(0)}}%</span>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                                <div class="part1yezi"></div>
                            </div>
                            <div class="part1Bottom"></div>
                            <div class="arrow-box">
                            <img src="./res/arrow1.png" id="array"> 
                            </div> 
                        </div>
                    </section>
                    <!-- 第3屏 -->
                    <section class="swiper-slide " v-if="dataDetail.miningGold!=0" >
                        <div class="part3">
                            <div class="partTextAll">
                                <div class="part1Text">
                                <div class="part2Money"><span>{{dataDetail.miningGold}}</span>&nbsp;mg</div>
                                <div class="textPart">
                                    <p >是你今年累计挖到的黄金量</p>
                                    <p>你挖到黄金&nbsp;<span class="yellow">
                                        <countTo :startVal='startVal'  :endVal='dataDetail.miningNumber' :duration='3000'></countTo> 
                                        <!-- {{dataDetail.miningNumber}} -->
                                    </span>&nbsp;次</p>
                                </div>
                                <div class="textPart" v-if='dataDetail.maxMiningGold>=1000'>
                                    <p >最多的一次是<span class="yellow">{{dataDetail.maxMingingDate|formatDate}}</span></p>
                                    <p>挖出了{{dataDetail.maxMiningGold}}mg黄金</p>
                                </div>
                                <div class='part3Slogn clearfix'>
                                    <div class="right" v-if='dataDetail.miningGold<10'>官宣：挖矿小能手</div>
                                    <div class="right" v-if='dataDetail.miningGold>=10&&dataDetail.miningGold<=50'>官宣：黄金矿主</div>
                                    <div class="right" v-if='dataDetail.miningGold>=50&&dataDetail.miningGold<=1000'>官宣：铂金矿主</div>
                                    <div class="right" v-if='dataDetail.miningGold>=1000'>官宣：钻石矿主</div>
                                    <div class="line right"></div>
                                </div>
                            </div>
                                <div class="part1yezi"></div>
                            </div>
                            <div class="part1Bottom"></div>
                            <div class="arrow-box">
                            <img src="./res/arrow1.png" id="array"> 
                            </div> 
                        </div>
                    </section>
                    <!-- 第4屏 -->
                    <section class="swiper-slide" >     
                        <div class="part4">
                            <div class="partTextAll">
                                <div class="part1Text " :class="{4:'part4tImg4',3:'part4Img3',2:'part4Img2',1:'part4Img1'}[showTitleType]">
                                <div class="part2Money"><span>365</span>&nbsp;天里</div>
                                <div class="textProperty">
                                    你这样安排自己的财产
                                </div>
                                 <div class="partMoney"  style="position:relative">
                                        <div id="echartContainer4" style="width:52%; height:180px;margin-top:10px"></div>
                                        <div class="container4Tip">
                                           <div class="clearfix" >
                                            <span class='tip1'></span><span>30天</span><span>{{(dataDetail.thirtyInvestRatio*100).toFixed(0)}}%</span>
                                        </div>
                                            <div class="clearfix">
                                            <span class='tip2'></span><span>90天</span><span>{{(dataDetail.ninetyInvestRadio*100).toFixed(0)}}%</span>
                                        </div>
                                        <div class="clearfix">
                                            <span class='tip3'></span><span>180天</span><span>{{(dataDetail.halfYearInvestRadio*100).toFixed(0)}}%</span>
                                        </div>
                                          <div class="clearfix">
                                            <span class='tip4'></span><span>365天</span><span>{{(dataDetail.yearInvestRadio*100).toFixed(0)}}%</span>
                                        </div>
                                          <div class="clearfix">
                                            <span class='tip5'></span><span>其他</span><span>{{(dataDetail.otherInvestRadio*100).toFixed(0)}}%</span>
                                        </div>
                                        </div>
                                    </div>
                                <div class='part3Slogn clearfix'>
                                    <div class="right" v-if='showTitleType==1'>号称：现金为王</div>
                                    <div class="right" v-if='showTitleType==2'>号称：理财达人</div>
                                    <div class="right" v-if='showTitleType==3'>号称：超级理财规划师</div>
                                    <div class="right" v-if='showTitleType==4'>号称：理财新贵</div>
                                    <div class="line right"></div>
                                </div>
                                
                            </div>
                            </div>
                            <div class="part1Bottom"></div>
                            <div class="arrow-box">
                            <img src="./res/arrow1.png" id="array"> 
                            </div> 
                        </div>
                    </section>
                    <!-- 第5屏 -->
                    <section class="swiper-slide" >     
                        <div class="part5">
                            <div class="partTextAll">
                                <div class="part1Text">
                                <div class="part2Money"><span>{{dataDetail.maxInvestMoney|formatMoneySplit}}</span>&nbsp;元</div>
                                <div class="textPart">
                                    <p >是你今年最大一笔投资</p>
                                    <p>记得那天是&nbsp;<span class="yellow">{{dataDetail.maxInvestDate|formatDate}}</span></p>
                                </div>
                                <div class="textPart">
                                    <p v-if="dataDetail.nightInvestDays!=0" >你有&nbsp;<span class="yellow">{{dataDetail.nightInvestDays}}</span>&nbsp;天{{{0:'深夜',1:'清晨'}[dataDetail.nightInvestType]}}还在投资理财</p>
                                    <p>你认真理财的样子真的很迷人</p>
                                </div>
                            </div>
                                <div class="part1yezi"></div>
                            </div>
                            <div class="part1Bottom"></div>
                            <div class="arrow-box">
                            <img src="./res/arrow1.png" id="array"> 
                            </div> 
                        </div>
                    </section>   
                    <!-- 第6屏 -->
                    <section class="swiper-slide" >     
                    <div class="part6">
                            <div class="partTextAll">
                                <div class="part1Text">
                                <div class="part2Money" v-if="dataDetail.inviteUserNumber!=0"><span>{{dataDetail.inviteUserNumber}}</span>&nbsp;位好友</div>
                                <div class="textPart" v-if="dataDetail.inviteUserNumber!=0">
                                    <p >由你邀请来到黄金钱包一起投资</p>
                                    <p>你的土豪朋友圈中</p>
                                    <p>好友最大一笔投资为&nbsp;<span class="yellow">{{dataDetail.inviteMaxInvset|formatMoneySplit}}</span>&nbsp;元</p>
                                </div>

                                <div class="noFriend" v-if="dataDetail.inviteUserNumber==0">
                                    <div class="part2Money"><span>2,965,641</span>&nbsp;位金友</div>
                                    <div class="textPart">
                                        <p >与你一起在黄金钱包投资</p>
                                        <p>累计交易额达300亿</p>
                                    </div>
                                </div>
                                <div class="friendImg"></div>
                            </div>
                            </div>
                            <div class="part1Bottom"></div>
                            <div class="arrow-box">
                            <img src="./res/arrow1.png" id="array"> 
                            </div> 
                        </div>
                    </section>  
                    <!-- 第7屏 -->
                    <section class="swiper-slide"  v-if='dataDetail.drawFlag' >     
                    <div class="part7">
                            <div class="partTextAll">
                                <div class="part1Text">
                                <div class="part2Money"><span>{{dataDetail.drawDate|formatDate}}</span></div>
                                <div v-if="dataDetail.drawFlag">
                                    <div class="textPart" v-if='dataDetail.drawType==1'>
                                        <p >这一天，你在{{dataDetail.drawActivityName}}中</p>
                                        <p>获得奖励&nbsp;<span class="yellow">{{dataDetail.drawName}}</span></p>
                                        <p class="giftjiezhi"></p>
                                    </div> 
                                    <div class="textPart" v-if='dataDetail.drawType==5'>
                                        <p >这一天，你在{{dataDetail.drawActivityName}}中</p>
                                        <p>获得奖励&nbsp;<span class="yellow">{{dataDetail.drawName}}</span></p>
                                        <p class="giftka"></p>
                                    </div> 
                                    <div class="textPart" v-if='dataDetail.drawType==2'>
                                        <p >这一天，你在{{dataDetail.drawActivityName}}中</p>
                                        <p>获得奖励&nbsp;<span class="yellow">{{dataDetail.drawName}}</span></p>
                                        <p class="giftiphoneXS"></p>
                                    </div> 
                                    <div class="textPart" v-if='dataDetail.drawType==4||dataDetail.drawType==3 ||dataDetail.drawType==6'>
                                        <p >这一天，你在{{dataDetail.drawActivityName}}中</p>
                                        <p>获得奖励&nbsp;<span class="yellow">{{dataDetail.drawName}}</span></p>
                                        <p class="giftjintiao"></p>
                                    </div> 
                                </div>
                                
                                <div class="textPart">
                                    <p >2019年，我们已经准备好</p>
                                    <p>每笔投资 都有一个希望</p>
                                    <p>让投资实现梦想</p>
                                </div> 
                            </div>
                            </div>
                            <div class="part1Bottom"></div>
                            <div class="arrow-box">
                            <img src="./res/arrow1.png" id="array"> 
                            </div> 
                        </div>
                    </section>  
                    <!-- 总结 -->
                    <section class="swiper-slide" >     
                    <div class="part8">
                            <div class="partTextAll">
                                <div class="part1Text">
                                    <div class="textPart">
                                    <p >年度累计投资额</p>
                                    <p><span class="yellow">{{dataDetail.totalInvestMoney|formatMoneySplit}}</span>&nbsp;元</p>
                                    </div> 
                                    <div class="part8Echart"  style="position:relative">
                                        <div id="echartContainer8" style="width:52%; height:170px"></div>
                                        <div class="container8Tip">
                                            <div class="clearfix" >
                                                <span class='tip1'></span><span>黄金</span><span>{{dataDetail.goldInvestMoney|formatMoneySplit}}</span>
                                            </div>
                                                <div class="clearfix">
                                                <span class='tip2'></span><span>理财</span><span>{{dataDetail.financeInvestMoney|formatMoneySplit}}</span>
                                            </div>
                                            <div class="clearfix">
                                                <span class='tip3'></span><span>零钱</span><span>{{dataDetail.looseChangeMoney|formatMoneySplit}}</span>
                                            </div>
                                        </div>
                                    </div>
                                <div class="financialIncome ">
                                    <div class="IncomList clearfix">
                                            <div class="left">
                                                <p>黄金收益</p>
                                                <p>{{dataDetail.goldEarnings|formatMoneySplit}}</p>
                                            </div>
                                            <div class="left">
                                                <p>理财收益</p>
                                                <p>{{dataDetail.financeEarnings|formatMoneySplit}}</p>
                                            </div>
                                            <div class="left">
                                                <p>零钱收益</p>
                                                <p>{{dataDetail.looseChangeEarings|formatMoneySplit}}</p>
                                            </div>
                                    </div>
                                        <div class="incomTip">所获收益之和均不含加息收益</div>
                                </div>
                                <div class="incomBottom">
                                    <div>累计投资收益超过全国<span>{{(dataDetail.rankingRadio*100).toFixed(0)}}%</span>的金友</div>
                                    <div v-if='(dataDetail.rankingRadio*100).toFixed(0)>90'>日进斗金&nbsp;富可敌国</div>
                                    <div v-if='(dataDetail.rankingRadio*100).toFixed(0)>70&&(dataDetail.rankingRadio*100).toFixed(0)<=90'>钱途无量&nbsp;八方来财</div>
                                    <div v-if='(dataDetail.rankingRadio*100).toFixed(0)>50&&(dataDetail.rankingRadio*100).toFixed(0)<=70'>积少成多&nbsp;富贵有余</div>
                                    <div v-if='(dataDetail.rankingRadio*100).toFixed(0)<50'>一分耕耘&nbsp;一分收获</div>
                                </div>
                            </div>
                            </div>
                            <div class="part1Bottom">
                                <div class="bottomYuce">滑动预测我的2019年致富方式</div>
                            </div>
                            <div class="arrow-box">
                            <img src="./res/arrow1.png" id="array"> 
                            </div> 
                        </div>
                    </section>  
                    <!-- 分享 -->
                    <section class="swiper-slide" >     
                    <div class="part9">
                            <div class="partTextAll">
                                <div class="part1Text">
                                    <div v-if='dataDetail.userLabel==1'>
                                        <div class="shareImg1"></div>
                                        <div class="shareImgText1"></div>
                                        <div class="shareText">熬最深的夜，开最壕的跑车</div>
                                    </div>
                                    <div v-if='dataDetail.userLabel==2'>
                                        <div class="shareImg2"></div>
                                        <div class="shareImgText2"></div>
                                        <div class="shareText">钱，妙不可言。缘分到了，自然就富了。</div>
                                    </div>
                                    <div v-if='dataDetail.userLabel==3'>
                                        <div class="shareImg3"></div>
                                        <div class="shareImgText3"></div>
                                        <div class="shareText">尽管市场多变，你总能找到赚钱的办法</div>
                                    </div>
                                    <div v-if='dataDetail.userLabel==4'>
                                        <div class="shareImg4"></div>
                                        <div class="shareImgText4"></div>
                                        <div class="shareText">凭你认识的朋友，你没办法穷</div>
                                    </div>
                                    <div class="shareButtom">
                                        <div class="shareButtonOne" @click='goShare()'>分享给小伙伴吧</div>
                                        <div class="shareButtonTwo" @click='goTop()'><span class="backImg"></span><a>回顾2018</a></div>
                                    </div>
                                </div>
                            </div>
                            <div class="part9yezi"></div>
                            <div class="part1Bottom">
                            </div>
                        </div>
                    </section>  
                    
                    <div class="swiper-pagination"></div>  
                        <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                    </div>
            </div>
        
    </div>
</template>
<script>
var echarts = require("echarts");
import User from '../../service/common/User';
import { Swiper, swiperSlide } from "vue-awesome-swiper";
import countTo from 'vue-count-to';
 import DigitRoll from '@huoyu/vue-digitroll';
import util from "../../utils/tool.js";
import wxShare from "../../commonScript/wxShare.js";
import number from './components/number';
import { getYearEndDetail } from "../../service/pages/yearEndInventory/service.js";
export default {
  data() {
    return {
      user: new User(),
      isCount:false,
      showFrameBox:false,//无报告弹框
      startVal:0,
      endVal: 1234567,
      isLoading:true,
      isOff: false, //是否播放音乐
      reportFlag: null, //是否有报告
      isShowReport:false,
      telephone: null, //用户手机号
      sessionId:null, // 
      showTitleType:null, //称号类型显示
      dataDetail: {
        drawActivityName: null,
        drawDate: null,
        drawFlag: null,
        drawName: null,
        drawType: null,
        financeEarnings: null,
        financeInvestMoney: null,
        firstInvestDate: null,
        firstInvestProduct: null,
        goldEarnings: null,
        goldInvestMoney: null,
        halfYearInvestRadio: null,
        investNumber: null,
        investRanking: null,
        inviteMaxInvset: null,
        inviteUserNumber: null,
        looseChangeEarings: null,
        looseChangeMoney: null,
        maxInvestDate: null,
        maxInvestMoney: null,
        maxMingingDate: null,
        maxMiningGold: null,
        miningGold: null,
        miningNumber: null,
        nightInvestDays: null,
        ninetyInvestRadio: null,
        otherInvestRadio: null,
        rankingRadio: null,
        registerDate: null,
        registerDays: null,
        reportFlag: null,
        thirtyInvestRatio: null,
        totalInvestMoney: null,
        userLabel: null,
        yearEarnings: null,
        yearInvestRadio: null
      }
    };
  },
  watch: {
  },
  filters: {
      formatDate(val){
        if(val){
             val =val.replace(/-/g,".")
           return val 
         }
      },
    formatMoneySplit(val) {
      //千位分割保留两位小数
      val = (val / 100).toString().replace(/\$|\,/g, "");
      if (isNaN(val)) {
        val = "0.00";
      }
      let sign = val == (val = Math.abs(val));
      val = Math.floor(val * 100 + 0.50000000001);
      let cents = val % 100;
      val = Math.floor(val / 100).toString();
      if (cents < 10) {
        cents = "0" + cents;
      }
      for (var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
        val =
          val.substring(0, val.length - (4 * i + 3)) +
          "," +
          val.substring(val.length - (4 * i + 3));
      }

      return (sign ? "" : "-") + val + "." + cents;
    },
    numFormat(num) {
      //单纯千位分割符
      num = num.toString().split("."); // 分隔小数点
      var arr = num[0].split("").reverse(); // 转换成字符数组并且倒序排列
      var res = [];
      for (var i = 0, len = arr.length; i < len; i++) {
        if (i % 3 === 0 && i !== 0) {
          res.push(","); // 添加分隔符
        }
        res.push(arr[i]);
      }
      res.reverse(); // 再次倒序成为正确的顺序
      if (num[1]) {
        // 如果有小数的话添加小数部分
        res = res.join("").concat("." + num[1]);
      } else {
        res = res.join("");
      }
      return res;
    }
  },
  components: {
      countTo,
      "NumberGrow":number,
       DigitRoll ,
  },
  mounted() {
       var that = this;
         setTimeout(function(){  //使用  setTimeout（）方法设定定时2000毫秒
             that.isLoading=false;
        },2000);
      //在这里需要判断 是否登录  登录之后之后的状态 来展示
        sessionProObj.getUserInfo((telephone, sessionId) => {
            that.telephone = telephone;
            that.sessionId = sessionId;
            console.log(telephone)
            console.log(sessionId)
        });
          
    
  },
  created() {},
  methods: {
       //关闭弹窗
    closeFrameBox() {
        this.showFrameBox = false;
    },
    hasReportInit() {
      // 基于准备好的dom，初始化echarts实例
       let that =this;
      let Height = document.body.clientHeight;
      let div = document.getElementById("swiper-container-v");
       var mySwiper =  new Swiper ('.swiper-container', {
            direction: 'vertical', // 垂直切换选项
            loop: false, // 循环模式选项
            observer:true,
            observeParents:true
        })
          
      let myChart = echarts.init(document.getElementById("echartContainer"));
      let myChart4 = echarts.init(document.getElementById("echartContainer4"));
      let myChart8 = echarts.init(document.getElementById("echartContainer8"));
        let option = {
           color: ["#FFEC66", "#FFBD00 ", "#6CD7FF "],
        series: [
          {
            name: "黄金钱包",
            type: "pie",
            hoverAnimation:false,
            radius: ["35%", "81%"],
            center:["59.5%", "50%"],
            label: {
               normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            data: [
              { value: this.dataDetail.goldInvestRadio, name: "黄金" },
              { value: this.dataDetail.financeInvestRadio, name: "理财" },
              { value: this.dataDetail.looseChangeRadio, name: "零钱" },
            ]
            }
        ]
      };

      let optionFour = {
        color: ["#FF7700 ", "#6CD7FF ", "#FFB200", "#FFEB58","#39E77A"],
        series: [
          {
            name: "黄金钱包",
            type: "pie",
            hoverAnimation:false,
            radius: ["35%", "81%"],
            center:["59.5%", "50%"],
            label: {
               normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            data: [
              { value: this.dataDetail.yearInvestRadio*100, name: "365天" },
              { value: this.dataDetail.halfYearInvestRadio*100, name: "180天" },
              { value: this.dataDetail.ninetyInvestRadio*100, name: "90天" },
              { value: this.dataDetail.thirtyInvestRatio*100, name: "30天" },
              { value: this.dataDetail.otherInvestRadio*100, name: "其他" }
            ]
          }
        ]
      };
      //图8
      let optionEight = {
        color: ["#FFEC66", "#FFBD00 ", "#6CD7FF "],
        series: [
          {
            name: "黄金钱包",
            type: "pie",
            hoverAnimation:false,
             radius: ["30%", "80%"],
            center:["50%", "48%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: "24",
                  fontWeight: "normal",
                  fontFamily: "Arita-CZS"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: this.dataDetail.goldInvestMoney / 100, name: "黄金" },
              { value: this.dataDetail.financeInvestMoney / 100, name: "理财" },
              { value: this.dataDetail.looseChangeMoney / 100, name: "零钱" }
            ]
          }
        ]
      };
      // 绘制图表
      myChart.setOption(option);
      myChart4.setOption(optionFour);
      myChart8.setOption(optionEight);
    },
    changeOn(ele) {
      let oAudio = document.querySelector(ele);
      if (!this.isOff) {
           oAudio.play(); //让音频文件开始播放
           oAudio.loop;
      } else {
            oAudio.pause(); //让音频文件暂停播放
      }
       this.isOff = !this.isOff;
      console.log(this.isOff+'测试音乐')
    },
    audioAutoPlay() {
        let audio = document.getElementById('audio');
            this.isOff = false;
            audio.play();
        document.removeEventListener('touchstart',this.audioAutoPlay);
    },
    getReport(){
        if (!this.telephone) {
            this.callAppLogin();
            return;
        }else{
           this.getYearEndDetail()
        }
    },
     //登录
    callAppLogin() {
        this.user.callAppLogin();
    },
    //获取详情接口
    getYearEndDetail() {
      let that = this;
      var param = {
           telephone: that.telephone,
           sessionId:that.sessionId
        //  telephone: '18244684886',
        //  sessionId:'390d72a4cdfe4474acaabfd5849129f5'
      };
      getYearEndDetail(param).then(res => {
          let data = res.data;
          if (+data.code == 0) {
              that.dataDetail = data.data;
              that.reportFlag = that.dataDetail.reportFlag;
              //变量前置不影响swiper初始化
              if(that.reportFlag){
                  that.isShowReport=true;
              }
               console.log(that.isOff+'接口音乐')
              console.log( that.reportFlag +'有无报告')
               console.log( that.isShowReport +'是否显示报告')
               that.$nextTick(() => {
                    if (that.reportFlag) {
                        this.hasReportInit();
                        let middleNumber =
                        that.dataDetail.ninetyInvestRadio * 100 +
                        that.dataDetail.halfYearInvestRadio * 100;
                        if(that.dataDetail.thirtyInvestRatio*100>80){
                            that.showTitleType = 1
                        }else if(middleNumber>80){
                            this.showTitleType = 2
                        }else if(that.dataDetail.thirtyInvestRatio||that.dataDetail.ninetyInvestRadio||that.dataDetail.halfYearInvestRadio||that.dataDetail.yearInvestRadio){
                            this.showTitleType = 3
                        }else if(that.dataDetail.otherInvestRadio){
                            this.showTitleType = 4
                        }
                        console.log(this.showTitleType)
                    } else if(!that.reportFlag) {
                        that.isShowReport=false;
                        that.showFrameBox=true;
                    }
                });
            
          } else {
              if (data.msg) {
                  GB.utils.htoast(data.msg);
              }
          }
      });
    },
    //去直智选投列表
    goInvestment() {
         if (!this.telephone) {
            this.callAppLogin();
            return;
        }
        //跳转网贷
        GB.utils.callCustomMethod('showProductTab', {tabIndex:1})
    },
    goShare(){
        var that = this;
        let type =that.dataDetail.userLabel; //显示类型
        location.href = basePath + '/html/pages/yearEndPosters/?type='+type;
    },
    goTop(){
        let that = this;
        if (that.reportFlag) {
           this.hasReportInit();
        }
    },
  },
  beforeMount() {}
};
</script>
<style lang="less" src='./less/index.less' scoped></style>