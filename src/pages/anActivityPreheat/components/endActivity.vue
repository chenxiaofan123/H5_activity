<template>
    <div class='inActivity' v-cloak>
        <header class="header-body">
            <div class="rules" @click="goRule()">活动细则</div>
        </header> 
        <article class="article-body">
            <div class="article-top">
                <!-- 答题情况 -->
                <div class="answer-ending">
                    <div class="answer-ending-content">
                        <div class="answer-num">
                            <p class="tip">你的当前排名：</p>
                            <p class="mrAuto ml10 num-text" v-if='datas.totalCorrectNum<=0'>当前暂无排名</p>
                            <p class="num mrAuto ml10 fontFamily" v-else>{{datas.curRank|formateNotData}}</p>
                            <div @click='goHeroList'>
                                <span class="go-reward">查看排名</span><span class="jump"></span>
                            </div>
                        </div>
                        <div class="answer-num answer-ranking">
                            <p class="tip">累计答对题数：</p>
                            <p class="numrank mrAuto ml10 fontFamily">{{datas.totalCorrectNum|formateNotData}}</p>
                            <div @click='goMyAward'>
                                <span class="go-hero-list">我的奖励</span><span class="jump"></span>
                            </div>
                        </div>
                        <div class="line-img"></div>
                        <div class="my-reward">
                            <!-- 有奖励的情况下 -->
                            <!-- v-if='islogin==2 && datas && datas.gainRewardList&&datas.gainRewardList.length>0' -->
                            <div v-if='islogin==2&&datas.curRank!=0'>
                                <p class="tip">恭喜你获得：</p>
                                <ul class="reward-list">
                                    <li class="blue androw" v-if='!datas.bigReward&&datas.curRank<=1000'>华为P30 抽奖机会</li>
                                    <li class="androw" v-if='datas&&datas.gainRewardList' v-for="(item,index) in datas.gainRewardList" :class="{'blue':item.rewardType==4,'green':item.rewardType==2,'red':item.rewardType==3}">
                                        <span v-show="item.rewardType!=3">{{item.rewardDesc}}</span>
                                        <span v-show="item.rewardType==3">{{item.rewardDesc|splittext}}</span>
                                    </li>
                                </ul>
                            </div>
                             <!-- 没有奖励 -->
                             <div class='mb24' v-else>
                                 <p class="tip">华为P30花落谁家？CEO现场为你揭晓！</p>
                             </div>
                        </div>
                        <div class="live-broadcast">
                            <!-- 未开始 -->
                            <div class="not-begun" v-if='isLiveTime==1'>
                                <div class="not-begun-text">
                                    <p>直播抽奖即将开始…</p>
                                </div>
                            </div>
                            <!-- 直播进行中 -->
                            <div class="not-begun-ing" v-else-if='isLiveTime==2' @click='goTv'>
                                <div class="mask">
                                    <img src="./../res/play.png" alt="" class="play">
                                    <p class="tip-text">直播抽奖中</p>
                                </div>
                            </div>
                            <!-- 直播结束 -->
                            <div class="not-begun-ing"  v-else-if='isLiveTime==3'  @click='goTv'>
                                <div class="mask">
                                    <img src="./../res/play.png" alt="" class="play">
                                    <p class="tip-text">回顾直播现场</p>
                                </div>
                            </div>
                            <div class="remind" v-show='isLiveTime==1'>
                                <span class="remind-tip">距直播开始</span>
                                <span class="remind-time">{{hours|formateTwoCell}}</span>
                                <span class="remind-colon">:</span>
                                <span class="remind-time">{{minutes|formateTwoCell}}</span>
                                <span class="remind-colon">:</span>
                                <span class="remind-time mr">{{seconds|formateTwoCell}}</span>
                                <span  class="remind-btn-setting" v-text="{1:'取消提醒',2:'提醒我看直播'}[isRemind]" @click='setRemind'></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 英雄榜 -->
            <div class="article-herolist">
                <div class="title-awards">
                    <div class="leftbox">排名</div>
                    <div class="middlebox">用户ID</div>
                    <div class="rightbox">活动大奖</div>
                </div>
                <ul class="awards-list">
                    <li class="title-awards list-items p30-award" v-if='bigRewardData'>
                        <div class="leftbox">
                            <img src="./../res/p30.png" alt="">
                        </div>
                        <div class="middlebox">
                            <span class="text">{{bigRewardData.telephone}}</span>
                        </div>
                        <div class="rightbox">
                            <span class="text">{{bigRewardData.rewardDesc}}</span>
                        </div>
                    </li>
                    <!-- 第一名 -->
                    <li class="title-awards list-items list-items-three" v-if='heroListDataOne'>
                        <div class="leftbox">
                            <img src="./../res/one.png" alt="">
                            <span class="Ranking-num">1</span>
                        </div>
                        <div class="middlebox">
                            <span class="text">{{heroListDataOne.telephone}}</span>
                        </div>
                        <div class="rightbox">
                            <p class="rightbox-text" v-for='(item,index) in heroListDataOne.rewardList' :key='index' :class="{'mr30':index==0}">{{item.rewardDesc}}</p>
                            <!-- <p class="rightbox-text mr30">2000元现金红包</p>
                            <p class="rightbox-text">5%加息券</p> -->
                        </div>
                    </li>
                    <!-- 第二名 -->
                    <li class="title-awards list-items list-items-three" v-if='heroListDataTwo'>
                        <div class="leftbox">
                            <img src="./../res/two.png" alt="">
                            <span class="Ranking-num">2</span>
                        </div>
                        <div class="middlebox">
                            <span class="text">{{heroListDataTwo.telephone}}</span>
                        </div>
                        <div class="rightbox">
                             <p class="rightbox-text" v-for='(item,index) in heroListDataTwo.rewardList' :key='index' :class="{'mr30':index==0}">{{item.rewardDesc}}</p>
                            <!-- <p class="rightbox-text mr30">2000元现金红包</p>
                            <p class="rightbox-text">5%加息券</p> -->
                        </div>
                    </li>
                    <!-- 第三名 -->
                    <li class="title-awards list-items list-items-three" v-if='heroListDataThree'>
                        <div class="leftbox">
                            <img src="./../res/three.png" alt="">
                            <span class="Ranking-num">3</span>
                        </div>
                        <div class="middlebox">
                            <span class="text">{{heroListDataThree.telephone}}</span>
                        </div>
                        <div class="rightbox">
                            <p class="rightbox-text" v-for='(item,index) in heroListDataThree.rewardList' :key='index' :class="{'mr30':index==0}">{{item.rewardDesc}}</p>
                            <!-- <p class="rightbox-text mr30">2000元现金红包</p>
                            <p class="rightbox-text">5%加息券</p> -->
                        </div>
                    </li>
                    <!-- 4-10名 -->
                    <li class="title-awards list-items" v-if='heroListDataOther&&heroListDataOther.length>0'  v-for='(item,index) in heroListDataOther' :key='index'>
                        <div class="leftbox">
                            <div class="ranking">{{item.rank}}</div>
                        </div>
                        <div class="middlebox">
                            <span class="text">{{item.telephone}}</span>
                        </div>
                        <div class="rightbox">
                            <span class="text">{{item.rewardList?item.rewardList[0].rewardDesc:''}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </article>
        <div class="footer-img"></div> 
    </div>
</template>
<script>
import User from "../../../service/common/User";
import shareModal from "./shareModal.vue";
import {getLiveBroadcastTime} from '../../../service/pages/apollo/service.js'
import {actCode,heroList} from '../../../service/pages/anActivityAnswer/service.js'
import moment from 'moment'
var content =  basePath+"/html/pages/anActivityPreheatCalendar/?t=1";
var datetimer = new Date();
// var calenderParam = {
//     title: "活动：12：30开始黄金钱包抽奖直播6月21日",
//     content: content,
//     startTime:"2019-06-21 12:30:00",
//     endTime:"2019-06-21 12:35:00",
//     remindTime:"2019-06-21 12:25:00"
// }
// let paramcacel = {
//     title: "活动：12：30开始黄金钱包抽奖直播6月21日",
//     startTime:"2019-06-21 12:30:00",
//     endTime:"2019-06-21 12:35:00",
// };
export default {
    data() {
        return {
            user: new User(),
            hours:'--',
            minutes:'--',
            seconds:'--',
            isLiveTime:-1,//1 直播未开始  2直播中  3直播结束
            heroListDataOne:null,//第一名英雄榜
            heroListDataTwo:null,//第二名英雄榜
            heroListDataThree:null,//第三名英雄榜
            heroListDataOther:null,//4-10英雄榜
            bigRewardData:null,//p30
            isRemind:0,//1提醒  2未提醒
            liveBeginTime:null,//直播开始时间
            calenderParam:null,
            paramcacel:null
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
    },
    watch: {
        datas(val){
            if(!val){
                return;
            }
            // //计算倒计时时间差
            // var that = this;
            // that.getLiveBroadcastTime(function(endTime){
            //     var begintime = Date.parse(new Date(val.curTime.replace(/-/g, "/"))); //倒计时开始
            //     var endtime = Date.parse(new Date(endTime.replace(/-/g, "/")));   // 倒计时结束
            //     var date3 = endtime - begintime;
            //     var timer = null;
            //     timer = window.setInterval(function(){
            //         if(date3<=0){
            //             window.clearInterval(timer);
            //             return;
            //         }
            //         date3 = date3-1000;
            //         //计算出小时数
            //         var hours=Math.floor(date3/(3600*1000))
            //         //计算相差分钟数
            //         var leave2=date3%(3600*1000)        //计算小时数后剩余的毫秒数
            //         var minutes=Math.floor(leave2/(60*1000))
            //         //计算相差秒数
            //         var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
            //         var seconds=Math.round(leave3/1000)
            //         that.hours = hours;
            //         that.minutes = minutes;
            //         that.seconds = seconds;
            //         // console.log(" 相差 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
            //     },1000); 
            // });
                       
        }
    },
    filters: {
        splittext: function (value) {
            return value.slice(0,-2);
        }
    },
    components: {
        shareModal
    },
    methods: {
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
             * 跳转我的奖励
             */
            goMyAward(){
                let isflag = this.login();
                if(!isflag){
                    return;
                }
                // location.href = basePath + "/html/pages/anActivityPreheatMyAward/";
                let url = basePath + "/html/pages/anActivityPreheatMyAward/";
                GB.utils.callCustomMethod("openUrl", {
                    url: url ,
                    params: {}
                });
            },
            /**
             * 跳转英雄榜
             */
            goHeroList(){
                let url = basePath + "/html/pages/anActivityPreheatHeroList/";
                GB.utils.callCustomMethod("openUrl", {
                    url: url ,
                    params: {}
                });
            },
            /**
             * 跳转规则
             */
            goRule(){
                let url = basePath + "/html/pages/anActivityPreheatRules/";
                GB.utils.callCustomMethod("openUrl", {
                    url: url ,
                    params: {}
                });
            },
            /**
             * 跳转钱包学院
             */
            goTv(){
                // location.href = webV2Path+"/html/pages/headerLive/"
                let url = webV2Path+"/html/pages/headerLive/"
                GB.utils.callCustomMethod("openUrl", {
                    url: url ,
                    params: {}
                });
            },
            /**
             * 查询提醒
             */
            getRemindStatus(){
                let that = this;
                clientInit.done(function() {
                    GB.utils.callCustomMethod("queryCalendarEvent", that.calenderParam, function(
                        responseData
                    ) {
                        let responseDatas = JSON.parse(responseData);
                        if (!responseDatas.result) {
                            that.isRemind = 2
                        }else{
                            that.isRemind = 1
                        }
                    });
                })
            },
            /**
             * 取消提醒
             */
            cancleRemind(){
                let that = this;
                GB.utils.callCustomMethod("removeCalendarEvent", that.paramcacel, function(
                    responseData
                ) {
                    let responseDatas = JSON.parse(responseData);
                    if (responseDatas.result) {
                        that.isRemind = 2;
                        GB.utils.htoast('提醒已取消！');
                    }
                });
            },
            /**
             * 设置提醒
             */
            remindMe(){
                let that = this;
                let param = that.calenderParam;
                GB.utils.callCustomMethod("addCalendarEvent", param, function(
                    responseData
                ) {
                    let responseDatas = JSON.parse(responseData);
                    if (responseDatas.result) {
                        that.isRemind = 1;
                        GB.utils.htoast('提醒添加成功！');
                    }
                });
            },
            /**
             * 提醒按钮
             */
            setRemind(){
                if(this.isRemind==1){
                    this.cancleRemind();
                }else if(this.isRemind==2){
                    this.remindMe();
                }
            },
            
            /**
             * 获取直播开始结束时间
             */
            getLiveBroadcastTime(cb){
                let that = this
                let param = {}
                getLiveBroadcastTime().then(res=>{
                    let resData = res.data;
                    if(resData.code=='0000'){
                        cb&&cb(resData.data.startTime);//制作页面倒计时
                        let nowTime = Date.parse(new Date());//当前时间
                        let begintime = Date.parse(new Date(resData.data.startTime.replace(/-/g, "/"))); //直播开始时间
                        let endtime = Date.parse(new Date(resData.data.endTime.replace(/-/g, "/")));   // 直播结束时间
                        if(nowTime<begintime){//直播未开始
                            that.isLiveTime = 1;
                        }else if(nowTime>endtime){//直播已经结束
                            that.isLiveTime = 3;
                        }else{//直播进行中
                            that.isLiveTime = 2;
                        }
                        //1. 提醒結束
                        var remindEnd=new Date(resData.data.startTime.replace(/-/g, "/"));
                        var minadd=remindEnd.getMinutes();
                        remindEnd.setMinutes(minadd+5);
                        //2.提醒時間
                        var remindRemind=new Date(resData.data.startTime.replace(/-/g, "/"));
                        var minRemind=remindRemind.getMinutes();
                        remindRemind.setMinutes(minRemind-5);
                        that.calenderParam = {
                            title:resData.data.remindTitle,
                            content:content,
                            startTime:resData.data.startTime,
                            // endTime:moment(remindEnd).format('YYYY-MM-DD HH:mm:ss'),
                            endTime:resData.data.endTime,
                            remindTime:moment(remindRemind).format('YYYY-MM-DD HH:mm:ss'),
                        } 
                        that.paramcacel = {
                            title:resData.data.remindTitle,
                            startTime:resData.data.startTime,
                            // endTime:moment(remindEnd).format('YYYY-MM-DD HH:mm:ss'),
                            endTime:resData.data.endTime
                            
                        }
                        that.getRemindStatus();
                        console.log(that.calenderParam)
                        console.log(that.paramcacel)
                        console.log('提醒結束時間')
                    }else{
                        GB.utils.htoast(resData.msg);
                    }
                })
            },
            /**
             * 获取英雄榜
             */
            getHeroList(){
                let that = this
                let param = {
                    actCode:actCode,
                    size:10,
                    specialRank:null,
                }
                heroList(param).then(res=>{
                    let resData = res.data;
                    if(resData.code=='0000'){
                        that.heroListData = resData.data.heroList;
                        that.bigRewardData = resData.data.bigReward;
                        var heroListDataOtherArr = [];
                        resData.data.heroList.forEach(ele=>{
                            if(ele.rank==1){
                                that.heroListDataOne = ele;
                            }
                            else if(ele.rank==2){
                                that.heroListDataTwo = ele;
                            }
                            else if(ele.rank==3){
                                that.heroListDataThree = ele;
                            }
                            else{
                                heroListDataOtherArr.push(ele);
                            }
                        })
                        that.heroListDataOther = heroListDataOtherArr;
                        //计算倒计时时间差
                        that.getLiveBroadcastTime(function(startTime){
                            var begintime = resData.serverTime; //当前时间---倒计时开始时间
                            var endtime = Date.parse(new Date(startTime.replace(/-/g, "/"))); // 直播开始时间----倒计时结束时间
                            var date3 = endtime - begintime;
                            var timer = null;
                            if(date3<=0){
                                return;
                            }
                            timer = window.setInterval(function(){
                                date3 = date3-1000;
                                if(date3<=0){
                                    that.isLiveTime = 2;
                                    window.clearInterval(timer);
                                    return;
                                }
                                //计算出小时数
                                var hours=Math.floor(date3/(3600*1000))
                                //计算相差分钟数
                                var leave2=date3%(3600*1000)        //计算小时数后剩余的毫秒数
                                var minutes=Math.floor(leave2/(60*1000))
                                //计算相差秒数
                                var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
                                var seconds=Math.round(leave3/1000)
                                that.hours = hours;
                                that.minutes = minutes;
                                that.seconds = seconds;
                                // console.log(" 相差 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
                            },1000); 
                        });
                    }else{
                        GB.utils.htoast(resData.msg);
                    }
                })
            },
    },
    mounted() {
        this.getHeroList();
        clientInit.done(function() {
			GB.utils.callCustomMethod("setTopRightButton", {
				title: ""
			});
		});
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
//androw
.androw{
    border: 1px solid transparent;
    box-sizing:border-box;
}
// 跳转下一页
.jump{
    display: inline-block;
    .bg-img('Jump.png',10,18);
}
//黑体字提示
.tip{
    color: #391543;
    font-weight: 700;
}
//查看详情跳转提示文字
.go-reward{
    .px2rem(font-size,26);
    .px2rem(margin-right,10);
    color: #FFFFFF;
    text-shadow: 0 2px 0 #39B6B8;
}
.go-hero-list{
    .px2rem(font-size,26);
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
//特殊字體
.bgs-img{
    .fontFamily();
    .px2rem(font-size,80);
    .px2rem(line-height,98);
    color: #FDE8E6;
}
.mrAuto{
    margin-right: auto;
}
.ml10{
    .px2rem(margin-left,10);
}
.mb24{
    .px2rem(margin-bottom,24);
}
.title{
    color: #450A2D;
    font-weight: 700;
    .pa();
    .px2rem(top,60);
    .px2rem(line-height,40);
    span{
        color: #FA4B2F;
    }
}

.num{
    .px2rem(font-size,62);
    // .px2rem(line-height,74);
    color: #FFFFFF;
    text-shadow: 0 2px 0 #25AAAD;
    // font-weight: 700;
}
.num-text{
    .px2rem(font-size,28);
    // .px2rem(line-height,74);
    color: #FFFFFF;
    text-shadow: 0 2px 0 #25AAAD;
    // font-weight: 700;
}
.numrank{
    .px2rem(font-size,62);
    color: #FFFFFF;
    text-shadow: 0 2px 0 #0172C9;
    font-weight: 700;
}
.inActivity {
    background: #044DAE url(./../res/kuang.png) repeat;
    background-size:15px 15px;
    font-family: PingFang-SC-Regular;
    height: 100%;
    .px2rem(font-size,28);
    color: #40404B;
    .header-body{
        .bg-img("header.png",750,920);
        .pa();
        top: 0;
        .rules{
            .px2px(font-size,28);
            box-sizing: border-box;
            background: #021FA3;
            border: 4px solid #391543;
            .px2rem(width,210);
            .px2rem(height,70);
            .px2rem(border-width,4);
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

    }
    // 直播统计
    .article-top{
        .px2rem(margin-top,498);
        .answer-ending{
            .pr();
            .radius2();
            .px2rem(width,670);
            background: #021FA3;
            .answer-ending-content{
                overflow: hidden;
                .pr();
                .px2rem(bottom,20);
                .px2rem(padding-bottom,60);
                .px2rem(left,20);
                box-sizing: border-box;
                .px2rem(width,630);
                // .px2rem(height,904);
                background: #FFFFFF;
                border: 4px solid #391543;
                .borderWidth();
                .radius2();
                .answer-num{
                    .px2rem(height,100);
                    .px2rem(padding-left,30);
                    .px2rem(padding-right,30);
                    .px2rem(margin-bottom,10);
                    background: #4DCDCF;
                    border-bottom: 4px solid #391543;
                    box-sizing: border-box;
                    .borderWidth();
                    .radius2();
                    display: flex;
                    // justify-content: space-between;
                    align-items: center;
                }
                .answer-ranking{
                    background:  #0688ED;
                    border-top: 4px solid #391543;
                    .borderWidth();
                    margin-bottom:0;
                }
                .line-img{
                    .bg-img("stripe.png",630,20);
                }
                .my-reward{
                    .px2rem(padding-left,30);
                    .px2rem(padding-top,6);
                    .px2rem(padding-right,30);
                    .tip{
                        .px2rem(margin-bottom,6);
                    }
                    .reward-list{
                        .clearfix();
                        li{
                            .px2rem(border-radius,4);
                            .px2rem(margin-bottom,12);
                            .px2rem(margin-right,10);
                            .px2rem(height,58);
                            .px2rem(line-height,58);
                            text-align: center;
                            color: #FFFFFF;
                            // display: flex;
                            // align-items: center;
                            // justify-content: center;
                            font-weight: 700;
                            float: left;
                        }
                        .red{
                            .px2rem(width,210);
                            background: #F03012;
                        }
                        .blue{
                            background: #0688ED;
                            // width: auto;
                            .px2rem(padding-left,30);
                            .px2rem(padding-right,30);
                        }
                        .green{
                            .px2rem(width,210);
                            background: #4DCDCF;
                        }
                    }
                }
                .live-broadcast{
                    .px2rem(margin-top,12);
                    .px2rem(padding-left,16);
                    .px2rem(padding-right,16);
                    .not-begun{
                        .px2rem(width,590);
                        .px2rem(height,326);
                        box-sizing: border-box;
                        background: #021FA3;
                        border: 4px solid #391543;
                        .borderWidth();
                        .px2rem(border-radius,10);
                        text-align: center;
                        .pr();
                        img{
                            .px2rem(width,184);
                            .px2rem(height,184);
                            .px2rem(margin-top,60);
                        }
                        .not-begun-text{
                            .pa();
                            top: 50%;
                            left:50%;
                            transform: translate(-50%,-50%);
                            .bg-img('no-start.png',590,326);
                            width: 100%;
                            .px2rem(line-height,326);
                            p{
                                .px2rem(font-size,32);
                                // .px2rem(line-height,42);
                                color: #FFFFFF;
                                letter-spacing: 1px;
                            }
                        }
                    }
                    .not-begun-ing{
                        .px2rem(width,590);
                        .px2rem(height,326);
                        // .px2rem(border-radius,10);
                        // border: 4px solid #391543;
                        // .borderWidth();
                        .bg-img('zhiboing.png',590,326);
                        box-sizing: border-box;
                        .mask{
                            width:100%;
                            height: 100%;
                            // background: rgba(0,0,0,0.6);
                            .px2rem(border-radius,10);
                            text-align: center;
                            .play{
                                .px2rem(width,80);
                                .px2rem(height,80);
                                .px2rem(margin-top,96);
                                .px2rem(margin-bottom,20);
                                vertical-align: middle;
                            }
                            .tip-text{
                                .px2rem(font-size,32);
                                .px2rem(line-height,42);
                                color: #FFFFFF;
                                letter-spacing: 2px;
                                text-align: center;
                            }
                        }
                    }
                    .remind{
                        .px2rem(margin-top,24);
                        .px2rem(padding-left,10);
                        .px2rem(padding-right,10);
                        .px2rem(font-size,26);
                        .px2rem(height,72);
                        color: #391543;
                        display: flex;
                        align-items: center;
                        .remind-tip{
                            .px2rem(margin-right,6);
                            font-weight: 700;
                        }
                        .remind-time{
                            // .px2rem(padding-left,6);
                            // .px2rem(padding-right,6);
                            .px2rem(width,44);
                            text-align: center;
                            .px2rem(height,40);
                            .px2rem(line-height,40);
                            .px2rem(border-radius,2);
                            background: #C0E3FF;
                            font-weight: 700;
                        }
                        .remind-colon{
                            .px2rem(width,25);
                            .px2rem(height,40);
                            .px2rem(line-height,40);
                            text-align: center;
                        }
                        .mr{
                            margin-right:auto;
                        }
                        .remind-btn-setting{
                            background: url(./../res/remind-btn-setting.png) no-repeat;
                            background-size: 100% 100%;
                            .px2rem(width,218);
                            .px2rem(height,72);
                            line-height:normal; 
                            .px2rem(padding-top,14);
                            color: #450A2D;
                            letter-spacing: 1.37px;
                            text-align: center;
                            font-weight: 700;
                        }
                    }
                }
            }
        }
    }

    // 直播统计
    .article-body{
        overflow: hidden;
        // .px2rem(margin-top,530);
        .px2rem(margin-left,40);
        .px2rem(margin-right,40);
        
        .article-herolist{
            .px2rem(margin-top,50);
            border: 4px solid #391543;
            background: #FFFFFF;
            .borderWidth();
            .radius2();
        }
        // 标题
        .title-awards{
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            background:  #0688ED;
            box-sizing: border-box;
            .px2rem(height,100);
            div{
                .px2rem(height,100);
                .px2rem(line-height,100);
                .px2rem(font-size,28);
                .px2rem(letter-spacing,1);
                color: #391543;
                border: 4px solid #391543;
                .borderWidth();
                border-top: none;
                box-sizing: border-box;
            }
            .text{
                color: #391543;
            }
            .leftbox{
                .px2rem(width,140);
                border-left: none;
                display: flex;
                align-items: center;
                justify-content: center;
                .pr();
                // 前三名
                img{
                    .px2rem(width,86);
                    .px2rem(height,78);
                }
                // 第四名以后
                .ranking{
                    box-sizing: border-box;
                    .px2px(width,60);
                    .px2px(height,60);
                    .px2px(line-height,46);
                    .px2px(padding-top,4);
                    // .px2rem(width,60);
                    // .px2rem(height,60);
                    // .px2rem(line-height,60);
                    .px2px(font-size,38);
                    border-radius: 50%;
                    background: #4DCDCF;
                    border: 4px solid #391543;
                    .borderWidth();
                    box-shadow: 2px 2px 0 0 #A6E3E4, inset 1px 2px 0 0 #FFFFFF;
                    color: #FFFFFF;
                    letter-spacing: 0;
                    text-align: center;
                }
            }
            .middlebox{
                .px2rem(width,240);
            }
            .rightbox{
                .px2rem(width,290);
                border-right: none;
            }
        }
        .awards-list{
            .list-items{
                .px2rem(height,110);
                div{
                    .px2rem(height,110);
                    .px2rem(line-height,110);
                }
                background:  #fff;
                border-bottom: 1px solid #D2C4CB;
                .rightbox,
                .middlebox,
                .leftbox {
                    border: none;
                }
                .rightbox{
                    .px2rem(padding-left,50);
                    text-align: left;
                    .rightbox-text{
                        .px2rem(line-height,40);
                    }
                    .mr30{
                        .px2rem(margin-top,30);
                    }
                }
                // 前三名
                .Ranking-num{
                    .pa();
                    top:50%;
                    left: 50%;
                    transform: translate(-50%,-49%);
                    color: #fff;
                    .px2rem(font-size,32);
                    font-weight: 700;
                }
            }
            // p30手机榜单
            .p30-award{
                .px2rem(height,140);
                background: #FB6D17;
                div{
                    .px2rem(height,140);
                    .px2rem(line-height,140);
                }
                .leftbox{
                    img{
                        .px2rem(width,80);
                        .px2rem(height,90);
                    }
                }
                .middlebox,
                .rightbox{
                    .text{
                        .px2rem(font-size,32);
                        color: #FFFFFF;
                    }
                }
            }
            .list-items-three{
                .px2rem(height,140);
                div{
                    .px2rem(height,140);
                    .px2rem(line-height,140);
                }
            }
        }
    }
    .footer-img{
        .px2rem(margin-top,20);
        .px2rem(margin-right,20);
        .px2rem(margin-bottom,20);
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