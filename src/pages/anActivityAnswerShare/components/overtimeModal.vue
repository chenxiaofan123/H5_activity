<template>

  <!-- 弹窗组件 -->
    <transition name="fade">
    <div class="modal-wrap" v-show="show"  @touchmove.prevent @close='closeRule'>
        <div class="mask" @click="closeRule"></div>
        <div class="modal-content">
          <div class="rule-model">
            <div class="content">
                <div class="overTime">
                    <p > 试卷超时啦～</p>
                </div>
                <div class="button" @click='submitPapers'>
                        查看结果
                </div>
            
            </div>
        </div>
        </div>      
    </div>
    </transition>
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
            submitPapers(){
                this.$emit("submitPapers", this.show)
            }
        },
        mounted() {
            console.log(this.show)
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
    .fade-enter-active,
    .fade-leave-active {
    transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    }

    .modal-wrap {
    .pf();
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        // background: rgba(0, 0, 0, 0.6);
        z-index: 3000;
        }
    .mask{
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.6);
        .pf();
        top: 0;
        left: 0;
        bottom: 0;
        }
    .modal-content {
        .pf();
         .rule-model{
        width:250px;
        border: 2px solid #391543;
        border-radius: 4px;
        position: fixed;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        z-index: 999 !important;
        margin:0 auto;
        box-sizing: border-box;
        background: #ffffff;
        .content{
            text-align: center;
            .px2px(font-size,32);
            color: #080841;
            box-sizing:border-box;
            .overTime{
                background:  #00319A  url(../res/kuang.png) repeat ;
                background-size:15px 15px;
                p{
                     background: url(../res/tanc.png) repeat ;
                     background-size:100% 100%;
                     .px2px(height,242);
                }
                .px2px(height,242);
                color: #ffffff;
                font-weight: bold;
               .px2px(line-height,242);
               .px2rem(font-size,32);
            }
            .button{
                 background: url(../res/button2.png) no-repeat;
                background-size:100% 100%;
                 .px2px(width,240);
                 .px2px(height,90);
                  .px2px(line-height,86);
                  font-weight: bold;
                  color: #fff;
                  margin: 0 auto;
                 .px2px(margin-top,50);
                 .px2px(margin-bottom,50);
            }
           
           
        }
    }
     }

@media screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2){
        .modal-content .rule-model{
            top:45%;
        }
}
   
</style>