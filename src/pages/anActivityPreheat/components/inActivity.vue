<template>
    <div class='inActivity' v-cloak >
        <header class="header-content">
            <div class="rules" @click="goRule()">活动细则</div>
            <div class="answer-detail-h5" >
                <div class="answer-content">
                    <div class="content-middle">
                        <span class="tip content-middle-tip">当前排名：</span>
                        <span class="ranking-not fw" v-if='datas.totalCorrectNum<=0'>当前暂无排名</span>
                        <span class="ranking  fontFamily" v-else>{{datas.curRank|formateNotData}}</span>
                        <p @click='goHeroList' class="content-middle-right">
                            <span class="go-reward go-hero">查看排名</span><span class="jump"></span>
                        </p>
                    </div>
                    <ul class="content-top">
                        <li>
                            <p class="num fontFamily">{{datas.totalCorrectNum|formateNotData}}</p>
                            <p class="tip">累计答对题数</p>
                            <div @click='goMyAward'>
                                <span class="go-reward">我的奖励</span><span class="jump"></span>
                            </div>
                        </li>
                        <li>
                            <p class="num fontFamily">{{datas.availableAnswerNum|formateNotData}}</p>
                            <p class="tip">今日答题机会</p>
                            <div v-show='islogin==2'>
                                <div @click="add" v-show='datas.answerSurplusCount>0||datas.dailyReceiveTimes>0||datas.investeReceiveTimes>0||datas.invitateReceiveTimes>0'>
                                    <span class="go-reward" >增加次数</span><span class="jump"></span>
                                </div>
                            </div>
                           
                        </li>
                    </ul>
                    
                    <div class="line-img"></div>
                    <div class="start-answer">
                        <div class="start-btn" id='start-btn' @click='goAnswer($event)'></div>
                    </div>
                </div>
            </div>
        </header>  
        <article  class="article-body">
            <div class="reward">
                <div class="reward-title">
                    <p class="bgs-img">REWARD</p>
                    <p class="title">
                        累计答对题数越多，排名越靠前，<span>奖励越多</span>
                    </p>
                </div>
                <ul class="reward-list">
                    <li>
                        <div class="iconImg" >
                            <img src="./../res/icon1.png" />
                        </div>
                        <div class="iconText" >
                             1-3名，分别获得3000元、2000元、1000元<span>现金红包</span>
                        </div>
                    </li>
                    <li>
                        <div class="iconImg" >
                            <img src="./../res/icon2.png" />
                        </div>
                        <div class="iconText" >
                            1-10名，获得<span>5%加息神券</span>
                        </div>
                    </li>
                    <li>
                        <div class="iconImg" >
                            <img src="./../res/icon3.png" />
                        </div>
                        <div class="iconText" >
                            1-1000名，可获得<span>华为P30抽奖机会</span>
                        </div>
                    </li>
                    <li>
                        <div class="iconImg" >
                            <img src="./../res/icon4.png" />
                        </div>
                        <div class="iconText" >
                            <span>所有参与答题的用户</span><br/>
                            答对一题就有奖，最高可得66元现金
                        </div>
                    </li>
                </ul>
            </div>
        </article>  
        <footer  class="footer-body">
            <div class="add-opportunity">
                <div class="opportunity-title">
                    <p class="bgs-img">STRATEGY</p>
                    <p class="title">
                        增加机会攻略：
                    </p>
                </div>
                <ul class="opportunity-list">
                    <li>
                        <span class="serial-num one">1</span>
                        <span class="list-title">每日可免费领取1次</span>
                        <span class="list-btn" v-if='islogin!=2||datas.dailyReceiveTimes>0' @click='getCount(datas.dailyReceiveTimes,1)'>领取</span>
                        <span class="not-btn" v-else></span> <!-- 已领取 -->
                    </li>
                    <li>
                        <span class="serial-num two">2</span>
                        <span class="list-title">邀好友注册并首购可获得1次</span>
                        <span class="list-btn" id='share-btn' @click='goShare($event)' v-if='islogin!=2 || datas.invitateReceiveTimes<=0'>去分享</span>
                        <span class="list-btn" v-else-if='datas.invitateReceiveTimes>0' @click='getCount(datas.invitateReceiveTimes,2)'>领取<span v-if='datas.invitateReceiveTimes>1'>({{datas.invitateReceiveTimes}})</span></span>
                    </li>
                     <li>
                        <span class="serial-num three">3</span>
                        <span class="list-title">累计投资1万元可获得1次</span>
                        <span class="list-btn" v-if='islogin!=2' @click='goInvestment'>去投资</span>
                        <span class="list-btn" v-if='datas.investeReceiveTimes<=0 && datas.dailyInvestChance==0' @click='goInvestment'>去投资</span>
                        <span class="not-btn" v-else-if='datas.investeReceiveTimes<=0 && datas.dailyInvestChance==1'></span>
                        <span class="list-btn" v-else-if='datas.investeReceiveTimes>0' @click='getCount(datas.investeReceiveTimes,3)'>领取<span v-if='datas.investeReceiveTimes>1'>({{datas.investeReceiveTimes}})</span></span>
                        <!-- <span class="not-btn" v-else></span> -->
                    </li>
                </ul>
            </div>
        </footer>
        <div class="footer-img"></div> 
    </div>
