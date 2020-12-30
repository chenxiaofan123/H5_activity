<template>
    <div class="rules-page">
        <div class='rule-fix-wrap'>
            <p class="top"></p>
            <div class="content"  id="content">
               <div>
                <p>1、</p>
                <div>活动时间：2019年1月28日 00：00 - 2019年2月19日 23:59:59；</div>
            </div>
             <div>
                <p>2、</p>
                <div>完成首购用户即可参与活动；</div>
            </div>
            <div>
                <p>3、</p>
                <div>
                    <p>活动期间每人每天可免费领取1次翻牌机会；另外您可以通过以下两种方式来获得额外翻牌机会；</p>
                    <p><span>投资</span>：每投资满10000元（仅包含锁定期30天及以上的箱底金、安心智选、智选月月升产品）增加1次翻牌机会；</p>
                    <p><span>邀请</span>：活动期间，您通过参与邀请活动获得翻牌机会。每邀请一名用户完成首购（新用户在注册30日内投资锁定期限≥30天且投资金额≥1000元的箱底金、安心智选、智选月月升产品），即可获得1次翻牌机会，不设上限；</p>
                </div>
            </div>
             <div>
                <p>4、</p>
                <div>翻牌有机会获得现金红包，红包金额0.18-88元不等，翻到的现金奖励直接发放至钱包余额；</div>
            </div>
             <div>
                <p>5、</p>
                <div>翻牌次数将于活动结束后清零；</div>
            </div>
             <div>
                <p>6、</p>
                <div>在法律规定范围内，本次活动最终解释权归黄金钱包所有；</div>
            </div>
             <div>
                <p>7、</p>
                <div>黄金钱包客服电话：4000-339-993；</div>
            </div>
             <div>
                <p>8、</p>
                <div>祝大家新年快乐~</div>
            </div>
            </div>
            <div class="_bottom"><p class="bottom"></p></div>
            
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    var height = $(".rule-fix-wrap").height() - 5.5 - $(".top").height() - $("._bottom").height();
    $("#content").css("height", height + "px");
  },
  beforeMount() {
    window.scrollTo(0, 0);
  }
};
</script>
<style lang="less"  scoped>
@import "../../../statics/less/base/method.less";
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.bg-img( @file , @width, @height ) {
  .px2rem(width, @width);
  .px2rem(height, @height);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("./res/@{file}");
}
.rules-page {
  width: 100%;
  height: 100%;
  .padding(30,30,30,30);
  background: #921700;
  .rule-fix-wrap {
    background: #fff;
    border: 2px solid #07073a;
    border-radius: 1px;
    width: 100%;
    height: 100%;
    .px2px(font-size,28);
    color: #303030;
    position: relative;

    .top {
      .bg-img("huawen-top.png",668,26);
      margin: 0 auto;
      .px2rem(margin-top,11);
      .px2rem(margin-bottom,24);
      
    }
    .content {
      overflow: auto;
      & > div {
        display: flex;
        .px2rem(width,600);
        margin: 0 auto;
        .px2rem(margin-bottom,30);
        span {
          color: #aa0303;
        }
        & > div {
          p:not(:last-child) {
            .px2rem(margin-bottom,30);
          }
        }
      }
    }
    ._bottom{
      background:#fff;
      .px2rem(width,668);
      .px2rem(height,37);
       position: absolute;
       bottom:0;
      .px2rem(padding-bottom,11);
      left: 50%;
      transform: translateX(-50%);
    }
    .bottom {
      .bg-img("huawen-bottom.png",668,26);
      //  margin: 0 auto;
      // .px2rem(margin-bottom,11);
     
    }
  }
}
</style>
