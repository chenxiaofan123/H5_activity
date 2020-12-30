<template>
    <div class='share-page' v-cloak>
        <header></header>
        <div class="text"  >
            <div class="textTip">黄金钱包邀请您成为钱包公益筑梦人</div>
            <img class="imagePic" src='./res/text2.png' />
        </div>
        <div class="bottom" :style="bott" >
            <div class="erweima"></div>
             <div >长按识别二维码</div>
        </div>
    </div>
</template>
<script>
    import {shareScreen} from '../../utils/util'
    import QRCode from 'qrcode'
    import {publicWelfareShareCode} from '../../service/pages/publicWelfare/service.js'
    export default {
        data() {
            return {
                telephone: '',
                sessionId: '',
                url: '',
                bott:{},
                topp:{},
                small:false,
            }
        },
        created(){
            var that = this;
            clientInit.done(function() {
                GB.utils.callCustomMethod("setTopRightButton", {
                    title: "分享"
                });
                opera.addCb(function() {
                    shareScreen(publicWelfareShareCode,0);
                });
            });
            // //判断是否登录
            // sessionProObj.getUserInfo((telephone, sessionId) => {
            //     if (telephone) {
            //         that.telephone = telephone;
            //         that.getShareInfo(sharebasePath, telephone, publicWelfareShareCode);
            //     }
            // });
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
        background: url("./res/banner.png") no-repeat center;
        background-size: 100% 100%;
        .pr();
        header {
            .pa();
            .bg-img('logo.png', 170, 57);
            .px2rem(top, 15);
            .px2rem(left, 27);
            z-index: 99;
        }
        .text{
            position: absolute;
            width:80%;
            left:10%;
            top:45%;
            .textTip{
                text-align: center;
                color: #fff;
                .px2rem(font-size, 36);
                .px2rem(margin-bottom, 56);
            }
             .imagePic{
                .px2rem(width, 537);
                .px2rem(height, 155);
                display: block;
                 margin:0 auto;
             }
        }
       
        .bottom {
            position: absolute;
           .px2rem(bottom, 80);
           width:30%;
            left: 35%;
            text-align: center;
             .px2rem(font-size, 28);
             color:#fff;
            .erweima{
                .bg-img('erweima1.png', 185, 185);
                 margin: 0 auto;
                 .px2rem(margin-bottom, 20);
            }
            
        }
    }
    //iphoneX、iphoneXs
    @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
        .bottom {
            bottom: 9.6% !important;
        }
    }

    //iphone Xs Max
    @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
        .bottom {
            bottom: 9.6% !important;
        }
    }

    //iphone XR
    @media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
        .bottom {
            bottom: 9.6% !important;
        }
    }
</style>
