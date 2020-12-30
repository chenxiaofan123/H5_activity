<template>
    <div class="index-page" v-cloak>
       <header>
           <div class='horn' v-show='winningList.length>0'>
               <div>
                   <ul :style="rollWinningStyle">
                       <li v-for='item in winningList'>{{item.phone}}刚刚获得了{{item |listFilter}}</li>
                   </ul>
               </div>
               </div>
           <div :class="['rule',{'rule-top':winningList.length<=0}]" @click='gotoRule'>活动细则</div>
       </header>
        <div class='invite-history'>
            <h1></h1>
            <div class='invite-persons'>
                <em></em>
                <div @click='gotoIncome'><span>{{reducedUnit(rewardAmount)}}</span><a>已获得收益(元)</a></div>
                <div @click='gotoMyPersons'><span>{{inviteeNum}}</span><a>成功邀请(人)</a></div>
            </div>
        </div>
        <div class='gift-block block1'>
            <h1></h1>
            <p>邀请新用户注册30天内完成<a @click='openInviteInfo'>首次投资<em>?</em></a><span>即可享受现金奖励</span></p>
            <div class='gift-main'>
                <div class='main-top'>
                    <ul>
                        <li><span :class="{'invited-top':inviteRewardNum==1}">第1位好友</span></li>
                        <li><span :class="{'invited-top':inviteRewardNum==2}">第2位好友</span></li>
                        <li><span :class="{'invited-top':inviteRewardNum>2}">更多好友</span></li>
                    </ul>
                </div>
                <div class='main-mid'>
                    <div :class="{'invited-mid':inviteRewardNum==1}">
                        <h1><span>获得权益</span></h1>
                        <div class='coupon'></div>
                    </div>
                    <div :class="{'invited-mid':inviteRewardNum==2}">
                        <h1><span>获得权益</span></h1>
                        <div class='coupon'></div>
                        <span class='add'>+</span>
                        <div :class="{'main-draw':drawStatus==0,'main-draw-open':drawStatus==2,
                        'main-draw-impor':drawStatus==1}" @click='openLuckDraw'></div>
                        <a v-show='drawStatus!=2'>88mg~188mg</a>
                    </div>
                    <div :class="{'invited-mid':inviteRewardNum>2}">
                        <h1><span>获得权益</span></h1>
                        <div class='coupon-more'></div>
                    </div>
                </div>
                <p class='main-bot'>最多可邀请50人</p>
            </div>
        </div>
        <div class='gift-block block2'>
            <h1></h1>
            <div>
                <p>邀请新用户注册后30天内，受邀用户每笔30天及以上的箱底金、安心智选投资、智选月月升，您都可享0.4%的返现。</p>
                <h2><span>举个栗子<em></em></span></h2>
                <img src='./res/block2-img.png'>
            </div>
        </div>
        <div class='gift-block block3'>
            <h1></h1>
            <p>2018年{{month}}月榜单</p>
            <div class='invite-list'>
                <h2><span>当前排名</span><span>获得奖励(元)</span></h2>
                <ul>
                    <li>
                        <div><span>{{myRank}}</span><span>{{myRewardAmount|moneyUnit}}</span></div>
                        <p>我</p>
                    </li>
                    <li v-for='(item, index) in invitelList' v-if='invitelList.length>0'>
                        <div><span>NO.0{{index+1}}</span><span>{{item.rewardAmount|moneyUnit}}</span></div>
                        <p>{{item.phone}}</p>
                    </li>
                </ul>
                <div class='data-empty' v-if='invitelList.length<=0'><img src="./res/cup.png"/><p>暂无数据，快来抢占榜单~</p></div>
                <a @click='gotoPersons'>邀请达人榜</a>
            </div>
        </div>
        <div class='draw-history' @click='gotoHistory()'>历史奖励<a>&raquo;</a></div>
        <footer @click='goShare'>
            <div class='footer-qr' @click.stop='openFrameQr'></div>
            <span>立即邀请<em></em></span>
        </footer>
        <!--弹框-->
        <div class='frame-box' v-show='showFrameBox' @touchmove.prevent>
            <!--首次投资-->
            <div class='frame-main invite-info' v-show='showFrameType == 1'>
                <p>首次投资额≥1000元，且投资期限≥30天的箱底金、安心智选、智选月月升产品。(包含新手特惠产品)</p>
                <div class='btn' @click='closeFrameBox'>我知道了</div>
            </div>
            <!--二维码邀请-->
            <v-qr :showFrameType='showFrameType' :url='url'></v-qr>
            <!--抽奖-->
            <v-luckdraw @closeFrameBox='closeFrameBox' :showFrameType='showFrameType' :telephone='telephone' :sessionId='sessionId'></v-luckdraw>
            <!--关闭按钮-->
            <div class='close-draw' @click='closeFrameBox' v-show='showFrameType == 2 || showFrameType == 3'></div>
        </div>
    </div>
