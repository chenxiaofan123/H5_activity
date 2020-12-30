<template>
    <v-modalTip v-show="show" @touchmove.prevent>
        <div class="tip-model">
           <div class="content">
                <p class="title">温馨提示</p>
                <p class="info">一切会员权益尽在6.3.0及以上版本,快来下载最新版本吧~</p>
                <div class="footer-btn">
                    <div class="btn">
                        <span class="line" @click='download($event)'>立即下载</span>
                    </div>
                </div>
           </div>
        </div>
    </v-modalTip>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props:{
            show:null
        },
        watch:{
            show(val){
            }
        },
        methods: {
            closeRule(){
                this.$emit("update:show",false);
            },
            /**
             * 去下载
             */
            download(e){
                this.trackHeatMap(e);
                if (GB.utils.getPlatform() == "android") {
                    GB.utils.callCustomMethod("startApp", {
                        packageName: "fdafa",
                        pageName: "fda",
                        params: "",
                        url:"http://m.g-banker.com/redirectAppUrl?ch=gbanker_web"
                    });
                } else {
                    GB.utils.callCustomMethod("openSafariUrl", {
                        url: "https://apps.apple.com/app/id927245218?l=zh&ls=1"
                    });
                }
            },
            /**
             * 埋点
             */
            trackHeatMap(e){
                this.$sa.quick('trackHeatMap', e.currentTarget) 
            }
        },
        mounted() {
        }
    }
</script>
<style lang="less"  scoped>
    @import '../../../../statics/less/base/method.less';
    .bg-img( @url , @width, @height ) {
        .px2rem(width, @width);
        .px2rem(height, @height);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('../res/@{url}.png');
    }
    //描述文字
    .desc{
        .px2rem(font-size,20);
        color: #9B9B9B;
    }
    .tip-model{
        .px2rem(width,630);
        .px2rem(height,344);
        .px2rem(border-radius,16);
        margin:0 auto;
        box-sizing: border-box;
        background: #FFFFFF;
        overflow: hidden;
        .content{
            height: 100%;
            width: 100%;
            color: #333333;
            overflow: hidden;
            .title{
                .px2rem(font-size,30);
                .px2rem(margin-top,40);
                .px2rem(margin-bottom,40);
                text-align: center;
                font-weight: 700;
            }
            .info{
                .px2rem(font-size,26);
                .px2rem(line-height,36);
                text-align: center;
                .px2rem(margin-bottom,40);
                .px2rem(padding-left,40);
                .px2rem(padding-right,40);
            }
            .footer-btn{
                box-shadow: inset 0 1px 0 0 #E0E0E0;
                display: flex;
                .px2rem(border-bottom-left-radius,16);
                .px2rem(border-bottom-right-radius,16);
                .btn{
                    flex: 1;
                    .px2rem(height,110);
                    color: #FF8133;
                    text-align: center;
                    .px2rem(font-size,30);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span{
                        width: 100%;
                    }
                    .line{
                        border-right: 1px solid #E0E0E0;
                    }
                }
            }
        }
        .footerClose{
            .pa();
            .bg-img('close',80,80);
            margin: 0 auto;
            left: 50%;
            transform: translate(-50%,0);
            .px2rem(bottom,-120);
            z-index: 9999;
        }
    }
</style>