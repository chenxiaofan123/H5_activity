<template>
    <modal v-show="show"  :isShow.sync="show"  @touchmove.prevent @close='closeRule'>
        <div class="rule-model">
           <div class="content">
                <!-- <p class="xin1" @click="closeRule"></p> -->
                <div class="title">马上邀请好友来答题</div>
                  <ul class="share-type">
                    <li @click='goWxShare'>
                        <img src="./../res/wx.png" alt="">
                        <p>微信好友</p>
                    </li>
                    <li @click='goPyqShare'>
                        <img src="./../res/pyq.png" alt="">
                        <p>朋友圈</p>
                    </li>
                </ul>
           </div>
        </div>
    </modal>

</template>

<script>
import modal from './modal.vue'
    export default {
        data() {
            return {
            }
        },
        props:{
            show:null,
            actEndTime:{
                 type:'',
                default:''
            },
            actStartTime:{
                  type:'',
                default:''
            }
        },
        components: {
            modal
        },
        watch:{
            show(val){
            }
        },
        methods: {
            closeRule(){
                this.$emit("update:show",false);
            },
            //分享微信好友按钮
            goWxShare() {
                var params_shared = {
                    type: "1", //分享类型 1：新闻类分享  2：截图分享
                    code: "mainVenueFourth", //活动code，分享统计标示
                    needLogin: "1",
                    platform: "1", //0:弹出选择平台 1:微信好友 2:微信朋友圈 3：QQ好友 4：QQ空间 5：复制链接
                    pushShareMark: "" //是否需要统计用户分享
                };
                GB.utils.callCustomMethod("share", params_shared);
            },
            //分享朋友圈按钮
            goPyqShare() {
                var params_shared = {
                    type: "1", //分享类型 1：新闻类分享  2：截图分享
                    code: "mainVenueFourth", //活动code，分享统计标示
                    needLogin: "1",
                    platform: "2", //0:弹出选择平台 1:微信好友 2:微信朋友圈 3：QQ好友 4：QQ空间 5：复制链接
                    pushShareMark: "" //是否需要统计用户分享
                };
                GB.utils.callCustomMethod("share", params_shared);
            },
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
    .rule-model{
      .px2rem(width,750);
      .px2rem(height,380);
        margin:0 auto;
        box-sizing: border-box;
        background: #ffffff;
        .content{
            .px2px(font-size,32);
            color: #080841;
            box-sizing:border-box;
            position:relative;
            .title{
                .px2px(height,105);
                .px2px(line-height,105);
                text-align: center;
                border-bottom: 1px solid #CECED1;
            }
            .share-type{
                .px2px(margin-top,45);
                .px2px(margin-left,88);
                .px2px(margin-right,88);
                display: flex;
                align-items: center;
                justify-content: space-around;
                li{
                    text-align: center;
                    .px2px(width,128);
                    img{
                        .px2px(width,100);
                        .px2px(height,100);
                        .px2px(margin-bottom,20);
                        vertical-align: middle;
                    }
                }
                
            }
            // .xin1{
            //     // .bg-img("close",53,55);
            //     position:absolute;
            //     .px2rem(top,28);
            //     .px2rem(right,29);
            //     .px2rem(width,26);
            //     .px2rem(height,26);
            // }
        }
    }
</style>