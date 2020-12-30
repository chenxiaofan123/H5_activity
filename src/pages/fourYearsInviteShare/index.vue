<template>
    <div class="share-page" v-cloak>
        <header>
            <div class="dialog-maxrate">
                <!--老用户-->
                <div class="content" v-show="userStatus==4"><!--v-show="userStatus==1"-->
                    <div class="text-des">
                        <div></div>
                        <p>您已经是老用户，前往App去使用吧！</p>
                    </div>
                    <div class="btn2" @click='download'>前往黄金钱包</div>
                </div>
                <!--已经领取-->
                <div class="content" v-show="userStatus==3">
                    <div class="text-des text-finish">
                        <div></div>
                        <p>新手三重礼已放入您的账户</p>
                    </div>
                    <div class="btn2" @click='download'>去App领取奖励</div>
                </div>
                <!--请输入手机号-->
                <div class="content" v-show="userStatus==1 || userStatus==2">
                    <div class="register-model ">
                        <div class="input-model">
                            <input type="tel" v-model='telephone' placeholder="请输入手机号" maxlength="11"/>
                        </div>
                    </div>
                    <div class="register-model step2" v-show="userStatus==2">
                        <div class="input-model">
                            <input type="tel" placeholder="请输入验证码" v-model='yzm' class="authCode" maxlength="6"/>
                            <span :class="['anthCodeCount',{'active':countdownstauts==1}]" @click="smsclick">{{countdowntext}}</span>
                        </div>
                        <p class="agreement">
                            <!--<i :class="{'unchecked':!isAgree}" @click='isAgree = !isAgree'></i>-->
                            注册表示已阅读并同意<span class="procotol" @click='toServerAgreenment'>黄金钱包服务协议</span>
                        </p>
                    </div>
                    <div class="btn2" v-show="userStatus==1" @click='sendAuthCode'>立即领取</div>
                    <div class="btn2" v-show="userStatus==2" @click='registerclick'>立即领取</div>
                </div>
            </div>
        </header>
        <div class="screen1">
            <div class='screen1-prize-box'>
                <div class='screen1-prize-one'>
                    <img src="./res/redbag_10.png" alt="">
                    <p>10毫克黄金红包</p>
                </div>
                <div class='screen1-prize-two'>
                    <img src="./res/newGold.png" alt="">
                    <p>新手黄金239元/克</p>
                    <span>净赚40元</span>
                </div>
            </div>
            <div class='screen1-prize-three'>
                <img src="./res/three_img.png" alt="">
                <div>
                    <p>安心智选</p>
                    <span>银行全程存管</span>
                </div>
            </div>
        </div>
        <h2 class='about-us'><span>关于我们</span></h2>
        <div class='screen2 screen3'>
            <dl>
                <dd>
                    <div>
                        <img src="./res/screen3-01.png"/>
                        <span>· 银行系背景 ·</span>
                        <span>C轮融资2亿</span>
                        <span>银行系资本战略入股</span>
                    </div>
                    <div>
                        <img src="./res/screen3-02.png"/>
                        <span>· 合规新时代 ·</span>
                        <span>与平安银行达</span>
                        <span>成战略合作</span>
                    </div>
                </dd>
                <dd>
                    <div>
                        <img src="./res/screen3-03.png"/>
                        <span>· 行业之先 ·</span>
                        <span>上海黄金交易</span>
                        <span>所综合类会员</span>
                    </div>
                    <div>
                        <img src="./res/screen3-04.png"/>
                        <span>· 保险保障 ·</span>
                        <span>中华联合财险承保</span>
                        <span>黄金财产安全</span>
                    </div>
                </dd>
            </dl>
        </div>
        <footer>
            <p>投资有风险 入市需谨慎<br/>本活动解释权归黄金钱包所有</p>
            <p>如有疑问咨询客服热线</p>
            <p>400-0339-993</p>
            <p>工作日：9:00-21:00；非工作日：10:00-15:00</p>
        </footer>
        <!--弹框-->
        <div class='frame-form' v-show='registerShow' @touchmove.prevent>

        </div>

    </div>
