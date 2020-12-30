<template>
    <div class="index-page" v-cloak>
        <header>
            <div class="rule" @click='goRule()'> 活动规则</div>
        </header>
        <div class="leftYellow"></div>
        <div class="index-part">
            <div class="index-partOne">
                <div class="partTitle"></div>
                <div class="partText">您每出借公益标1000元即贡献一颗爱心，当平台累计爱心数达15000颗时，
                  黄金钱包将联合灵山慈善基金会为陕西省安康市紫阳县高滩镇大坝村的留守孩童们捐赠图书室。</div>
                <div :class="{0:'partImg',10:'partImg10',40:'partImg40',60:'partImg60',90:'partImg99',100:'partImg100',}[HeartPercentImg]">
                        <div class="imageText" v-if='HeartPercent!=0'>爱心进度{{HeartPercent}}%</div>
                </div>
                <div class="partNumber">
                    <div class="number" v-if='leaveHeartNumber<=0'>爱心书屋已点亮，感谢大家的支持！</div>
                    <div class="number" v-if='leaveHeartNumber>0'>还差&nbsp;<span>{{leaveHeartNumber}}</span>&nbsp;颗爱心就可以点亮书屋</div>
                    <div class="clearfix partSmall"  v-if='isLogin==1'>
                        <div class="left">我的出借额度：<span class="yellow">{{userTotalMoney/100}}元</span></div>
                        <div class="right clearfix" v-if='userTotalHeart!=0'><span class="left">我的爱心贡献：</span><span class="loveImg left"></span><span class="left">×{{userTotalHeart}}</span></div>
                         <div class="right" v-if='userTotalHeart==0' >我的爱心贡献：<span class="yellow">{{userTotalHeart}}</span></div>
                    </div>
                    <div class="noUser" v-if='isLogin==2'>
                        <span class="yellow" @click='goLogin()'>登录</span>查看我的爱心贡献
                    </div>
                </div>
                <div class="partLine clearfix">
                    <div class="lineImg left"></div>
                    <div class="lineImg right"></div>
                </div>
            </div>
             <div class="index-Two">
                <div class="partTitle"></div>
                <div class="partBanner">
                </div>
                <div class="partText">陕西省紫阳县高滩镇大坝村共748户，贫困户占比过半，有很多留守孩童。目前村里书籍与经费资源匮乏，
                    为了让孩子们有更多获取知识的途径，现特向灵山慈善基金会申请捐赠图书阅览室，为孩子们真正落实求知梦。</div>
                <div class="partButton" @click='goDetail()'>
                    查看详情
                </div>
                <div class="partLine clearfix">
                    <div class="lineImg left"></div>
                    <div class="lineImg right"></div>
                </div>
            </div>
             <div class="invite-list-box">
                <div class='invite-list-content'>
                    <div class="partTitle"> </div>
                    <div class="partText">
                        一份助力，一份爱心，全因有你，方能书送温暖。
                        活动结束后，我们将会为前十名助梦之星送出公益定制暖心礼物，延续爱的温暖。
                    </div>
                    <!--空状态-->
                    <div class='data-empty' v-if='invitelList.length<=0' >
                        <p class="emptyImg"></p>
                        <p>暂无数据，快来抢占榜单~</p>
                    </div>
                    <div  v-else>
                         <div class="ulTitle">
                             <div>排名</div>
                             <div>用户</div>
                             <div>献爱心数</div>
                         </div>
                          <ul>
                            <li v-for='(item, index) in invitelList' :key="index">
                                <div><span>{{index+1}}</span><span>{{item.maskTelephone}}</span> <span>{{item.userHeart}}</span></div>
                            </li>
                         </ul>
                    </div>
                     <!-- <div class='invite-list-btn' @click='goInviteList()' v-if='invitelList.length>5'>查看完整榜单</div>
                     <div class='invite-list-bottom' v-if='invitelList.length>5'></div> -->
                </div>
               
            </div>
        </div>
        <footer>
            <button v-if='isCast' class='invite-footer-btn'><span @click='goProductDetail()'>出借公益标献爱心</span>
            </button>
            <button v-if='isCast' class='invite-footer-poster' @click='gotoPoster()'><span>分享</span></button>
            <button  v-if='!isCast'  class="footerEmpty">公益标已售罄，感谢大家</button>
        </footer>
        <!--弹框-->
        <div class='frame-box' v-show='showFrameBox' @touchmove.prevent>
            <!--活动规则-->
            <div class='frame-main invite-info'>
                <div class="invit-title">活动规则</div>
                <p>1. 活动时间为2019年1月16日~2019年1月25日；</p>
                <p>2. 用户当前页面购买公益标（智选投30天）可参与助力活动，活动期间公益标加息0.5%；</p>
                <p>3. 活动期间，用户累计购买公益标每满1000元可获得1颗爱心，15000颗爱心可点亮整个书屋（爱心数据每3分钟更新一次哦~）；</p>
                <p>4. 活动结束后（或爱心点亮时），黄金钱包将为陕西省紫阳县高滩镇大坝村捐赠一个书屋，详情见公益详情，费用由黄金钱包承担；</p>
                <p>5. 进入爱心榜单的用户，可获得由黄金钱包定制公益礼品一份。</p>
                <div class='close' @click='closeFrameBox'></div>
            </div>
        </div>
    </div>