</template>
<script>
import User from "../../../service/common/User";
import shareModal from "./shareModal.vue";
import {actCode,startTest,getChange,shareCode} from '../../../service/pages/anActivityAnswer/service.js'
export default {
    data() {
        return {
            user: new User()
        }
    },
    props:{
        datas:{
            type:Object,
            default:null
        },
        islogin:{
            type:Number,
            default:-1
        },
        telephone:{
            type:String,
            default:''
        },
        sessionid:{
            type:String,
            default:''
        },
    },
    watch: {
        datas(val){
            console.log(val)
            console.log(88)
        },
        islogin(val){
            console.log(val+'登录信息')
        }
    },
    filters: {
    
    },
    components: {
        shareModal
    },
    mounted() {
        
    },
    methods: {
        /**
         * 去分享
         */
        goShare(e){
            let isflag = this.login();
            if(!isflag){
                return;
            }
            this.trackHeatMap(e);
            var params_shared = {
                type: "1", //分享类型 1：新闻类分享  2：截图分享
                code: shareCode, //活动code，分享统计标示   分享出去邀请用户
                needLogin: "1",
                platform: "0", //0:弹出选择平台 1:微信好友 2:微信朋友圈 3：QQ好友 4：QQ空间 5：复制链接
                pushShareMark: "1" //是否需要统计用户分享
            };
            GB.utils.callCustomMethod("share", params_shared);
        },
        /**
         * 跳转我的奖励
         */
        goMyAward(){
            let isflag = this.login();
            if(!isflag){
                return;
            }
            let url = basePath + "/html/pages/anActivityPreheatMyAward/";
            GB.utils.callCustomMethod("openUrl", {
                url: url ,
                params: {}
            });
        },
        goHeroList(){
            let url = basePath + "/html/pages/anActivityPreheatHeroList/";
            GB.utils.callCustomMethod("openUrl", {
                url: url ,
                params: {}
            });
        },
        goRule(){
            let url = basePath + "/html/pages/anActivityPreheatRules/";
            GB.utils.callCustomMethod("openUrl", {
                url: url ,
                params: {}
            });
        },
        /**
         * 判断是否登陆，未登录的话，跳转登陆取
         * 1未登录  2已登录
         */
        login(){
            if(this.islogin!=2){
                this.callAppLogin();
                return false;
            }
            return true;
        },
        /**
         * 登录
         */
        callAppLogin() {
            this.user.callAppLogin();
        },
        /**
         * 增加机会
         */
        add(){
            var scroll_offset = $(".footer-body").offset();
            var scroll=scroll_offset.top-100;
            $("body,html").animate({ 
                scrollTop:scroll //让body的scrollTop等于pos的top，就实现了滚动 
            },0);
        },
        /**
         * 开始答题
         */
        goAnswer(e){
            let that = this
            let isflag = this.login();
            if(!isflag){
                return;
            }
            that.trackHeatMap(e);
            if(this.datas.availableAnswerNum>0){//有答题机会,跳转答题页面
                that.startTest();
            }else{
                if(this.datas.answerSurplusCount>0||this.datas.dailyReceiveTimes>0||this.datas.investeReceiveTimes>0||this.datas.invitateReceiveTimes>0){//还有机会
                    GB.utils.htoast('现在没有机会哦，来增加机会吧');
                }else{//没有机会了
                    GB.utils.htoast('今天没有机会了哦，积累明天的机会吧');
                }
                setTimeout(function(){
                    that.add();
                },500)
            }
        },
        /**
         * 开始答题接口
         */
        startTest(){
            let that = this
            let param = {
                actCode:actCode,
                telephone:that.telephone,
                sessionId:that.sessionid,
            }
            startTest(param).then(res=>{
                let resData = res.data;
                if(resData.code=='0000'){
                    let {paperCode} = resData.data;
                    let {questionNo} = resData.data;
                    let url = `${basePath}/html/pages/anActivityAnswer/?paperCode=${paperCode}&questionId=${questionNo}`
                    GB.utils.callCustomMethod("openUrl", {
                        url: url ,
                        params: {}
                    });
               }else{
                   if(resData.code=='0000007'){
                       GB.utils.htoast('在答试卷已超时');
                        this.$emit('getdata',true)
                   }else{
                       GB.utils.htoast(resData.msg);
                   }
                }
            })
        },
        /**
         * 领取次数
         */
        getCount(count,type){
            let that = this
            let isflag = this.login();
            if(!isflag){
                return;
            }
            let param = {
                actCode:actCode,
                receiveCount:count,
                receiveType:type,
                telephone:that.telephone,
                sessionId:that.sessionid,
            }
            getChange(param).then(res=>{
                let resData = res.data
                if(resData.code=='0000'){
                    GB.utils.htoast('机会领取成功');
                    this.$emit('getdata',true)
                }else{
                    GB.utils.htoast(resData.msg);
                }
            })
        },
        /**
         * 去投资
         */
        goInvestment(){
            let isflag = this.login();
            if(!isflag){
                return;
            }
            GB.utils.callCustomMethod('showProductTab', {tabIndex:1})
        },
        /**
         * 埋点
         */
        trackHeatMap(e){
            this.$sa.quick('trackHeatMap', e.currentTarget) 
        }
    },
    beforeMount() {

    }
};
</script>
<style lang="less"  scoped>
@import "../../../../statics/less/base/method.less";
@font-face {
  font-family: "DINBlack";
  src: url("../../../assets/DINBlack.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
}
.fontFamily{
    font-family: "DINBlack";
}
.fontFamily(){
    font-family: "DINBlack";
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
  background-image: url("./../res/@{file}");
}
[v-cloak] {
  display: none !important;
}
// 跳转下一页
.jump{
    display: inline-block;
    .bg-img('Jump.png',10,18);
}
//黑体字提示
.tip{
    color: #391543;
    .px2rem(margin-bottom,24);
    font-weight: 700;
}
//查看详情跳转提示文字
.go-reward{
    .px2px(font-size,26);
    .px2rem(margin-right,10);
    color: #FFFFFF;
    text-shadow: 0 2px 0 #0073CC;
}
// 圆角
.radius2(){
    .px2rem(border-radius,2);
}
.borderWidth(){
    .px2px(border-width,4);
}
//androw
.androw{
    border: 1px solid transparent;
    box-sizing:border-box;
}
//特殊字體
.bgs-img{
    .fontFamily();
    .px2rem(font-size,80);
    .px2rem(line-height,98);
    color: #FDE8E6;
}
.fw{
    font-weight: 700;
}
.title{
    color: #450A2D;
    font-weight: 700;
    .pa();
    .px2rem(top,52);
    .px2rem(line-height,40);
    span{
        color: #FA4B2F;
    }
}
.inActivity {
    background: #044DAE url(./../res/kuang.png) repeat;
    background-size:15px 15px;
    font-family: PingFang-SC-Regular;
    height: 100%;
    .px2rem(font-size,28);
    color: #40404B;
    .header-content{
        .bg-img("header.png",750,920);
        .pr();
        .rules{
            box-sizing: border-box;
            background: #021FA3;
            border: 4px solid #391543;
            .px2px(font-size,28);
            .px2rem(width,210);
            .px2rem(height,70);
            .borderWidth();
            .px2rem( border-top-left-radius,35);
            .px2rem( border-bottom-left-radius,35);
            .pa();
            .px2rem(top,380);
            right: 0;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .answer-detail-h5{
            .pa();
            .px2rem(bottom,-116);
            .px2rem(left,40);
            .px2rem(width,670);
            .px2rem(height,540);
            .px2rem(border-radius,2);
            background: #021FA3;
            .answer-content{
                overflow: hidden;
                .pa();
                .px2rem(bottom,20);
                .px2rem(left,20);
                box-sizing: border-box;
                .px2rem(width,630);
                .px2rem(height,540);
                background: #FFFFFF;
                border: 4px solid #391543;
                .borderWidth();
                .px2rem(border-radius,2);
                .content-top{
                    display: flex;
                    justify-content: space-between;
                     .px2rem(margin-top,10);
                    li{
                        .px2rem(width,307);
                        .px2rem(height,230);
                        box-sizing: border-box;
                        background: #0688ED;
                        border: 4px solid #391543;
                        .borderWidth();
                        .px2rem(border-radius,2);
                         text-align: center;
                        .num{
                            .px2rem(margin-top,20);
                            .px2rem(font-size,62);
                            .px2rem(line-height,74);
                            color: #FFFFFF;
                            text-shadow: 0 2px 0 #0172C9;
                            // font-weight: 700;
                        }
                    }
                    li:first-child{
                        border-left: none;
                        // border-top: none;
                    }
                    li:last-child{
                        border-right: none;
                        // border-top: none;
                    }
                }
                .content-middle{
                    .px2rem(height,100);
                    background: #4DCDCF;
                    border-bottom: 4px solid #391543;
                    .borderWidth();
                    .px2rem(border-radius,2);
                    .px2rem(padding-left,30);
                    .px2rem(padding-right,30);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .content-middle-tip{
                        margin-bottom: 0;
                    }
                    .content-middle-right{
                        margin-left: auto;
                    }
                    .ranking{
                        .px2rem(font-size,62);
                        color: #FFFFFF;
                        text-shadow: 0 2px 0 #25AAAD;
                    }
                    .ranking-not{
                        color: #FFFFFF;
                        text-shadow: 0 2px 0 #25AAAD;
                    }
                    .go-hero{
                        text-shadow: 0 2px 0 #39B6B8 !important;
                    }
                }
                .line-img{
                    .bg-img("stripe.png",630,20);
                    .px2rem(margin-top,10);
                }
                .start-answer{
                    .px2rem(margin-top,38);
                    .start-btn{
                        margin:0 auto;
                        .bg-img("start-answer.png",240,90);
                    }                    
                }
            }
        }
    }
    .article-body{
        .px2rem(width,700);
        .px2rem(height,760);
        .pr();
        background: #021FA3;
        .radius2();
        margin: 0 auto;
        .px2rem(margin-top,186);
        .reward{
            .px2rem(width,700);
            .px2rem(height,760);
            .pa();
            background: #FFFFFF;
            .px2rem(bottom,20);
            .px2rem(left,20);
            .radius2();
            .reward-title{
                .px2rem(padding-left,26);
                .px2rem(padding-top,10);
                .px2rem(padding-bottom,26);
                .pr();
            }
            .reward-list{
                li{
                    .px2rem(margin-bottom,30);
                    .px2rem(margin-right,30);
                    .px2rem(margin-left,30);
                    display: flex;
                    align-items:center;
                    // .px2rem(margin-top,30);
                    .iconImg{
                        .px2rem(margin-right,18);
                        img{
                            .px2rem(width,120);
                            .px2rem(height,120);
                            display: block;
                        }
                    }
                    .iconText{
                        .px2rem(font-size,28);
                        span{
                            font-weight: bold;
                            color: #FA4B2F
                        }
                    }
                }
            }
        }
        
    }
    .footer-body{
        .px2rem(width,700);
        .px2rem(height,570);
        .pr();
        background: #021FA3;
        .radius2();
        margin: 0 auto;
        .px2rem(margin-top,70);
        .add-opportunity{
            .px2rem(width,700);
            .px2rem(height,570);
            .pa();
            background: #FFFFFF;
            .px2rem(bottom,20);
            .px2rem(right,20);
            .radius2();
            .opportunity-title{
                .px2rem(padding-left,50);
                .px2rem(padding-top,10);
                .px2rem(padding-bottom,40);
                .pr();
            }
            .opportunity-list{
                .px2rem(padding-left,50);
                .px2rem(padding-right,30);
                li{
                    display: flex;
                    align-items: center;
                    .px2rem(margin-bottom,56);
                    .serial-num{
                        .px2rem(width,42);
                        .px2rem(height,42);
                        .px2rem(line-height,42);
                        .px2rem(font-size,32);
                        border-radius: 50%;
                        color: #FFFFFF;
                        text-align: center;
                    }
                    .one{
                        background: #F03012;
                        box-shadow: 2px 2px 0 0 #FEC5BC;
                    }
                    .two{
                        background: #4DCDCF;
                        box-shadow: 2px 2px 0 0 #99EBEC;
                    }
                    .three{
                        background: #0688ED;
                        box-shadow: 2px 2px 0 0 #82C8FF;
                    }
                    .list-title{
                        .px2rem(margin-left,14);
                        .px2rem(margin-right,26);
                        .px2rem(width,360);
                    }
                    .list-btn{
                        .bg-img('red-btn.png',178,80);
                        color: #FFFFFF;
                        text-align: center;
                        .px2rem(line-height,74);
                    }
                    // 未领取
                    .not-btn{
                        .bg-img('not-btn.png',178,80);
                    }
                }
            }
        }
    }
    .footer-img{
        .px2rem(margin-top,20);
        .px2rem(margin-right,20);
        .px2rem(margin-bottom,10);
        .bg-img('bottom.png',726,136);
    }
}
/* iphone5 */
@media screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2){
 .index-page .middle .whiteContent .iconAll{
   .px2rem(margin-top,20);
 }
}


@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .bottom {
       padding-bottom: 60px !important;
  }
}
//iphone Xs Max
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
 .bottom {
      padding-bottom: 60px !important;
  }
}
//iphone XR
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
 .bottom {
     padding-bottom: 60px!important;
  }
}
</style>