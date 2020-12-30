<template>
        <div :class="['draw-box',{'draw-end':isEnd}]" v-cloak v-show='showFrameType == 3'>
            <div class='num_box'>
                <div class='num'></div>
                <div class='num'></div>
                <div class='num'></div>
            </div>
            <div class='btn' @click='getLotteryDraw' v-show='!isEnd'>点击抽奖</div>
            <div class='btn' v-show='isEnd' @click='closed'>我知道了</div>
        </div>
</template>

<script>
    import {lotteryDraw,actCode} from '../../../service/pages/inviteDraw/service.js';
    export default {
    data() {
        return {
            isBegin:false,
            isEnd:false,
            goldWeight:'',
        }
    },
    props:{
        showFrameType: {
            default: 0
        },
        telephone:{
            default: ''
        },
        sessionId:{
            default: ''
        },
    },
    mounted(){
    },
    methods: {
        closed(){
           this.$emit("closeFrameBox");
            /*location.reload();*/
        },
        getLotteryDraw(){
            let that = this
            console.log('顶级抽奖');
            var param={
                actCode:actCode,
                telephone:that.telephone,
                sessionId:that.sessionId
            }
            lotteryDraw(param).then(res => {
                let data = res.data;
                console.log(data);
                if (+data.code == 0) {
                    that.goldWeight = data.data.goldWeight;
                    that.runing(that.goldWeight);
                } else {
                    if (data.msg) {
                        GB.utils.htoast(data.msg);
                    }
                }
            });
        },
        stringR(str) {
            str = str+''
            var str1="";
            var len = str.length
            if(len < 3){
                str = '0'+str
                len = str.length
            }
            for(var i=len-1;i>-1;i--){
                console.log(str[i]);
                str1+=str[i];
            }
            return str1.split('');
        },
        runing(num){
            var u = 50;
            var that = this
            if(that.isBegin) return false;
            that.isBegin = true;
            $(".num").css('backgroundPositionY',0);
            /*var result = numRand();*/
            var result = num
            var num_arr = that.stringR(result);
            $(".num").each(function(index){
                var _num = $(this);
                setTimeout(function(){
                    _num.animate({
                        backgroundPositionY: (u*60) - (u*num_arr[index])
                    },{
                        duration: 4500+index*2500,
                        easing: "swing",
                        complete: function(){
                            if(index==2){
                                that.isEnd = true;
                                that.isBegin = false;
                            }
                        }
                    });
                }, index * 300);
            });
        }
        },
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
    .draw-box{
        /*.bg-img('luckdraw-bg.png',636,491);*/
        background: url("../res/luckdraw-bg.png") no-repeat center;
        width: 318px;
        height: 245px;
        background-size: 100% 100%;
        .pa();
        top:50%;
        left:50%;
        margin-left: -159px;
        margin-top: -123px;
        /*.px2rem(margin-top,-245);
        .px2rem(margin-left,-318);*/
        &.draw-end{
            background-image: url("../res/draw-end.png");
        }
        .num_box{
            width: 118px;
            height: 50px;
            margin: 0 auto;
            margin-top: 45px;
            .clearfix();
            text-align: center;
            overflow: hidden;
            .num{
                float: right;
                background:url('../res/num.png') top center repeat-y;
                width: 35px;
                height: 50px;
                background-size: 16px auto;
                &:nth-child(3){
                    background-image: url("../res/num1.png");
                }
                &:nth-child(2){
                    margin-left: 5px;
                    margin-right: 5px;
                }
            }
        }
        .btn{
            background-image: linear-gradient(-186deg, #FAD961 0%, #FFAF24 99%);
            .borderradius1(100);
            .px2px(font-size,28);
            color: #FFFFFF;
            text-align: center;
            text-shadow: 0 2px 4px rgba(209,17,29,0.50);
            width: 150px;
            height: 40px;
            line-height: 40px;
            margin: 0 auto;
            margin-top: 93px;
            cursor: pointer;
        }
    }
</style>

