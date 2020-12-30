<template>
        <div class='qr' v-cloak v-show='showFrameType == 2'>
            <div class='qr-title'>
            </div>
            <div class='qr-img'>
                <canvas id="canvas"></canvas>
                <div>
                    <img src='../res/logo.png'>
                </div>
            </div>
        </div>
</template>
<script>
    import QRCode from 'qrcode'
    export default {
        data() {
            return {

            }
        },
        props: {
            showFrameType: {
                default: 0
            },
            url:{
                default:''
            }
        },
        watch:{
            showFrameType(cur,old){
                if(cur == 2){
                    this.useqrcode();
                }
            }
        },
        mounted() {
        },
        methods: {
            useqrcode() {
//生成的二维码内容，可以添加变量
                this.QueryDetail = this.url
                var canvas = document.getElementById('canvas')
                QRCode.toCanvas(canvas, this.QueryDetail, function (error) {
                    if (error) console.error(error)
                })
            },
        }
    }
</script>
<style lang="less"  scoped>
@import '../../../../statics/less/base/method.less';
[v-cloak] {
    display: none !important;
}
.bg-img( @file , @width, @height ) {
    .px2rem(width, @width);
    .px2rem(height, @height);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../res/@{file}');
}
.qr{
    width: 231px;
    background: #fff;
    .borderradius1(20);
    padding-top: 10px;
    padding-bottom: 25px;
    .pa();
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .qr-title{
        background: url("../res/wx-qr.png") no-repeat center;
        width: 257px;
        height: 63px;
        background-size: 100% auto;
        margin-left: -13px;
        margin-right: -14px;
    }
    .qr-img{
        width: 180px;
        height: 180px;
        margin: 0 auto;
        .px2rem(margin-top,27);
        border: 1px solid #D5D5D5;
        .borderradius1(10);
        .pr();
        #canvas,>div{
            .pa();
            top:50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
        #canvas{
            width: 175px!important;
            height: 175px!important;
        }
        >div{
            width: 40px;
            height: 40px;
            background: #fff;
            box-shadow: 0 2px 10px 0 rgba(0,0,0,0.30);
            border-radius: 8px;
            padding: 3px;
            overflow: hidden;
            img{
                display: block;
                width: 100%;
                height: 100%;
                border-radius: 2px;
            }
        }
    }
}
</style>

