<template>
    <div :class='["share-page",{poster2:poster == 2}]' v-cloak>
        <header></header>
        <img v-if='poster == 1' :class='["phontos",{"img-small":small}]' ref='phontos' :style="topp" src="./res/photos.png"/>
        <img v-if='poster == 2' :class='["phontos",{"img-small":small}]' ref='phontos' :style="topp" src="./res/photos2.png"/>
        <div class='bottom' :style="bott">
            <img v-if='poster == 1' class='txt' src="./res/txt.png"/>
            <img v-if='poster == 2' class='txt' src="./res/txt2.png"/>
            <div class='qr'>
                <canvas id="canvas"></canvas>
            </div>
        </div>
    </div>
</template>
<script>
    import {shareScreen} from '../../utils/util'
    import QRCode from 'qrcode'
    import {fourYearShareCode} from '../../service/pages/inviteDraw/service.js'

    export default {
        data() {
            return {
                telephone: '',
                sessionId: '',
                url: '',
                bott:{},
                topp:{},
                poster:0,
                small:false,
            }
        },
        created(){
            var that = this;
            this.poster = Math.round(Math.random())+1;
            clientInit.done(function() {
                GB.utils.callCustomMethod("setTopRightButton", {
                    title: "分享2"
                });
                opera.addCb(function() {
                    shareScreen(fourYearShareCode);
                });
            });
            //判断是否登录
            sessionProObj.getUserInfo((telephone, sessionId) => {
                if (telephone) {
                    that.telephone = telephone;
                    that.getShareInfo(sharebasePath, telephone, fourYearShareCode);
                }
            });
        },
        mounted() {
            let bodyh = document.body.offsetHeight;
            let bodyw = document.body.offsetWidth;
            if(bodyh/bodyw < 1.5){
                this.small = true;
                var imgh = 1.14*bodyw;
            }else {
                var imgh = 1.26*bodyw;
            }
            let txth = 0.15*bodyw;
            if(bodyh/bodyw >1.8){
                var margt = 0.1*bodyh;
                this.topp = {"top":'10%'}
            }else {
                var margt = 0.045*bodyh;
                this.topp = {"top":'4.5%'}
            }
            let h = bodyh-imgh-txth-margt;
            this.bott = {"bottom":h/2+"px"};
        },
        methods: {
            //二维码
            qr() {
                let that = this;
                var canvas = document.getElementById('canvas')
                QRCode.toCanvas(canvas, that.url, function (error) {
                    if (error) console.error(error)
                });
            },
            //s生成链接
            getShareInfo(path, tel, code) {
                var that = this;
                var params = new Object();
                params['methodName'] = 'getShareParams';
                params['type'] = 1;
                params['code'] = '';
                params['needLogin'] = '1';
                params['platform'] = '0';
                params['pushShareMark'] = '';
                $.getJSON(path + 'info/getShareInfoJsonp?jsoncallback=?', {
                    telephone: tel,
                    code: code,
                    pageUrl: encodeURIComponent(location.href.split('#')[0].toString())
                }, function (_data) {
                    var lineLink = location.href;
                    if (_data.wxurl) {
                        lineLink = _data.wxurl;
                    }
                    that.url = lineLink;
                    params['title'] = _data.title;
                    params['imageUrl'] = _data.imageUrl;
                    params['description'] = _data.description;
                    params['url'] = lineLink;
                    that.qr();
                });
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
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: fixed;
        bottom: 0;
        left: 0;
        background: url("./res/background.png") no-repeat center;
        background-size: 100% 100%;
        .pr();
        header {
            .pa();
            .bg-img('title.png', 278, 120);
            top: 0;
            left: 0;
            z-index: 99;
        }
        > img {
            .pa();
            width: 130%;
            display: block;
            left: 50%;
            transform: translateX(-50%);
            top: 4.5%;
        }
        .img-small{
            width: 118%;
        }
        .bottom {
            .px2rem(padding-left, 40);
            width: 100%;
            bottom: 0;
            left: 0;
            .pa();
            .txt {
                display: block;
                .px2rem(height,110);
            }
            .qr {
                width: 1.86rem !important;
                height: 1.86rem !important;
                position: absolute;
                .px2rem(right, 40);
                top: 50%;
                transform: translateY(-50%);
                #canvas {
                    width: 1.86rem !important;
                    height: 1.86rem !important;
                }
            }
        }
    }
    .poster2{
        background-image: url("./res/background2.png");
        header{
            background-image: url("./res/title2.png");
        }
    }

    //iphoneX、iphoneXs
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .phontos {
            top: 10% !important;
        }
        .bottom {
            bottom: 9.6% !important;
        }
    }

    //iphone Xs Max
    @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
        .phontos {
            top: 10% !important;
        }
        .bottom {
            bottom: 9.6% !important;
        }
    }

    //iphone XR
    @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
        .phontos {
            top: 10% !important;
        }

        .bottom {
            bottom: 9.6% !important;
        }
    }
</style>
