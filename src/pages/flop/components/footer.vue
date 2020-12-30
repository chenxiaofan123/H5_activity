<template>
    <div class="footer-tips">
        <p>本活动最终解释权归黄金钱包所有</p>
        <p>如有任何疑问请致电</p>
        <p>客服电话:4000 339 993</p>
        <p>市场有风险,投资需谨慎</p>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props:[],
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
    .footer-tips {
        text-align: center;
        .px2px(font-size,26);
        color: #6682A3;
        .px2rem(margin-top,60);
        .px2rem(line-height,47);
        letter-spacing: 1.26px;
        p:last-child{
            .px2rem(margin-top,20);
        }
    }
</style>