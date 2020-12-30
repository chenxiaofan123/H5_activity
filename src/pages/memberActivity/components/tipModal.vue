<template>
    <v-modalTip v-show="show" @touchmove.prevent>
        <div class="tip-model">
           <div class="content">
                <p class="title">温馨提示</p>
                <p class="info">白银以上会员等级可享升级礼包，购买更多产品可以提升会员等级</p>
                <div class="footer-btn">
                    <div class="btn">
                        <span class="line gobugtext" id='goBuy' @click='goBuy($event)'>去购买</span>
                    </div>
                    <div class="btn">
                        <span id='goUpgrade' @click="goUpgrade($event)">了解会员权益</span>
                    </div>
                </div>
           </div>
           <div class="footerClose" @click="closeRule"></div>
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
             * 跳转优惠卷页面
             */
            goCoupons(){
                GB.utils.callCustomMethod('openUrl', {
                    'url': 'gbanker://page_coupon',
                    "params": {}
                })
                this.closeRule();
            },
            /**
             * 去购买
             */
            goBuy(e){
                this.trackHeatMap(e);
                GB.utils.callCustomMethod('showProductTab', {tabIndex:1})
            },
            /**
             * 了解会员权益
             */
            goUpgrade(e){
                this.trackHeatMap(e);
                window.location.href = `${h5GbankerAppBusiness}/html/pages/equityDetail/?tab=1&version=${GB.utils.GetRequest()['version']}`;
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
    .gobugtext{
        font-weight: 700;
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