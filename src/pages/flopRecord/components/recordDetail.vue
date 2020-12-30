<template>
    <v-modalTip v-show="show" @touchmove.prevent>
        <div class="detail-model">
            <div class="title">
                <span class="line"></span>
                {{prizeName}}
            </div>
            <div class="JD-code" v-show='prizeType==5'>
                <p class="code-title">兑换码</p>
                <div class="JD-code-content" v-if='prizeRedeemCode'>
                    <p class="code">{{prizeRedeemCode}}</p>
                    <p class="copy" v-clipboard:copy="prizeRedeemCode" v-clipboard:success="onCopy"  id='copyBtn' v-clipboard:error="onError" @click='copySucc($event)'>复制</p>
                </div>
                <div class="JD-code-content" v-else-if='!prizeRedeemCode'>
                    <p class="noGrant">兑换码将在中奖5分钟后发放，请稍后</p>
                </div>
            </div>
            <div class="record-desc" v-if='recordDetailListIndex!=-1'>
                <!-- <p v-for='(item,index) in recordDetailList[recordDetailListIndex].desc' :key='index' :class="index==recordDetailList[recordDetailListIndex].desc.length-2?'mb10':''">{{item}}</p> -->
                <p v-for='(item,index) in prizeDescArr' :key='index' :class="index==prizeDescArr.length-2?'mb10':''">{{item}}</p>
                <!-- prizeDescArr -->
            </div>
            <div class="record-btn" @click="close($event)" id='close'>
                <span>知道了</span>
            </div>
        </div>
    </v-modalTip>

</template>

<script>
    import Vue from 'vue'
    import VueClipboard from 'vue-clipboard2';
    Vue.use(VueClipboard);
    export default {
        data() {
            return {
                recordDetailList:[
                    // 2:优惠卷 3-其他 4-现金 5-兑换码
                    {
                        prizeType:'2',
                        desc:[
                            '获奖后5分钟内发放至你的账户，可在 我的-我的优惠券 查看和使用。',
                            '详细使用规则请在优惠券中查看。'
                        ],
                    },
                    {
                        prizeType:'3',
                        desc:[
                            '我们将在获奖之日起5个工作日内与您的登录手机号码进行联系，确认身份和地址后为您邮寄，请注意接通电话。有问题请致电客服。'
                        ]
                    },
                    {
                        prizeType:'4',
                        desc:[
                            '获奖后预计5分钟内发放至你的钱包余额账户'
                        ]
                    },
                    {
                        prizeType:'5',
                        desc:[
                            '使用说明',
                            '1. 请复制券码并登陆京东官网/APP，在“我的”-“我的钱包”-“礼品卡”中绑定卡劵。',
                            '2. 具体使用规则按京东平台公布为准。',
                        ]
                    }
                ],
                recordDetailListIndex:-1,
                prizeDescArr:''
            }
        },
        props:{
            show:null,
            prizeName:'',
            prizeType:'',
            prizeRedeemCode:'',
            prizeDesc:''
        },
        watch:{
            prizeType(val){
                this.recordDetailList.forEach((item,index)=>{
                    if(item.prizeType==val){
                        this.recordDetailListIndex = index;
                    }
                })
            },
            prizeDesc(val){
                this.prizeDescArr = JSON.parse(val)
            }
        },
        methods: {
             /**
             * 埋点
             */
            trackHeatMap(e){
                this.$sa.quick('trackHeatMap', e.currentTarget);
            },
            close(e){
                this.trackHeatMap(e);
                this.$emit("update:show",false);
            },
            onCopy(){
                GB.utils.htoast('复制成功~');
            },
            onError(){
                GB.utils.htoast('复制失败~');
            },
            copySucc(e){
                this.trackHeatMap(e);
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
    .mb10{
        .px2rem(margin-bottom,10)!important;
    }
    .detail-model{
        .px2rem(width,560);
        .px2rem(font-size,28);
        height: auto;
        .px2rem(border-radius,30);
        .px2rem(padding-left,40);
        .px2rem(padding-right,40);
        .px2rem(padding-top,78);
        // .px2rem(padding-bottom,70);
        .px2rem(padding-bottom,50);
        margin:0 auto;
        box-sizing: border-box;
        background: #FFFFFF;
        overflow: hidden;
        color: #333333;
        .title{
            .px2rem(font-size,32);
            font-weight: 700;
            display: flex;
            align-items: center;
            .px2rem(margin-bottom,46);
            .line{
                display: inline-block;
                .px2rem(width,12);
                .px2rem(height,30);
                .px2rem(margin-right,14);
                background: #FFD200;
                border-radius: 2px;
            }
        }
        .JD-code{
             .px2rem(height,144);
             .px2rem(margin-bottom,30);
             background: #FFFFFF;
             box-shadow: inset 0 -1px 0 0 #EBEBEB;
            .JD-code-content{
                display: flex;
                justify-content: space-between;
                align-items: center;
                .px2rem(margin-top,12);
                .code{
                    .px2rem(font-size,30);
                    font-weight: 700;
                    flex:1;
                }
                .copy{
                    flex-shrink: 0;
                   .px2rem(font-size,24);
                    color: #FFC400;
                    .px2rem(width,100);
                    .px2rem(height,50);
                    background: #FFFFFF;
                    border: 1px solid #FFC400;
                    border-radius: 13px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .noGrant{
                     .px2rem(font-size,28);
                     color: #C1C1C1;
                }
            }
        }
        .record-desc{
            p{
                .px2rem(line-height,42);
                .px2rem(margin-bottom,20);
            }
            p:last-child{
                margin-bottom: 0;
            }
        }
        .record-btn{
            margin: 0 auto;
            .px2rem(width,380);
            .px2rem(height,90);
            // .px2rem(margin-top,100);
            .px2rem(margin-top,80);
            background: #FFD200;
            border: 2px solid #FFF1B1;
            border-radius: 22px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 700;
            span{
                .px2rem(font-size,32);
                color: #322400;
                letter-spacing: 2px;
                
            }
        }
    }
</style>