<template>
    <div class="index-page" v-cloak>
        <header>
            <div class='horn' v-show='winningList.length>0'>
                <div>
                    <swiper :options="swiperOption" ref="swiperOption" v-if='winningList.length>0'>
                        <swiper-slide v-for="(item,index) in winningList" :key="index">
                            {{item.phone}}刚刚获得 {{getPrize(item.rewardType,item.rewardAmount,item.goldWeight)}}
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
            <div class="rule" @click='goRule()'></div>
        </header>
        <div class='index-main-group'>
            <div class='index-main-box'>
                <p>邀请新人注册30天内完成<span class='span-btn' @click='openInviteInfo'>投资<em></em></span></p>
                <p>您可享受相应奖励。每成功邀请一位好友，<span>可获40元现金</span>。</p>
                <img src="./res/redBag_40.png"/>
            </div>
            <div class='index-main-box box2'>
                <p>邀请新人注册后30天内，受邀用户每笔投资，<br/>(30天及以上的箱底金，安心智选，智选月月升)<br/>您都<span>可享0.4%的返现</span>。</p>
                <h2><span>举个栗子🌰</span></h2>
                <div class='box-lizi'>
                    <span></span>
                    <span><span>0.4%</span><span>自由返现</span><span></span></span>
                    <span></span>
                </div>
            </div>
            <!-- <div :class="['index-main-box','box3',{'index-main-smallbox':!startDownTime || activityInfo.status != 1}]">
                <p class='down-time' v-show='startDownTime && activityInfo.status == 1 && keepTime'>距离活动结束还剩
                    <span class='down-time-model'><a>{{keepTime[0]}}</a><a>{{keepTime[1]}}</a>:<a>{{keepTime[3]}}</a><a>{{keepTime[4]}}</a>:<a>{{keepTime[6]}}</a><a>{{keepTime[7]}}</a></span>
                </p>
                <p>截至到 12.24 18:00 受邀请奖励最多的用户，可额外<span>获得 1 ？？？？毫克黄金奖励</span>。宝箱开启后“？”可随机0-9。</p>
                <img v-show='activityInfo.status == 1' src="./res/openBox.png"/>
                <img v-show='activityInfo.status == 2' @click='gopenPrizeBox()' src="./res/openBox1.png"/>
                <img v-show='activityInfo.status == 3' class='openedBox' src="./res/openedBox.png"/> -->
                <!--未到开启宝箱时间或者未登录-->
                <!-- <p class='bottom-txt' v-show='activityInfo.status == 1 && invitelList.length>0'>
                    目前暂列第一：{{activityInfo.phone}}</p> -->
                <!--宝箱待领取状态-->
                <!-- <p class='bottom-txt' v-show='activityInfo.status == 2 && activityInfo.isSelf && telephone'>
                    恭喜您获得黄金好礼，立即开启！</p>
                <p class='bottom-txt' v-show='activityInfo.status == 2 && (!activityInfo.isSelf || !telephone)'>
                    恭喜用户{{activityInfo.phone}}获得黄金大奖！</p> -->
                <!--宝箱已被领取-->
                <!-- <p class='bottom-txt' v-show='activityInfo.status == 3 && activityInfo.isSelf && telephone'>
                    恭喜您获得{{activityInfo.weight}}毫克黄金！</p>
                <p class='bottom-txt' v-show='activityInfo.status == 3 && (!activityInfo.isSelf || !telephone)'>
                    恭喜{{activityInfo.phone}}获得{{activityInfo.weight}}毫克黄金！</p> -->
            <!-- </div> -->
            <h2 class='invite-list'><span>邀请达人榜</span></h2>
        </div>
        <div class="invite-list-box">
            <p class='invite-list-th'><span>当前排名</span><span>获得奖励(元)</span></p>
            <p class='invite-list-me'>
                <span v-show='isLogin == 1'>{{myRank}}</span>
                <span v-show='isLogin == 2' class='under-line' @click='callAppLogin()'>登录查看</span>
                <span v-show='isLogin == 1'>{{myRewardAmount|moneyUnit}}</span></p>
            <p class='my-invite-list' @click='gotoRecord()'>查看我的邀请记录</p>
            <div class='invite-list-content'>
                <!--空状态-->
                <div class='data-empty' v-if='invitelList.length<=0'><img src="./res/empty_000.png"/>
                    <p>暂无榜单</p></div>
                <!--列表-->
                <ul v-else>
                    <li v-for='(item, index) in invitelList' :key="index">
                        <div><span>NO.{{index+1}}</span><span>{{item.rewardAmount|moneyUnit}}</span></div>
                        <p>{{item.phone}}</p>
                    </li>
                </ul>
            </div>
            <span class='invite-list-btn' @click='goInviteList()' v-if='invitelList.length>0'>查看完整榜单</span>
            <p class='invite-list-bottom'>*排行榜排名稍有延迟，最终以结果公布为准</p>
        </div>
        <span class='invite-history' @click='gotoHistory()'>历史奖励</span>
        <footer>
            <button class='invite-footer-btn'><span @click='goShare()'>立即邀请</span><span class='invite-footer-qr'
                                                                                        @click.stop='openFrameQr'></span>
            </button>
            <button class='invite-footer-poster' @click='gotoPoster()'><span>生成<br/>邀请海报</span></button>
        </footer>
        <!--弹框-->
        <div class='frame-box' v-show='showFrameBox' @touchmove.prevent>
            <!--首次投资-->
            <div class='frame-main invite-info' v-show='showFrameType == 1'>
                <p>1.受邀者需通过本活动分享的链接完成注册；</p>
                <p>2.购买产品锁定期≥30天，单笔投资额≥1000元（不限产品类型）。</p>
                <div class='btn' @click='closeFrameBox'>我知道了</div>
            </div>
            <!--中奖弹框-->
            <div class='invite-prize frame-main' v-show='showFrameType == 3'>
                <div class='prize-box'>
                    <span>{{prizeName}}</span>
                    <p v-show='producedPrize'>恭喜您获得15672毫克黄金！<br/>需要在15日内领取</p>
                    <div class='btn' @click='gotoReceive' v-show='producedPrize'>去账户查看所获奖励</div>
                </div>
            </div>
            <!--二维码邀请-->
            <v-qr :showFrameType='showFrameType' :url='url'></v-qr>
            <!--活动已经结束-->
            <div class='game-over' v-show='showFrameType == 4'>活动已结束!</div>
            <!--关闭按钮-->
            <div class='close-draw' @click='closeFrameBox'
                 v-show='(showFrameType == 3 && producedPrize) || showFrameType == 2'></div>
        </div>
    </div>