</template>
<script>
    import User from '../../service/common/User';
    import luckDraw from './components/luckDraw.vue'
    import qr from './components/inviteQr'
    import pageVisibility from '../../commonScript/pageVisibility.js'
    import {getCurrentMonthTopList,getPersonPKRewardRank, getUserBasicActInfo,
        getCurrentMonthLastHundredList,actCode,shareCode,actTime} from '../../service/pages/inviteDraw/service.js';

    pageVisibility.visibilitychange(()=>{
        location.reload();
    })
    export default{
        data(){
            return {
                user:new User(),
                rollWinningStyle:{},
                showFrameBox:false,
                showFrameType:0, //1 首次投资信息  2 邀请二维码  3 抽奖弹框
                invitelList:[],
                winningList:[],
                sessionId:'',
                telephone:'',
                inviteeNum:'', //邀请的用户数量
                rewardAmount:'', //获取的收益
                myRank:'暂未上榜',
                myRewardAmount:'',
                drawStatus:0, //是否抽奖
                month:'08',
                actStatus:'',
                inviteRewardNum:'', //点亮红包的数量
                url:''
            }
        },
        watch:{},
        filters:{
            listFilter:function (value) {
                if (!value) return ''
                var reward =''
                var rewardNum = value.rewardAmount/100;
                switch(value.rewardType) {
                    //人气红包
                    case 1:
                        reward = rewardNum+'元人气红包';
                        break;
                    //黄金
                    case 4:
                        reward = value.goldWeight+'毫克黄金';
                        break;
                    //投资返现
                    case 5:
                        reward = rewardNum+'元投资返现';
                        break;
                }
                return reward
            },
            moneyUnit:function (value) {
                if (!value) return '0.00'
                let result = (value/100).toFixed(2);
                return result
            },
        },
        components: {
            "v-luckdraw": luckDraw,
            "v-qr":qr
        },
        mounted(){
            this.getHundredList();
            this.getMonthTopList();
            /*var loading=GB.utils.loading*/
            var that = this
            // 在这里需要判断 是否登录  登录之后之后的状态 来展示
            sessionProObj.getUserInfo((telephone,sessionId)=>{
                /*loading.destroy();*/
                that.telephone=telephone;
                that.sessionId=sessionId;
                if(!telephone){
                    this.inviteeNum = '--';
                    this.rewardAmount= '--'
                    return;
                } else{
                    // 用户登录
                   that.getUserActInfo();
                   that.getmyRewardRank();
                }
                that.getShareInfo(sharebasePath,telephone,shareCode);
            })
        },
        methods:{
            reducedUnit(value) {

                if (!value && !this.telephone){
                    return ''
                }
                if (!value && this.telephone){
                    return '0.00'
                }
                if(value == '--') return '--'
                let result = (value/100).toFixed(2);
                return result
            },
            getShareInfo(path,tel,code ){
                var that = this
                $.getJSON(path + 'info/getShareInfoJsonp?jsoncallback=?', {
                    telephone: tel,
                    code: code,
                    pageUrl: encodeURIComponent(location.href.split('#')[0].toString())
                }, function (_data) {
                    var lineLink = location.href;
                    if (_data.wxurl) {
                        lineLink = _data.wxurl;
                    }
                    that.url = lineLink
                    params['title'] = _data.title;
                    params['imageUrl'] = _data.imageUrl;
                    params['description'] = _data.description;
                    params['url'] = lineLink;
                })
            },
            //获取轮播列表
            getHundredList(){
                let that = this
                var param={
                    actCode:actCode,
                   /* prizeType:prizeType*/
                }
                getCurrentMonthLastHundredList(param).then(res => {
                    let data = res.data;
                    if (+data.code == 0) {
                        that.winningList=data.data.lastRewardList;
                        let length=that.winningList.length;
                        if(length>1){
                            var animdurlTime=length*2;
                            that.rollWinningStyle={
                                "-webkit-animation": "rollUp " + animdurlTime + "s linear infinite",
                                "animation": "rollUp " + animdurlTime + "s linear infinite"
                            }
                        }
                    } else {
                        if (data.msg) {
                            GB.utils.htoast(data.msg);
                        }
                    }
                });
            },
            //获取用户邀请收益信息
            getUserActInfo(){
                let that = this
                var param={
                    actCode:actCode,
                    telephone:this.telephone,
                    sessionId:this.sessionId
                }
                getUserBasicActInfo(param).then(res => {
                    let data = res.data;
                    if (+data.code == 0) {
                        that.rewardAmount = data.data.rewardAmount;
                        that.inviteeNum = data.data.inviteeNum;
                        that.drawStatus = data.data.drawStatus;
                        that.actStatus = data.data.actStatus;
                        that.inviteRewardNum = data.data.inviteRewardNum;
                        console.log(that.rewardAmount);
                        if(that.actStatus == 2){
                            GB.utils.htoast('活动已结束');
                        }
                    } else {
                        if (data.msg) {
                            GB.utils.htoast(data.msg);
                        }
                    }
                });
            },
            //获取我的排名
            getmyRewardRank(){
                let that = this
                var param={
                    actCode:actCode,
                    actTime:actTime,
                    telephone:this.telephone,
                    sessionId:this.sessionId
                }
                getPersonPKRewardRank(param).then(res => {
                    let data = res.data;
                    if (+data.code == 0) {
                        that.myRewardAmount = data.data.rewardAmount;
                        if(data.data.rewardAmount){
                            that.myRank = 'NO.'+data.data.rank;
                        }else {
                            that.myRank ='暂未上榜'
                        }
                    } else {
                        if (data.msg) {
                            GB.utils.htoast(data.msg);
                        }
                    }
                });
            },
            //获取当月前五名的排序
            getMonthTopList(){
                let that = this
                var param={
                    actCode:actCode,
                }
                getCurrentMonthTopList(param).then(res => {
                    let data = res.data;
                    if (+data.code == 0) {
                        that.invitelList = data.data.topList;
                        that.month = data.data.monthStr.split('-')[1];
                    } else {
                        if (data.msg) {
                            GB.utils.htoast(data.msg);
                        }
                    }
                });
            },
            //登录
            callAppLogin() {
                this.user.callAppLogin();
            },
            //活动规则
            gotoRule () {
                location.href=basePath+'/html/pages/inviteNewRule/'
            },
            //我的收益
            gotoIncome () {
                if(this.telephone == ''){
                    this.callAppLogin();
                    return false;
                }
                location.href=basePath+'/html/pages/inviteNewIncome/?telephone='+this.telephone+'&sessionId='+this.sessionId;
            },
            //邀请好友
            gotoMyPersons () {
                if(this.telephone == ''){
                    this.callAppLogin()
                    return false;
                }
                location.href=basePath+'/html/pages/myInviteNew/?telephone='+this.telephone+'&sessionId='+this.sessionId;
            },
            //邀请达人榜
            gotoPersons () {
                location.href=basePath+'/html/pages/inviteNewPersons/'
            },
            //历史邀请
            gotoHistory(){
                var isdev = window.location.href.indexOf('dev.huangjinqianbao.com') > 0 ? true : false;
                var link=isdev ? "https://dev.huangjinqianbao.com/privilege/oldPullNew/indexVersion4.html": "https://static02.huangjinqianbao.com/static/html/app/privilege/oldPullNew/indexVersion4.html";
                if(!this.telephone){
                    this.callAppLogin();
                    return;
                }
                location.href = link;
            },
            openInviteInfo(){
                this.showFrameBox = true
                this.showFrameType = 1
            },
            openFrameQr(){
                if(!this.telephone){
                    this.callAppLogin();
                    return;
                }
                this.showFrameBox = true
                this.showFrameType = 2
            },
            openLuckDraw(){
                if(!this.telephone){
                    this.callAppLogin();
                    return;
                }
                if(this.drawStatus != 1){
                    return;
                }
                this.showFrameBox = true
                this.showFrameType = 3
            },
            closeFrameBox(){
                this.showFrameBox = false
                this.showFrameType = 0
            },
            //邀请按钮
            goShare(){
                if(!this.telephone){
                    this.callAppLogin()
                    return
                }
                    var params_shared = {
                        'type':"1",//分享类型 1：新闻类分享  2：截图分享
                        'code' : shareCode,//活动code，分享统计标示
                        'needLogin' : '1',
                        'platform' : '0',//0:弹出选择平台 1:微信好友 2:微信朋友圈 3：QQ好友 4：QQ空间 5：复制链接
                        'pushShareMark' : '',//是否需要统计用户分享
                    };
                    GB.utils.callCustomMethod("share",params_shared);
            },
        },
        beforeMount() {
            window.scrollTo(0,0);
        }
    }
