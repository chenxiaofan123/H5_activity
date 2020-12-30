<template>
    <div class="reward-list">
        <div class="mask">
            <ul :style="rollWinningStyle">
                <li v-for="(item,index) in filterWinningList" :key="index">
                    {{item.telephone}}获得{{item.prizeName}}
                </li>
            </ul>
            <ul :style="rollWinningStyle" v-if="filterWinningList.length>1" >
                <li v-for="(item,index) in filterWinningList" :key="index">
                    {{item.telephone}}获得{{item.prizeName}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {
  getWinningList
} from "../../../service/common/prizeDraw/service.js";
    export default {
        data() {
            return {
            }
        },
        props:["filterWinningList","rollWinningStyle"],
        watch:{
        },
        methods: {
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
    // .reward-list:after{
    //     content: "";
    //     width: 100%;
    //     height: 100%;
    //     position: absolute;
    //     left: 0;
    //     top: 0;
    //     background: inherit;
    //     -webkit-filter: blur(4px);
    //     filter: blur(4px);
    //     z-index: 2;
    // }
    .reward-list {
        .px2px(width,440);
        .px2px(height,60);
        .px2px(font-size,24);
        color: #FFFFFF;
        .pa();
        .px2px(top,41);
        left:0;
        overflow: hidden;
        border-top-right-radius: 22px;
        border-bottom-right-radius: 22px;
        background: inherit;
        .mask{
            width: 100%;
            height:100%;
            border-top-right-radius: 22px;
            border-bottom-right-radius: 22px;
            position: absolute;
            top: 0;
            left:0;
            z-index: 100;
            background: rgba(12,27,56,0.35);
        }
        ul{
            .px2rem(padding-left,30);
            .px2rem(padding-right,30);
            box-sizing: border-box;
            li{
                .px2rem(padding-top,14);
                .px2rem(padding-bottom,14);
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
</style>