</template>
<script>
    import util from '../../utils/tool.js'
    import {openApp} from '../../commonScript/download.js';
    import wxShare from '../../commonScript/wxShare.js';
    import {getCode, userRegisterByValid} from '../../service/common/common.js'
    import {fourYearShareCode} from '../../service/pages/inviteDraw/service.js'
    /* import { clearTimeout, clearInterval } from 'timers';*/
    export default {
        data() {
            return {
                countdowntext: '60s',
                countdownstauts: 0, //发送验证码状态
                smsTimeInterval: '',
                telephone: '',
                registerShow: false,
                yzm: '',
                userStatus: 1,
                yzmtype: 1,
                isAgree: true,
                channelCode: '',
                userCode: '',
            }
        },
        mounted() {
            this.getInfo();
        },
        methods: {
            //安全协议
            toServerAgreenment() {
                //黄金钱包协议
                window.location = "http://static.huangjinqianbao.com/static/html/app/protocol/userProtocol.html";
            },
            getInfo() {
                // 获取注册所需要的信息
                var request = GB.utils.GetRequest();
                var channelCode = request['channelCode'] || '';
                var userCode = request['userCode'] || '';
                this.channelCode = channelCode;
                this.userCode = userCode;
                wxShare.getShareInfo(this.userCode, fourYearShareCode);
            },
            sendAuthCode() {
                var that = this
                if (!util.valid.checkTelephone(this.telephone)) {
                    return;
                }
                //发送验证码
                var data = {
                    telephone: this.telephone,
                    authCodeType: this.yzmtype
                }
                getCode(data).then((res) => {
                    var result = res.data;
                    var msg = result.msg;
                    if (+result.code == 0) {
                        if (msg == '手机号已注册') {
                            //老用户
                            this.userStatus = 4;
                        } else {
                            //新用户
                            util.toast('验证码已发送');
                            that.countdown1();
                            that.userStatus = 2;
                        }
                    } else {
                        if (msg) {
                            util.toast(msg);
                        }
                    }
                })
            },
            smsclick() {
                //发送短信验证码
                if (this.countdownstauts == 2) {
                    return;
                }
                this.sendAuthCode();
            },
            countdown1() {
                var that = this
                //短信验证码倒计时
                if (this.countdownstauts == 2) {
                    return;
                }
                var count = 60;
                that.countdownstauts = 2;
                that.countdowntext = '60s'
                that.smsTimeInterval = setInterval(() => {
                    if (--count < 0) {
                        clearTimeout(that.smsTimeInterval);
                        that.countdowntext = '重新发送';
                        that.countdownstauts = 1;
                    } else {
                        that.countdowntext = count + 's';
                    }
                }, 1000);

            },
            registerclose() {
                //关闭弹窗
                this.registerShow = false
                this.telephone = '';
                this.yzm = '';
                this.userStatus = 1;
                this.countdowntext = '';// 短信验证码倒计时
                this.countdownstauts = 0; //短信验证码状态 1 未发送 2 已发送
                if (this.smsTimeInterval) {
                    clearInterval(this.smsTimeInterval);
                }
            },
            registerclick() {
                //注册事件
                if (!util.valid.checkTelephone(this.telephone)) {
                    return;
                }
                if (!util.valid.checkYzm(this.yzm)) {
                    return;
                }
                /*if (!this.isAgree) {
                    util.toast('请勾选黄金钱包服务协议');
                    return false;
                }*/
                this.getInfo();
                var data = {
                    telephone: this.telephone,
                    "authCode": this.yzm,
                    "userInviteCode": this.userCode,
                    "channelCode": this.channelCode,
                    "registSource": 'opn0003'
                }

                userRegisterByValid(data).then((res) => {
                    var result = res.data;
                    if (+result.code == 0) {
                        // 注册成功-自动领取奖励
                        this.userStatus = 3;

                    } else {
                        if (result.msg) {
                            util.toast(result.msg);
                        }
                    }
                })

            },
            download() {
                openApp();
            },
        },
        beforeMount() {
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

    [v-cloak] {
        display: none !important;
    }

    .bg-img( @file , @width, @height ) {
        .px2rem(width, @width);
        .px2rem(height, @height);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('./res/@{file}');
    }

    .share-page {
        background: #260259 url("./res/banner.png") no-repeat center top;
        background-size: 100% auto;
        overflow: hidden;
        header {
            .dialog-maxrate {
                .px2rem(width, 670);
                background: #fff;
                .borderradius1(20);
                box-shadow: 0 10px 12px 0 rgba(68, 51, 14, 0.20);
                .padding(40, 40, 40, 40);
                text-align: center;
                margin: 0 auto;
                .px2rem(margin-top, 588);
                z-index: 4000;
                .pr();
                .text-des {
                    color: #78759D;
                    .px2px(font-size, 28);
                    .px2rem(margin-bottom, 40);
                    div {
                        .bg-img('finish.png',133,120);
                        margin: 0 auto;
                        .px2rem(margin-bottom, 40);
                        .px2rem(margin-top,40);
                    }
                }
                .register-model {
                    .input-model {
                        .pr();
                        width: 100%;
                        .px2rem(height, 90);
                        .borderradius1(8);
                        margin: 0 auto;
                        border: 1px solid #D5D5D5;
                        .px2rem(margin-bottom, 20);
                        ::-moz-placeholder {
                            color: #9B9B9B;
                        }
                        ::-webkit-input-placeholder {
                            color: #9B9B9B;
                        }
                        :-ms-input-placeholder {
                            color: #9B9B9B;
                        }
                        input {
                            border: 0;
                            width: 90%;
                            height: 100%;
                            .px2px(font-size, 28);
                            color: #494666;
                            outline: none; //轮廓
                            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                        }

                    }
                    &.step2 {
                        .px2rem(padding-top, 10);
                        .input-model {
                            border: none;
                            .clearfix();
                            input {
                                float: left;
                                .px2rem(height, 90);
                                .borderradius1(8);
                                border: 1px solid #D5D5D5;
                                width: 63.1%;
                                padding-left: 5%;
                            }
                            .anthCodeCount {
                                color: #333;
                                width: 32.3%;
                                .px2rem(height, 90);
                                .px2rem(line-height, 90);
                                .borderradius1(8);
                                .px2rem(font-size, 28);
                                float: right;
                                color: #9B9B9B;
                                border: 1px solid #D5D5D5;
                                &.active {
                                    background-image: linear-gradient(135deg, #FFEC9B 0%, #FFC21C 93%);
                                    border: none;
                                    color: #714800;
                                }
                            }
                        }
                    }
                }
                .agreement {
                    .px2px(font-size, 24);
                    color: #78759D;
                    text-align: center;
                    .px2rem(margin-bottom, 20);
                    .px2rem(line-height,32);
                    /*i {
                        display: inline-block;
                        .bg-img('checked.png', 24, 24);
                        .px2rem(margin-right, 14);
                        .pr();
                        .px2rem(top, 3);
                        &.unchecked {
                            .bg-img('unchecked.png', 24, 24);
                        }
                    }*/
                    span {
                        color: #F5A623;
                    }
                }
            }
            .btn2 {
                .px2rem(height, 90);
                .px2rem(line-height, 90);
                background-image: linear-gradient(90deg, #FFEC9B 0%, #FFC21C 93%);
                .borderradius1(8);
                color: #714800;
                .px2px(font-size, 30);
                letter-spacing: 1px;
                font-weight: bold;
            }
        }
        .screen1 {
            .px2rem(padding-top, 50);
            .screen1-prize-box {
                display: flex;
                display: -webkit-flex;
                justify-content: space-between;
                .px2rem(padding-left, 30);
                .px2rem(padding-right, 30);
                text-align: center;
                > div {
                    .bg-img('yellow.png', 344, 386);
                    color: #BBBBF0;
                    img {
                        .px2rem(width, 220);
                        display: block;
                        margin: 0 auto;
                        .px2rem(margin-top, 110);
                    }
                    p {
                        .px2rem(font-size, 30);
                        .px2rem(margin-top, -6);
                    }
                    span {
                        .px2rem(font-size, 24);
                    }
                }
                .screen1-prize-two {
                    background-image: url("./res/blue.png");
                    img {
                        .px2rem(width, 138);
                        .px2rem(margin-bottom, 20);
                        .px2rem(margin-top, 140);
                    }
                    span {

                    }
                }
            }
            .screen1-prize-three {
                .bg-img('orange.png', 694, 314);
                overflow: hidden;
                margin: 0 auto;
                .px2rem(margin-top, 50);
                .px2rem(padding-top, 112);
                .px2rem(padding-left, 60);
                img {
                    .px2rem(width, 250);
                    display: block;
                    float: left;
                }
                div {
                    float: left;
                    color: #BBBBF0;
                    .px2rem(padding-left, 40);
                    .px2rem(padding-top, 40);
                    p {
                        .px2rem(font-size, 30);
                        .px2rem(margin-top, -6);
                    }
                    span {
                        .px2rem(font-size, 24);
                    }
                }
            }
        }
        .screen2 {
            .px2rem(width, 670);
            margin: 0 auto;
            text-align: center;
            background: rgba(48, 26, 78, .8);
            border: 1px solid #78759D;
            .borderradius1(20);
            .padding(60, 40, 66, 40);
            dl {
                dd {
                    .clearfix();
                    &:last-child {
                        .px2rem(margin-top, 80);
                    }
                    div {
                        &:first-child {
                            float: left;
                        }
                        &:last-child {
                            float: right;
                        }
                        span {
                            display: block;
                            .px2rem(font-size, 24);
                            color: #BBBBF0;
                            letter-spacing: 0;
                            text-align: center;
                            .px2rem(line-height, 40);
                        }
                    }
                }
            }
        }
        .screen3 {
            .px2rem(margin-top, 40);
            dl {
                dd {
                    .px2rem(padding-left, 20);
                    .px2rem(padding-right, 20);
                    div {
                        .px2rem(width, 236);
                        img {
                            .px2rem(width, 160);
                            margin: 0 auto;
                            .px2rem(margin-bottom, 30);
                        }
                        span:nth-child(2) {
                            .px2rem(font-size, 28);
                            .px2rem(margin-bottom, 12);
                        }
                    }
                }
            }
        }
        .about-us {
            border-bottom: 1px solid #78759D;
            .px2rem(margin, 40);
            .px2rem(margin-top, 65);
            .px2rem(margin-bottom, 50);
            .pr();
            span {
                .px2rem(padding-right, 25);
                .px2rem(padding-left, 25);
                color: #BBBBF0;
                background: #260259;
                .px2rem(bottom, -24);
                .pa();
                left: 50%;
                transform: translateX(-50%);
                .px2rem(font-size, 30);

            }
        }
        footer {
            .px2rem(padding-top, 60);
            .px2rem(padding-bottom, 60);
            .px2rem(font-size, 24);
            color: #78759D;
            text-align: center;
            .px2rem(line-height, 36);
            p:first-child {
                .px2rem(margin-bottom, 30);
            }
        }
    }
</style>