</script>
<style lang="less"  scoped>
@import '../../../statics/less/base/method.less';
@font-face {
    font-family: 'DIN-Bold';
    src: url('../../assets/DIN-Bold.ttf') format('truetype');
    font-style: normal;
    font-weight: normal;
}
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
.bg-img( @file , @width, @height ) {
    .px2rem(width, @width);
    .px2rem(height, @height);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('./res/@{file}');
}
.common-style{
    .px2rem(width,690);
    margin: 0 auto;
    background: #fff;
    box-shadow: 0 2px 20px 0 rgba(168,120,0,0.40);
    .borderradius1(20);
}
.border(@size,@color){
    @bor:@size/75*1rem;
    border:@bor solid @color;
}
[v-cloak] {
    display: none !important;
}
.index-page{
    background: #FF3A33;
    .px2rem(padding-bottom,268);
    header{
        .bg-img('banner.png',750,643);
        .pr();
        width: 100%;
        .horn{
            .pa();
            .bg-img('horn-bg.png',700,65);
            left: 50%;
            .px2rem(margin-left,-350);
            text-align: center;
            .borderradius1(6);
            color: #FFFFFF;
            letter-spacing: 0.5px;
            .px2rem(padding-top,18);
            .px2rem(padding-bottom,18);
            overflow: hidden;
            .px2rem(top,20);
            >div{
                overflow: hidden;
                height: 100%;
                li{
                    .px2rem(line-height,33);
                    .px2px(font-size,24);
                }
            }
        }
        .rule{
            .pa();
            .border(2,#ffffff);
            border-right-color: transparent;
            .px2rem(border-top-left-radius,40);
            .px2rem(border-bottom-left-radius,40);
            right: 0;
            .px2rem(top,114);
            .px2px(font-size,24);
            color: #FFFFFF;
            .padding(11,20,11,26);
            cursor: pointer;
            &.rule-top{
                .px2rem(top,50);
            }
        }
    }
    .invite-history{
        &:extend(.common-style);
        .pr();
        .px2rem(margin-top,-90);
        .padding(40,88,80,88);
        z-index: 10;
        h1{
         .bg-img('invite-history-title.png',514,70);
         margin: 0 auto;
        }
        .invite-persons{
            .padding(62,15,0,15);
            .clearfix();
            .pr();
            em{
                .pa();
                .px2rem(height,50);
                border-right: 1px solid #D5D5D5;
                .px2rem(top,104);
                left: 50%;
            }
            div{
                float: left;
                text-align: center;
                *{
                    display: block;
                    letter-spacing: 0;
                }
                span{
                    font-family: DIN-Bold;
                    .px2rem(font-size,54);
                    color: #333333;
                    .px2rem(padding-bottom,18);
                    .px2rem(min-height,98);
                }
                a{
                    .px2rem(font-size,24);
                    color: #A8A8A8;
                }
                &:last-child{
                    float: right;
                }
            }
        }
    }
    .gift-block{
        >h1{
            .bg-img('gift-title1.png',498,61);
            margin: 0 auto;
        }
        >div{
            &:extend(.common-style);
        }
        p{
            .px2rem(font-size,26);
            color: #FFFFFF;
            letter-spacing: 0;
            text-align: center;
        }
        &.block1{
            .px2rem(padding-top,91);
            >p{
                .px2rem(width,460);
                margin: 0 auto;
                .px2rem(margin-top,40);
                .px2rem(margin-bottom,41);
                .px2rem(line-height,37);
                a{
                    color: #FFC903;
                    em{
                        display: inline-block;
                        .px2rem(width,24);
                        .px2rem(height,24);
                        text-align: center;
                        .px2rem(line-height,24);
                        border: 1px solid #FFC903;
                        border-radius: 50%;
                        .px2rem(font-size,16);
                        margin-left: 1px;
                        .pr();
                        .px2rem(top,-2);
                    }
                }
                span{
                    display: block;
                }
            }
            .gift-main{
                .px2rem(font-size,24);
                .px2rem(padding-bottom,20);
                text-align: center;
                .main-top{
                    .padding(54,63,44,63);
                    ul{
                        .clearfix();
                        @h:4/75*1rem;
                        border-bottom: @h solid #A8A8A8;
                        li{
                            .pr();
                            .bg-img('boy.png',125,155);
                            float: left;
                            &:nth-child(2){
                                background: url("./res/girl.png");
                                background-size: 100% 100%;
                                .px2rem(margin-left,92);
                                .px2rem(margin-right,92);
                            }
                            span{
                               .pa();
                                background: #A8A8A8;
                                .borderradius1(100);
                                color: #FFFFFF;
                                .px2rem(width,136);
                                .px2rem(height,40);
                                .px2rem(line-height,40);
                                left: 50%;
                                .px2rem(margin-left,-68);
                                .px2rem(bottom,-20);
                                &.invited-top{
                                    background: #F2433D;
                                }
                            }
                        }
                    }
                }
                .main-mid{
                    .clearfix();
                    .padding(6,28,0,30);
                    >div{
                        .pr();
                        float: left;
                        .px2rem(width,190);
                        background: #D0D4DC;
                        .borderradius1(3);
                        .px2rem(padding-top,15);
                        .px2rem(height,247);
                        >*{
                            margin: 0 auto;
                        }
                        &:after{
                            .pa();
                            display: block;
                            content: "";
                            background:#fff;
                            .px2rem(width,24);
                            .px2rem(height,24);
                            .borderradius1(12);
                            .px2rem(top,-16);
                            left: 50%;
                            .px2rem(margin-left,-12);
                        }
                        &:nth-child(2){
                            .px2rem(margin-right,30);
                            .px2rem(margin-left,30);
                            .px2rem(height,404);
                            .add{
                                display: block;
                                margin: 0 auto;
                                color: #9D9E9E;
                                .px2rem(font-size,36);
                                .px2rem(margin-top,12);
                                .px2rem(line-height,18);
                                .px2rem(margin-bottom,12);
                            }
                            .main-draw{
                                .bg-img('close-draw.png',137,137);

                            }
                            .main-draw-open{
                                .bg-img('open-draw.png',138,156);
                            }
                            .main-draw-impor{
                                .bg-img('close-draw1.png',137,137);
                                animation: tada 1s infinite;
                            }
                            a{
                                color: #9B9B9B;
                                display: block;
                            }
                        }
                        h1{
                            color: #9B9B9B;
                            border-bottom: 1px solid #9B9B9B;
                            .px2rem(width,134);
                            span{
                                .pr();
                               .padding(0,8,0,8);
                                .px2rem(bottom,-20);
                                background: #D0D4DC;
                            }
                        }
                        >div:nth-child(2){
                            .px2rem(margin-top,45);
                        }
                        .coupon{
                            .bg-img('coupon1.png',152,96);
                        }
                        .coupon-more{
                            .bg-img('coupon2.png',176,96);
                        }
                        /*邀请好友*/
                        &.invited-mid{
                            background: #F2433D;
                                h1{
                                    color: #ffffff;
                                    border-bottom: 1px solid #ffffff;
                                    span{
                                        background: #F2433D;
                                    }
                                }
                                .coupon{
                                    background-image: url("./res/coupon11.png");
                                }
                                .coupon-more{
                                    background-image: url("./res/coupon22.png");
                                }
                            .add{
                                color: #ffffff;
                            }
                            .main-draw{
                                background-image: url("./res/close-draw1.png");
                            }
                            .main-draw-open{
                                background-image: url("./res/open-draw1.png");
                            }
                        }
                    }
                }
                .main-bot{
                    color: #9B9B9B;
                    .px2rem(margin-top,40);
                }
            }
        }
        &.block2{
            .px2rem(padding-top,87);
            >h1{
             background-image: url("./res/block2-title.png");
            }
            div{
                .padding(97,60,91,60);
                .px2rem(font-size,28);
                .px2rem(line-height,42);
                .px2rem(margin-top,43);
                p{
                    .px2rem(font-size,28);
                    color: #333333;
                    .px2rem(line-height,42);
                    text-align: left;
                    &:before{
                        display: inline-block;
                        content: '';
                        .bg-img('Star.png',26,24);
                        .px2rem(margin-right,8);
                    }
                }
                h2{
                    border-bottom: 1px solid #D5D5D5;
                    .px2rem(margin-top,14);
                    span{
                        .pr();
                        .px2rem(padding-right,55);
                        .px2rem(padding-left,13);
                        color: #9B9B9B;
                        background: #ffffff;
                        .px2rem(bottom,-20);
                        left: 50%;
                        .px2rem(margin-left,-87);
                        em{
                            .pa();
                            display: inline-block;
                            .bg-img('lizi.png',31,29);
                            .px2rem(right,13);
                            .px2rem(margin-top,6);
                        }
                    }
                }
                img{
                    .px2rem(width,562);
                    .px2rem(height,237);
                    display: block;
                    margin: 0 auto;
                    .px2rem(margin-top,68)
                }
            }
        }
        &.block3{
            .px2rem(padding-top,90);
            >h1{
                background-image: url("./res/block3-title.png");
            }
            >p{
                .px2rem(margin-top,20);
                .px2rem(margin-bottom,37);
            }
            .invite-list{
                .padding(70,50,30,50);
                .px2rem(line-height,33);
                .px2px(font-size,24);
                color: #9B9B9B;
                h2,ul{
                    span:first-child{
                        float: left;
                    }
                    span:last-child{
                        float: right;
                    }
                }
                h2{
                    .px2rem(padding-left,40);
                    .px2rem(padding-right,20);
                    overflow: hidden;
                }
                ul{
                    .px2rem(margin-top,20);
                    li{
                        .px2rem(padding-left,40);
                        .px2rem(padding-right,20);
                        &:first-child{
                            border-bottom: 1px solid #D5D5D5;
                            p{
                                .px2rem(margin-bottom,15);
                            }
                        }
                        &:nth-child(2),&:nth-child(3),&:nth-child(4){
                            .pr();
                            div{
                                span:first-child{
                                    color: #FF3A33;
                                }
                            }
                            &:before{
                                .pa();
                                display: block;
                                content: '';
                                .bg-img('first.png',30,45);
                                left: 0;
                                .px2rem(top,8);
                            }
                        }
                        &:nth-child(3){
                            &:before{
                                background-image: url("./res/second.png");
                            }
                        }
                        &:nth-child(4){
                            &:before{
                                background-image: url("./res/three.png");
                            }
                        }
                        .px2rem(margin-top,30);
                        div{
                            overflow: hidden;
                            .px2px(font-size,30);
                            color: #FF3A33;
                            .px2rem(line-height,36);
                            .px2rem(margin-bottom,10);
                            span:first-child{
                                color: #333333;
                                .px2px(font-size,28);
                            }
                        }
                        p{
                            .px2px(font-size,24);
                            color: #9B9B9B;
                            text-align: left;
                            .px2rem(line-height,31);
                        }
                    }
                }
                .data-empty{
                    .px2rem(padding-top,170);
                    .px2rem(padding-bottom,260);
                    img{
                        display: block;
                        .px2rem(width,87);
                        margin: 0 auto;
                    }
                    p{
                        color: #9B9B9B;
                        .px2px(font-size,28);
                        text-align: center;
                        .px2rem(padding-top,30);
                    }
                }
                >a{
                    .px2px(font-size,24);
                    color: #D1D1D1;
                    .px2rem(padding-top,40);
                    display: block;
                    text-align: center;
                }
            }
        }
    }
    .draw-history{
        .px2px(font-size,28);
        color: #FFFFFF;
        letter-spacing: 1.17px;
        float: right;
        .px2rem(padding-right,30);
        a{
            .px2px(font-size,46);
            .px2rem(margin-left,15);
        }
    }
    footer{
        .pf();
        bottom: 0;
        left: 0;
        .bg-img('footer.png',750,128);
        width: 100%;
        .px2px(font-size,40);
        color: #ffffff;
        letter-spacing: 2px;
        .px2rem(line-height,128);
        text-align: center;
        cursor: pointer;
        z-index: 10;
        .footer-qr{
            .pa();
            left: 0;
            top: 0;
            .px2rem(width,128);
            .px2rem(height,128);
        }
        span{
            .pr();
            margin:auto;
            .px2rem(bottom,-5);
            text-shadow: 0 2px 4px rgba(209,17,29,0.50);
            font-weight: bold;
            em{
                .pa();
                .px2rem(right,-60);
                 top:50%;
                .px2rem(margin-top,-27);
                .bg-img('footer-jiantou.png',57,53);
                animation: slideright 1.2s ease-in infinite;
            }
        }
    }
    /*弹框*/
    .frame-box{
        min-width: 8.5em;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        height: 100%;
        z-index: 90;
        background: rgba(0, 0, 0, 0.7) center center no-repeat;
        .btn{
            background-image: linear-gradient(-90deg, #FF3E00 4%, #FF7D00 100%);
            box-shadow: 0 10px 20px 0 rgba(255,77,0,0.50);
            .borderradius1(100);
            letter-spacing: 0;
            text-align: center;
            text-shadow: 0 2px 4px rgba(209,17,29,0.50);
            color: #fff;
            margin: 0 auto;
            .px2rem(margin-top,40);
            .px2px(font-size,28);
        }
        .frame-main{
            position: absolute;
            left: 50%;
            top: 50%;
            -webkit-transition: all 0.6s;
            -webkit-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            z-index: 1000;
        }
        .invite-info{
            .px2rem(width,620);
            .padding(88,55,50,55);
            background: #fff;
            box-shadow: 0 4px 20px 0 rgba(74,74,74,0.26);
            .borderradius1(20);
            p{
                .px2px(font-size,28);
                color: #333333;
                .px2rem(line-height,54);
            }
            div{
                .px2rem(width,440);
                .px2rem(height,88);
                .px2rem(line-height,88);
            }
        }
        .close-draw{
            .pa();
            .bg-img('close.png',56,55);
            left: 50%;
            .px2rem(margin-left,-28);
            .px2rem(bottom,120);
            cursor: pointer;
        }
    }
}
//定义动画
.fade-enter-active, .fade-leave-active{
    transition: all .5s;
}
.fade-enter, .fade-leave-to{
    opacity: 0
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

@keyframes tada{
    0%{-webkit-transform:scale(1);transform:scale(1)}
    10%,20%{-webkit-transform:scale(0.9) rotate(-3deg);transform:scale(0.9) rotate(-3deg)}
    30%,50%,70%,90%{-webkit-transform:scale(1) rotate(3deg);transform:scale(1) rotate(3deg)}
    40%,60%,80%{-webkit-transform:scale(1) rotate(-3deg);transform:scale(1) rotate(-3deg)}
    100%{-webkit-transform:scale(1) rotate(0);transform:scale(1) rotate(0)}}
@-webkit-keyframes tada{
    0%{-webkit-transform:scale(1);transform:scale(1)}
    10%,20%{-webkit-transform:scale(0.9) rotate(-3deg);transform:scale(0.9) rotate(-3deg)}
    30%,50%,70%,90%{-webkit-transform:scale(1) rotate(3deg);transform:scale(1) rotate(3deg)}
    40%,60%,80%{-webkit-transform:scale(1) rotate(-3deg);transform:scale(1) rotate(-3deg)}
    100%{-webkit-transform:scale(1) rotate(0);transform:scale(1) rotate(0)}}

@keyframes slideright{
    0%{
        -webkit-transform: translateX(0%);
        transform: translateX(0%);
        opacity:1
    }
    100%{
        -webkit-transform: translateX(50%);
        transform: translateX(50%);
        opacity:0.3
    }
}
@-webkit-keyframes slideright{
    0%{
        -webkit-transform: translateX(0%);
        transform: translateX(0%);
        opacity:1
    }
    100%{
        -webkit-transform: translateX(50%);
        transform: translateX(50%);
        opacity:0.3
    }
}
</style>