</template>
<script>
    import User from '../../service/common/User';
    import qr from './components/inviteQr'
    import pageVisibility from '../../commonScript/pageVisibility.js';
    import {swiper, swiperSlide} from "vue-awesome-swiper";
    import {
        getCurrentHundredTopList, getPersionInviteRank, openFirstReward, getFirstReward,
        getLatestInviteList, actCodeInvite, fourYearShareCode, prizeNameList
    } from '../../service/pages/inviteDraw/service.js';
    /*PageBack.addCb(function(){
        // console.log('执行app页面回退操作!');
        location.reload();
    })
    pageVisibility.visibilitychange(() => {
        location.reload();
    });*/

    export default {
        data() {
            return {
                user: new User(),
                showFrameBox: false,
                showFrameType: 0, //1 首次投资信息  2 邀请二维码  3 中奖  4活动结束
                producedPrize: false,
                prizeName: '1????',
                url: '',
                code: prizeNameList,
                telephone: '',
                sessionId: '',
                myRank:'',
                myRewardAmount:'',
                isLogin:2, //1登录  2 未登录
                swiperOption: {
                    notNextTick: true,
                    loop: true,
                    direction: 'vertical',
                    autoplay: {
                        enabled: true,
                        disableOnInteraction: false,
                        delay: 3000
                    },
                },
                activityInfo: {
                    activityEndTime: '',
                    isSelf: '',
                    phone: '',
                    status: '',
                    weight: ''
                },
                openBoxStatus: '',
                winningList: [],
                invitelList: [],
                keepTime: '',
                startDownTime: false,

                index: -1,    // 当前转动到哪个位置，起点位置
                timer: 0,    // 每次转动定时器
                speed: 100,   // 初始转动速度
                times: 0,    // 转动次数
                cycle: 30,   // 转动基本次数：即至少需要转动多少次再进入抽奖环节
                prize: -1,   // 中奖位置
            }
        },
        watch: {},
        filters: {
            moneyUnit: function (value) {
                if (!value) return '0.00'
                let result = (value / 100).toFixed(2);
                return result
            },
        },
        components: {
            "v-qr": qr,
            swiper,
            swiperSlide
        },
        created() {
            this.getHundredList();
            this.getTopList();
        },
        mounted() {
            var that = this;
            // 在这里需要判断 是否登录  登录之后之后的状态 来展示
            sessionProObj.getUserInfo((telephone, sessionId) => {
                console.log("111111111111");
                that.telephone = telephone;
                that.sessionId = sessionId;
                if (!telephone) {
                    /*that.getFirstReward();*/
                    that.isLogin = 2;
                } else {
                    // 用户登录
                    that.isLogin = 1;
                    that.getmyRewardRank();
                }
                that.getFirstReward();
                that.getShareInfo(sharebasePath, telephone, fourYearShareCode);
            });
        },
        methods: {
            //跳转历史邀请页面
            gotoHistory() {
                if (!this.telephone) {
                    this.callAppLogin();
                    return;
                }
                location.href = webV2Path + '/html/pages/historyInvite/'
            },
            //我的邀请页面
            gotoRecord() {
                if (!this.telephone) {
                    this.callAppLogin();
                    return;
                }
                location.href = basePath + '/html/pages/fourYearsRecord/'
            },
            //生成海报页面
            gotoPoster() {
                if (!this.telephone) {
                    this.callAppLogin();
                    return;
                }
                location.href = basePath + '/html/pages/fourYearsPosters/?url=' + this.url;
            },
            openInviteInfo() {
                this.showFrameBox = true;
                this.showFrameType = 1;
            },
            //开宝箱
            gopenPrizeBox() {
                if (this.telephone == '') {
                    this.callAppLogin();
                    return false;
                }
                this.openPrizeBox();
            },
            closeFrameBox() {
                this.showFrameBox = false;
                this.showFrameType = 0;
                this.producedPrize = false;
                this.prizeName = '1????';
            },
            goRule() {
                this.$router.push({path: '/rules'});
            },
            goInviteList() {
                /*if(!this.telephone){
                    this.callAppLogin();
                    return;
                }*/
                location.href = basePath + '/html/pages/fourYearsInviteList/'
            },
            //打开宝箱
            openPrizeBox() {
                let that = this
                var param = {
                    actCode: actCodeInvite,
                    telephone: this.telephone,
                    sessionId: this.sessionId
                }
                openFirstReward(param).then(res => {
                    let data = res.data;
                    if (+data.code == 0) {
                        that.openBoxStatus = data.data.status;
                        switch (that.openBoxStatus) {
                            case 0:
                                GB.utils.htoast('您未获得奖励');
                                break;
                            case 1:
                                this.showFrameBox = true;
                                this.showFrameType = 3;
                                this.getFirstReward();
                                setTimeout(() => {
                                    clearTimeout(that.timer);
                                    that.startRoll();
                                }, 500);
                                /*this.getFirstReward();*/
                                break;
                            case 2:
                                GB.utils.htoast('重复领取');
                                break;
                            case 3:
                                GB.utils.htoast('无效的活动');
                                break;
                            case 6:
                                GB.utils.htoast('未到开启豪礼时间');
                                break;
                            case 5:
                                GB.utils.htoast('领取时间已过');
                                break;
                        }
                    } else {
                        if (data.msg) {
                            GB.utils.htoast(data.msg);
                        }
                    }
                });
            },
            // 开始转动
            startRoll() {
                this.times += 1;  // 转动次数
                this.oneRoll();  // 转动过程调用的每一次转动方法，这里是第一次调用初始化

                // 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
                if (this.times > this.cycle + 10 && this.prize === this.index) {
                    clearTimeout(this.timer)   // 清除转动定时器，停止转动
                    this.prize = -1;
                    this.times = 0;
                    this.speed = 100;
                    setTimeout(() => {
                        this.producedPrize = true;
                    }, 500);
                } else {
                    if (this.times < this.cycle) {
                        this.speed -= 20   // 加快转动速度
                    } else if (this.times === this.cycle) { // 设置一个指定中奖位置
                        this.prize = 10;
                    } else if (this.times > this.cycle && this.index <= this.prize && this.index > this.prize - 10) {
                        this.speed += 10;
                    }

                    if (this.speed < 40) {
                        this.speed = 40
                    }
                    this.timer = setTimeout(this.startRoll, this.speed)
                }
            },
            // 每一次转动
            oneRoll() {
                let index = this.index  // 当前转动到哪个位置
                let count = this.code.length  // 总共有多少个位置
                index += 1
                if (index > count - 1) {
                    index = 0
                }
                this.index = index;
                this.prizeName = this.code[this.index];
            },
            //生成二维码
            openFrameQr() {
                if (!this.telephone) {
                    this.callAppLogin();
                    return;
                }
                this.showFrameBox = true;
                this.showFrameType = 2;
            },
            //登录
            callAppLogin() {
                this.user.callAppLogin();
            },
            //二维码
            getShareInfo(path, tel, code) {
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
            getHundredList() {
                let that = this
                var param = {
                    actCode: actCodeInvite,
                }
                getLatestInviteList(param).then(res => {
                    let data = res.data;
                    if (+data.code == 0) {
                        that.winningList = data.data.lastRewardList;

                    } else {
                        if (data.msg) {
                            GB.utils.htoast(data.msg);
                        }
                    }
                });
            },
            //奖励换算
            getPrize(type, amount, weight) {
                switch (type) {
                    case 1:
                        return amount / 100 + '元红包';
                        break;
                    case 4:
                        return weight + 'mg黄金';
                        break;
                    case 5:
                        return amount / 100 + '元返现';
                        break;

                }
            },
            ////获取前五名的排序
            getTopList() {
                let that = this
                var param = {
                    actCode: actCodeInvite,
                    num: 5
                }
                getCurrentHundredTopList(param).then(res => {
                    let data = res.data;
                    if (+data.code == 0) {
                        that.invitelList = data.data.topList;
                    } else {
                        if (data.msg) {
                            GB.utils.htoast(data.msg);
                        }
                    }
                });
            },
            //获取我的排名
            getmyRewardRank() {
                let that = this
                var param = {
                    actCode: actCodeInvite,
                    telephone: this.telephone,
                    sessionId: this.sessionId
                }
                getPersionInviteRank(param).then(res => {
                    let data = res.data;
                    if (+data.code == 0) {
                        that.myRewardAmount = data.data.rewardAmount;
                        if (data.data.rewardAmount) {
                            that.myRank = 'NO.' + data.data.rank;
                        } else {
                            that.myRank = '暂未上榜'
                        }
                    } else {
                        if (data.msg) {
                            GB.utils.htoast(data.msg);
                        }
                    }
                });
            },
            //暂列第一
            getFirstReward() {
                let that = this
                var param = {
                    actCode: actCodeInvite,
                    telephone: this.telephone,
                    sessionId: this.sessionId
                }
                getFirstReward(param).then(res => {
                    let data = res.data;
                    if (+data.code == 0) {
                        that.activityInfo = data.data;
                        if(that.activityInfo.activityStatus == 2){
                            this.showFrameBox = true;
                            this.showFrameType = 4;
                            return;
                        }
                        if (that.activityInfo.status != 1 && that.startDownTime) {
                            that.startDownTime = false;
                            return;
                        }
                        var endTimeDate = that.activityInfo.activityEndTime.replace(/-/g, '/');
                        var endTime = (new Date(that.activityInfo.activityEndTime)).getTime() || (new Date(endTimeDate)).getTime()
                        if (data.serverTime >= endTime - 172800000 && data.serverTime < endTime) {
                            that.countdowm(data.serverTime, endTime);
                        }
                    } else {
                        if (data.msg) {
                            GB.utils.htoast(data.msg);
                        }
                    }
                });
            },
            //分享按钮
            goShare() {
                if (!this.telephone) {
                    this.callAppLogin()
                    return
                }
                var params_shared = {
                    'type': "1",//分享类型 1：新闻类分享  2：截图分享
                    'code': fourYearShareCode,//活动code，分享统计标示
                    'needLogin': '1',
                    'platform': '0',//0:弹出选择平台 1:微信好友 2:微信朋友圈 3：QQ好友 4：QQ空间 5：复制链接
                    'pushShareMark': '1',//是否需要统计用户分享
                };
                GB.utils.callCustomMethod("share", params_shared);
            },
            //倒计时
            countdowm(now, timestamp) {
                let self = this;
                let nowTime = now;
                self.startDownTime = true;
                clearInterval(timer);
                var timer = setInterval(function () {
                    nowTime = nowTime + 1000;
                    var t = timestamp - nowTime;
                    if (t > 0) {
                        var hour = Math.floor((t / 3600000));
                        var min = Math.floor((t / 60000) % 60);
                        var sec = Math.floor((t / 1000) % 60);
                        hour = hour < 10 ? "0" + hour : hour;
                        min = min < 10 ? "0" + min : min;
                        sec = sec < 10 ? "0" + sec : sec;
                        var format = `${hour}:${min}:${sec}`;
                        self.keepTime = format.split('');
                        /*self.$set(self,"keepTime",format.split(''));*/
                    } else {
                        clearInterval(timer);
                        self.getFirstReward();
                    }
                }, 1000);
            },
            gotoReceive() {
                this.closeFrameBox();
                GB.utils.callCustomMethod("openUrl", {
                    url: "gbanker://page_hongbao",
                    params: {}
                });
            }
        },
        activated() {
            /*this.getFirstReward();*/
            window.scrollTo(0, 0);
        }
    }
</script>
<style lang="less" scoped>
    @import '../../../statics/less/base/method.less';

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
        background-image: url('./res/@{file}');
    }

    .border(@size,@color) {
        @bor: @size/75*1rem;
        border: @bor solid @color;
    }

    [v-cloak] {
        display: none !important;
    }

    .index-page {
        background: #260259;
        .px2rem(padding-bottom, 240);
        header {
            .bg-img('banner_new.png', 750, 1188);
            .pr();
            width: 100%;
            .horn {
                .px2rem(height, 60);
                .px2rem(line-height, 60);
                background: rgba(43, 3, 77, .8);
                .px2rem(border-bottom-right-radius, 35);
                .px2rem(border-top-right-radius, 35);
                .pa();
                left: 0;
                text-align: center;
                color: #FFFFFF;
                .px2rem(top, 20);
                .px2rem(padding-left, 20);
                .px2rem(padding-right, 33);
                .px2rem(font-size, 24);
                /*.px2rem(padding-top, 15);
                .px2rem(padding-bottom, 15);*/
                overflow: hidden;
                > div {
                    overflow: hidden;
                    height: 100%;
                    .swiper-container {
                        height: 0.8rem !important;
                    }
                }
            }
            .rule {
                .pa();
                .bg-img('rules.png', 50, 130);
                right: 0;
                .px2rem(top, 438);
                cursor: pointer;
            }
        }
        .index-main-group {
            .pr();
            .px2rem(top, -485);
            .index-main-box {
                margin: 0 auto;
                .px2rem(margin-bottom, 40);
                .px2rem(padding-left, 40);
                .px2rem(padding-right, 40);
                .px2rem(padding-top, 110);
                .bg-img('title1.png', 694, 534);
                p {
                    .px2rem(font-size, 28);
                    color: #BBBBF0;
                    text-align: center;
                    .px2rem(line-height, 40);
                    span {
                        color: #FFDA5C;
                        em {
                            display: inline-block;
                            .bg-img('wenhao.png', 26, 26);
                            margin-left: 3px;
                            .pr();
                            .px2rem(bottom, -5);
                        }
                        &.span-btn{
                            color: #FF8133;
                        }
                    }
                }
                img {
                    display: block;
                    margin: 0 auto;
                    .px2rem(margin-top, 26);
                    .px2rem(width, 318);
                }
                &.box2 {
                    .bg-img('title2.png', 694, 604);
                    h2 {
                        border-bottom: 1px solid #524576;
                        .px2rem(margin-top, 40);
                        .px2rem(margin-bottom, 49);
                        .pr();
                        span {
                            .px2rem(padding-right, 25);
                            .px2rem(padding-left, 25);
                            color: #BBBBF0;
                            background: #2E1551;
                            .px2rem(bottom, -20);
                            .pa();
                            left: 50%;
                            transform: translateX(-50%);
                            .px2rem(font-size, 28);

                        }
                    }
                    .box-lizi {
                        .px2rem(padding-left, 25);
                        > span {
                            display: inline-block;
                            &:first-child {
                                .bg-img('redBag_5000.png', 190, 220);
                            }
                            &:nth-child(2) {
                                .pr();
                                .px2rem(width, 170);
                                .px2rem(top, -100);
                                span {
                                    display: block;
                                    text-align: center;
                                    margin: 0 auto;
                                    &:first-child {
                                        .px2rem(font-size, 30);
                                        color: #FFDA5C;
                                        .px2rem(line-height, 36);
                                    }
                                    &:nth-child(2) {
                                        .px2rem(line-height, 32);
                                        .px2rem(font-size, 24);
                                        .px2rem(margin-bottom, 10);
                                        color: #BBBBF0;
                                    }
                                    &:last-child {
                                        .bg-img('jiantou.png', 90, 24);
                                    }
                                }
                            }
                            &:last-child {
                                .bg-img('redBag_200.png', 190, 220);
                            }
                        }
                    }
                }
                &.box3 {
                    .bg-img('yellow2.png', 694, 660);
                    &.index-main-smallbox {
                        .bg-img('yellow1.png', 694, 596);
                    }
                    .down-time {
                        .px2rem(margin-bottom, 22);
                        .down-time-model {
                            color: #BBBBF0;
                            a {
                                display: inline-block;
                                text-decoration: none;
                                background: #1E003E;
                                .borderradius1(4);
                                margin-left: 1px;
                                .px2rem(height, 44);
                                .px2rem(line-height, 44);
                                .px2rem(width, 24);
                                text-align: center;
                                &:nth-child(2), &:nth-child(4) {
                                    margin-right: 2px;
                                }
                            }
                        }
                    }
                    img {
                        .px2rem(width, 300);
                        .px2rem(margin-top, 5);
                        .px2rem(margin-bottom, 5);
                        &.openedBox {
                            .px2rem(width, 220);
                            .px2rem(margin-top, 35);
                            .px2rem(margin-bottom, 40);
                        }
                    }
                    .bottom-txt {
                        .px2rem(font-size, 30);
                    }
                }
            }
            .invite-list {
                border-bottom: 1px solid #78759D;
                .px2rem(margin, 40);
                .px2rem(margin-top, 70);
                .pr();
                span {
                    .px2rem(padding-right, 25);
                    .px2rem(padding-left, 25);
                    color: #BBBBF0;
                    background: #260259;
                    .px2rem(bottom, -20);
                    .pa();
                    left: 50%;
                    transform: translateX(-50%);
                    .px2rem(font-size, 30);

                }
            }
        }
        .invite-list-box {
            background: rgba(48, 26, 78, .8);
            border: 1px solid #78759D;
            .borderradius1(20);
            .px2rem(width, 670);
            margin: 0 auto;
            .px2rem(margin-top, -485);
            .px2rem(padding, 40);
            .px2rem(font-size, 24);
            .px2rem(line-height, 34);
            text-align: center;
            color: #BBBBF0;
            .invite-list-th, .invite-list-me {
                display: -webkit-flex; /* Safari */
                display: flex;
                justify-content: space-between;
            }
            .invite-list-me {
                .px2rem(min-height,50);
                span {
                    .px2rem(font-size, 34);
                    .px2rem(line-height, 50);
                    &:last-child {
                        color: #FFDA5C;
                    }
                    &.under-line {
                        text-decoration: underline;
                    }
                }
            }
            .my-invite-list {
                text-align: right;
                .px2rem(padding-right, 18);
                background: url("./res/jiantou_right.png") no-repeat right center;
                background-size: auto 55%;
            }
            .invite-list-content {
                .px2rem(margin-top, 30);
                border-top: 1px solid #675E8F;
                .px2rem(min-height, 520);
                .data-empty {
                    .px2rem(padding-top, 230);
                    img {
                        display: block;
                        .px2rem(width, 88);
                        margin: 0 auto;
                    }
                    p {
                        .px2px(font-size, 24);
                        .px2rem(padding-top, 20);
                    }
                }
                ul {
                    li {
                        .px2rem(padding-left, 40);
                        .px2rem(padding-right, 20);
                        .px2rem(margin-top, 30);
                        &:nth-child(1), &:nth-child(2), &:nth-child(3) {
                            .pr();
                            div {
                                span {
                                    color: #FFDA5C;
                                }
                            }
                            &:before {
                                .pa();
                                display: block;
                                content: '';
                                .bg-img('one.png', 30, 42);
                                left: 0;
                                .px2rem(top, 6);
                            }
                        }
                        &:nth-child(2) {
                            &:before {
                                background-image: url("./res/two.png");
                            }
                        }
                        &:nth-child(3) {
                            &:before {
                                background-image: url("./res/three.png");
                            }
                        }
                        div {
                            .px2px(font-size, 24);
                            .px2rem(line-height, 34);
                            display: flex;
                            display: -webkit-flex;
                            justify-content: space-between;
                            span {
                                &:last-child {
                                    color: #FFDA5C;
                                    .px2px(font-size, 30);
                                    .pr();
                                    .px2rem(bottom, -15);
                                }
                            }
                        }
                        p {
                            .px2px(font-size, 24);
                            text-align: left;
                        }
                    }
                }
            }
            .invite-list-btn {
                .px2rem(font-size, 24);
                .px2rem(padding-right, 15);
                background: url("./res/jiantou_right.png") no-repeat right center;
                background-size: auto 60%;
            }
            .invite-list-bottom {
                .px2rem(margin-top, 20);
                .px2rem(font-size, 20);
            }
        }
        .invite-history {
            .px2px(font-size, 24);
            float: right;
            color: #BBBBF0;
            .px2rem(margin-right, 40);
            .px2rem(padding-right, 16);
            background: url("./res/jiantou_right.png") no-repeat right center;
            background-size: auto 55%;
            .px2rem(margin-top, 20);
        }
        footer {
            display: -webkit-flex;
            display: flex;
            justify-content: space-between;
            width: 100%;
            .pf();
            bottom: 0;
            left: 0;
            z-index: 999;
            background: #260259;
            .px2rem(padding-left, 30);
            .px2rem(padding-right, 40);
            .px2rem(padding-top, 26);
            .px2rem(padding-bottom, 16);
            button {
                border: none;
                outline: none;
                background: none;
                font-weight: bold;
                &.invite-footer-btn {
                    .bg-img('long-btn.png', 476, 108);
                    .px2rem(font-size, 40);
                    color: #F65500;
                    .px2rem(letter-spacing, 3);
                    .pr();
                    span {
                        display: block;
                        .px2rem(margin-top, -18);
                    }
                    .invite-footer-qr {
                        .pa();
                        .px2rem(left, 10);
                        .px2rem(top, 18);
                        .px2rem(width, 100);
                        .px2rem(height, 100);
                        z-index: 1000;
                    }
                }
                &.invite-footer-poster {
                    .bg-img('short-btn.png', 190, 100);
                    .px2rem(font-size, 30);
                    color: #F1912E;
                    .px2rem(letter-spacing, 2);
                    .px2rem(line-height, 36);
                    span {
                        display: block;
                        .px2rem(margin-top, -8);
                    }
                }
            }
        }
        /*弹框*/
        .frame-box {
            min-width: 8.5em;
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            height: 100%;
            z-index: 9999;
            background: rgba(0, 0, 0, 0.7) center center no-repeat;
            .btn {
                background-image: linear-gradient(-45deg, #FFEC9B 0%, #FFC21C 93%);
                background-image: -webkit-linear-gradient(-45deg, #FFEC9B 0%, #FFC21C 93%);
                .borderradius1(20);
                .px2rem(font-size, 30);
                color: #714800;
                letter-spacing: 1px;
                .px2rem(height, 90);
                .px2rem(line-height, 90);
                font-weight: bold;
                text-align: center;
                margin: 0 auto;
            }
            .frame-main {
                position: absolute;
                left: 50%;
                top: 50%;
                -webkit-transform: translate(-50%, -50%);
                -ms-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
            }
            .invite-info {
                .px2rem(width, 620);
                .padding(80, 40, 40, 40);
                background: #fff;
                box-shadow: 0 4px 20px 0 rgba(74, 74, 74, 0.26);
                .borderradius1(20);
                p {
                    .px2px(font-size, 28);
                    color: #494666;
                    .px2rem(line-height, 54);
                }
                div {
                    .px2rem(width, 540);
                    .px2rem(margin-top, 40);
                }
            }
            .invite-prize {
                .prize-box {
                    .bg-img('prizebox.png', 750, 750);
                    .px2rem(font-size, 50);
                    color: #FF5E00;
                    overflow: hidden;
                    span {
                        .px2rem(width, 200);
                        display: flex;
                        display: -webkit-flex;
                        justify-content: space-between;
                        margin: 0 auto;
                        .px2rem(margin-top, 343);
                        .px2rem(letter-spacing, 14);
                    }
                    p {
                        .px2rem(font-size, 30);
                        color: #FFDA5C;
                        text-align: center;
                        .px2rem(margin-top, 130);
                    }
                }
                div {
                    .px2rem(width, 430);
                    .px2rem(margin-top, 30);
                }
            }
            .game-over{
                .pa();
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                .px2rem(font-size,36);
                text-align: center;
                color: lightgrey;
                letter-spacing: 1px;
            }
            .close-draw {
                .pa();
                .bg-img('Group 3.png', 47, 47);
                left: 50%;
                .px2rem(margin-left, -24);
                .px2rem(bottom, 100);
                cursor: pointer;
            }
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

    //iphoneX、iphoneXs
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        footer {
            padding-bottom: 20px !important;
        }

        .index-page {
            padding-bottom: 3.8rem !important;
        }
    }

    //iphone Xs Max
    @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
        footer {
            padding-bottom: 20px !important;
        }

        .index-page {
            padding-bottom: 3.8rem !important;
        }
    }

    //iphone XR
    @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
        footer {
            padding-bottom: 20px !important;
        }

        .index-page {
            padding-bottom: 3.8rem !important;
        }
    }
</style>