</template>
<script>
    import User from '../../service/common/User';
    import qr from './components/inviteQr'
    import pageVisibility from '../../commonScript/pageVisibility.js';
    import {swiper, swiperSlide} from "vue-awesome-swiper";
    import { getMyParticipationInfo,getPublicBenefitInfo} from '../../service/pages/publicWelfare/service.js';
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
                url: '',
                telephone: '',
                sessionId: '',
                isLogin:2, //1登录  2 未登录
                isCast:true, //是否可投 true 可投
                leaveHeartNumber:'', //爱心数
                HeartPercent:null, //爱心百分比
                HeartPercentImg:null, //爱心百分比图片
                invitelList: [],
                userTotalHeart:null,
                userTotalMoney:null,
                productWebUrl:null, //跳转链接
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
             this.getPublicBenefitInfo();
        },
        mounted() {
            var that = this;
            // 在这里需要判断 是否登录  登录之后之后的状态 来展示
            sessionProObj.getUserInfo((telephone, sessionId) => {
                console.log("111111111111");
                that.telephone = telephone;
                that.sessionId = sessionId;
                if (!telephone) {
                    that.isLogin = 2; //用未登录
                } else {
                    // 用户登录
                    that.isLogin = 1;
                    that.getMyParticipationInfo();
                }
            });
        },
        methods: {
             //活动规则
            goRule(){
                this.showFrameBox = true;
            },
            //关闭弹窗
            closeFrameBox() {
                this.showFrameBox = false;
            },
            //出借公益标详情
            goProductDetail(){
                location.href = this.productWebUrl
            },
            //查看详情
            goDetail(){
                location.href = basePath + '/html/pages/publicDetail/'
            },
            //去登录
            goLogin(){
                this.user.callAppLogin();
            },
            //生成海报页面
            gotoPoster() {
                location.href = basePath + '/html/pages/publicPosters/';
            },
            //登录获取爱心数
            getMyParticipationInfo() {
                let that = this
                var param = {
                    telephone: that.telephone,
                    sessionId:that.sessionId,
                }
                getMyParticipationInfo(param).then(res => {
                    let data = res.data;
                    if (+data.code == 0) {
                       that.userTotalHeart = data.data.userTotalHeart;
                       that.userTotalMoney = data.data.userTotalMoney;
                    } else {
                        if (data.msg) {
                            GB.utils.htoast(data.msg);
                        }
                    }
                });
            },
            //爱心排行榜
            getPublicBenefitInfo() {
                let that = this
                var param = { }
                getPublicBenefitInfo(param).then(res => {
                    let data = res.data;
                    if (+data.code == 0) {
                        that.isCast = data.data.activityStatus //是否可投
                        that.invitelList = data.data.heartTopList;
                        that.leaveHeartNumber = data.data.leaveHeart;
                        if(data.data.percent>100){
                           that.HeartPercent=100;
                        }else{
                            that.HeartPercent = data.data.percent;  //百分比
                        }
                        if( that.HeartPercent==0){
                            that.HeartPercentImg = 0;
                        }else if(that.HeartPercent>0&&that.HeartPercent<=10){
                            that.HeartPercentImg = 10;
                        }else if(that.HeartPercent>=10&&that.HeartPercent<=40){
                            that.HeartPercentImg = 40;
                        }else if(that.HeartPercent>40&&that.HeartPercent<=60){
                            that.HeartPercentImg = 60;
                        }else if(that.HeartPercent>60&&that.HeartPercent<=99){
                            that.HeartPercentImg = 90;
                        }else if(that.HeartPercent>=100){
                            that.HeartPercentImg = 100;
                        }
                        console.log(that.HeartPercentImg)
                        that.productWebUrl= data.data.productWebUrl; // 页面跳转链接
                    } else {
                        if (data.msg) {
                            GB.utils.htoast(data.msg);
                        }
                    }
                });
            },
        },
        activated() {
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
    .yellow{
        color: #FF6E00 
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
         position: relative;
        background: #FFC96D;
        .px2rem(padding-bottom, 160);
        header {
            .bg-img('bannerBg.png', 750, 627);
            .pr();
            width: 100%;
            .rule {
                .pa();
                color:#EE5800;
                .px2rem(font-size, 24);
                 background: #FFFBF5;
                 right: 0;
                 .px2rem(width, 130);
                 .px2rem(border-top-left-radius, 100); 
                 .px2rem(border-bottom-left-radius, 100);
                  .px2rem(padding-left, 20);
                 .px2rem(padding-top, 10);
                 .px2rem(padding-bottom, 10);
                .px2rem(top, 28);
                cursor: pointer;
            }
        }
        .leftYellow{
            .bg-img('leftyellow.png', 92,115);
                z-index: 100;
                position: absolute;
                left: 0;
                .px2rem(top,1300);
            }
        .index-part{
            .index-partOne,.index-Two{
                 position: relative;
                .px2rem(width, 702);
                margin: 0 auto;
                background: #FCF8ED;
                .px2rem(border-radius, 10);
                .px2rem(padding-left,30);
                .px2rem(padding-right,30);
                .px2rem(padding-top,38);
                .px2rem(padding-bottom,70);
                .px2rem(margin-bottom,40);
                .partLine{
                    position: absolute;
                    z-index: 100;
                    .px2rem(left,100);
                    .px2rem(bottom,-68);
                    .px2rem(width,465);
                    margin: 0 auto;
                    .lineImg{
                         .bg-img('line.png', 20,91);
                    }
                }
            }
            .index-partOne{
                .partTitle{
                    .bg-img('title1.png', 264,42);
                     margin:0 auto;
                    .px2rem(margin-bottom,21);
                }
                .partText{
                    font-family:"PingFangSC-Regular";
                    .px2rem(line-height,43);
                    .px2rem( font-size,24);
                    color: #9E6533;
                    letter-spacing: 0;
                    .px2rem(margin-bottom, 25);
                   
                }
                .imageText{
                      text-align: center;
                        font-family:" PingFangSC-Regular";
                       .px2rem( font-size,24);
                        color: #781C00;
                }
                .partImg,.partImg10,.partImg40,.partImg60,
                .partImg99,.partImg100{
                     margin: 0 auto;
                     .px2rem(padding-top, 52);
                }
                .partImg{
                    .bg-img('0.png', 257,228);
                }
                .partImg10{
                    .bg-img('10.png', 257,228);
                }
                .partImg40{
                    .bg-img('40.png', 257,228);
                }
                .partImg60{
                    .bg-img('60.png', 257,228);
                }
                 .partImg99{
                    .bg-img('99.png', 257,228);
                }
                .partImg100{
                    .bg-img('100.png', 257,228);
                }
                .partNumber{
                    font-family:"PingFangSC-Regular";
                    text-align: center;
                    .px2rem(margin-top,35);
                    .px2rem(font-size,30);
                    color: #444444;
                    .number{
                        .px2rem(margin-bottom,37);
                        span{
                            font-family: "PingFangSC-Semibold";
                            .px2rem(font-size,48);
                            color: #FF6E00;
                        }
                    }
                    .partSmall{
                        .px2rem(padding-left,20);
                        .px2rem(padding-right,20);
                      .px2rem(font-size,28);
                      color: #000000;
                      div{
                           .px2rem(height,37);
                           .px2rem(line-height,37);
                      }
                      .loveImg{
                         .bg-img('loveSmall.png', 28,25);
                          .px2rem(margin-top,4);
                          .px2rem(margin-right,10);
                         display: block;
                         float: left
                      }
                    }
                    .noUser{
                        text-align: center;
                        .px2rem(font-size,28);
                        span{
                            text-decoration: underline
                        }
                    }
                }
                
                
            }
            .index-Two{
                 .partTitle{
                    .bg-img('title2.png', 264,42);
                     margin:0 auto;
                    .px2rem(margin-bottom,21);
                }
                .partBanner{
                    .bg-img('twoBanner.png', 607,325);
                     margin:0 auto;
                     .px2rem(margin-bottom,46);
                }
                .partText{
                     font-family:"PingFangSC-Regular";
                    .px2rem(line-height,43);
                    .px2rem( font-size,24);
                    color: #9E6533 ;
                    letter-spacing: 0;
                    .px2rem(margin-bottom, 30)
                }
                .partButton{
                     .px2rem(width,170);
                     .px2rem(height,60);
                     .px2rem(line-height,60);
                      .px2rem(border-radius,34);
                      .px2rem( font-size,24);
                      color: #FF6E00;
                       margin:0 auto;
                      text-align: center;
                      border: 1px solid #FF6E00;
                }

            }

        }
        .invite-list-box {
            font-family:"PingFangSC-Regular";
           background: #FCF8ED;
            .borderradius1(10);
            .px2rem(width, 702);
             margin: 0 auto;
            .px2rem(padding, 40);
            .px2rem(font-size, 28);
            .px2rem(line-height, 34);
            color: #303030;;
            .invite-list-content {
                .px2rem(margin-top, 30);
                .px2rem(min-height, 840);
                .partTitle{
                    .bg-img('title3.png', 227,42);
                    margin: 0 auto;
                    .px2rem(margin-bottom, 25);
                }
                .partText{
                    .px2rem( font-size, 24);
                    .px2rem( line-height, 43);
                    color: #9E6533;
                    letter-spacing: 0;
                }
                .data-empty {
                    .px2rem(padding-top, 230);
                    .emptyImg {
                        .bg-img('empty.png', 97,91);
                         margin:0 auto;
                    }
                    p {
                        .px2px(font-size, 28);
                        .px2rem(padding-top, 30);
                        text-align: center;
                        color: #FFCD45 
                    }
                }
                .ulTitle{
                    .px2rem(padding-left, 50);
                     .px2rem(width, 588);
                     margin:0 auto;
                    .px2rem(margin-top,30);
                   .px2rem(font-size, 24);
                    color: #8F8F8F;
                    display: flex;
                    display: -webkit-flex;
                    justify-content: space-between;
                }

                ul {
                    li {
                        .px2px(font-size, 28);
                        .px2rem(padding-left, 40);
                        .px2rem(padding-right, 40);
                        .px2rem(width, 588);
                        margin:0 auto;
                        .px2rem(margin-top, 10);
                        .px2rem(margin-bottom, 10);
                         border-bottom: 1px solid #ECECEC;
                        &:nth-child(1), &:nth-child(2), &:nth-child(3) {
                            .pr();
                            &:before {
                                .pa();
                                display: block;
                                content: '';
                                .bg-img('one.png', 58,66);
                               .px2rem(top, 40);
                                .px2rem(top, 5);
                            }
                        }
                        &:nth-child(1) {
                          .px2rem(margin-top, 18);
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
                        &:nth-child(10) {
                           border-bottom:none
                        }
                        div {
                            .px2px(font-size, 28);
                            .px2rem(line-height, 83);
                            display: flex;
                            display: -webkit-flex;
                            justify-content: space-between;
                            span:first-child {
                              .px2rem(width, 58);
                              text-align: center;
                            }
                            span {
                                &:last-child {
                                    .bg-img('lovebig.png', 50,45);
                                    text-align: center;
                                    .px2rem(line-height, 45);
                                    color: #fff;
                                    .px2px(font-size, 24);
                                    .pr();
                                    .px2rem(bottom, -15);
                                }
                            }
                        }
                    }
                }
            }
            .invite-list-btn {
                .px2rem(margin-top, 47);
                .px2rem(font-size, 24);
                color: #A8A8A8;
                text-align: center
            }
            .invite-list-bottom {
                .bg-img('arrow.png', 23,16);
                margin:0 auto;
                .px2rem(margin-top, 10);
            }
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
            background: #FFC96D ;
            .px2rem(padding-left, 20);
            .px2rem(padding-right, 20);
            .px2rem(padding-top, 26);
            .px2rem(padding-bottom, 16);
            button {
                border: none;
                outline: none;
                background: none;
                // font-weight: bold;
                &.invite-footer-btn {
                     font-family: 'PingFangSC-Semibold';
                    .bg-img('longButton.png', 470, 98);
                    .px2rem(font-size, 38);
                    color: #FDF1BC;
                    .px2rem(letter-spacing, 3);
                    .pr();
                    span {
                        display: block;
                        .px2rem(margin-top, -6);
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
                     font-family: 'PingFangSC-Semibold';
                    .bg-img('shortButton.png', 219, 98);
                    .px2rem(font-size, 38);
                   color: #EE5800;
                    .px2rem(letter-spacing, 2);
                    .px2rem(line-height, 36);
                    span {
                        display: block;
                        .px2rem(margin-top, -6);
                    }
                }
                &.footerEmpty{
                    .bg-img('emptyButton.png', 710, 100);
                    color: #FFFFFF;
                    .px2rem(font-size, 38);
                     text-align: center;
                    .px2rem(line-height, 100);
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
                .padding(50, 40, 80, 40);
                background: #fff;
                box-shadow: 0 4px 20px 0 rgba(74, 74, 74, 0.26);
                .borderradius1(20);
                p {
                    .px2px(font-size, 24);
                    color: #333;
                    .px2rem(line-height, 40);
                    .px2rem(margin-bottom, 20);
                    .px2rem(padding-left, 4);
                }
                .invit-title{
                    text-align: center;
                    .px2px(font-size, 30);
                    color: #333;
                    .px2rem(margin-bottom, 40)
                }
                .close{
                      .bg-img('close.png', 30, 30);
                      position: absolute;
                      .px2rem(top, 32);
                      .px2rem(right, 32)
                }
            }
        }
    }

    //iphoneX、iphoneXs
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        footer {
            padding-bottom: 20px !important;
        }
    }

    //iphone Xs Max
    @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
        footer {
            padding-bottom: 20px !important;
        }
    }

    //iphone XR
    @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
        footer {
            padding-bottom: 20px !important;
        }
    }
</style>
