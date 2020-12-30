<template>
    <div class="rules-page">
        <div class='rule-fix-wrap'>
            <div class="content"  id="content">
               <div>
                <p>1、</p>
                <div>活动时间：2019年6月6日 11：00 - 2019年6月20日 23:59:59；</div>
            </div>
            <div>
                <p>2、</p>
                <div>
                    <p>活动期间您可以通过以下方式来获得答题机会：</p>
                    <p><span>每日领取：</span>每人（完成首购用户）每天可免费领取1次答题机会；</p>
                    <p><span>投资：</span>日累计投资超过10000元，可获得1次额外答题机会，每人每天最多可获得1次；</p>
                    <p><span>邀请：</span>您通过参与邀请活动获得额外答题机会。每邀请一名用户完成首购（新用户在注册30日内投资锁定期限≥30天且投资金额≥2000的理财产品），即可获得1次答题机会，每日最多可获取8次；</p>
                </div>
            </div>
             <div>
                <p>3、</p>
                <div>每局答题有7道题目，在每局答题中累计答对1，4，7道题，会有相应的奖励。加息券会直接发放到“我的优惠券”中，现金红包会直接发放到您的余额中。发放奖励会有大约5-15分钟的延迟，请您查收；</div>
            </div>
             <div>
                <p>4、</p>
                <div>活动结束后，累计答对题目排名前三的用户会分别获得3000，2000，1000元的现金奖励，前10名用户会分别获得1张5%的无限制通用加息券，前1000名会获得华为p30等奖品的抽奖资格。抽奖活动将于2019年6月21日 12:30:00进行;</div>
            </div>
             <div>
                <p>5、</p>
                <div>未使用的答题次数将于活动结束后清零；</div>
            </div>
             <div>
                <p>6、</p>
                <div>在法律允许范围内，本次活动最终解释权归黄金钱包所有；</div>
            </div>
             <div>
                <p>7、</p>
                <div>如果您在使用app的过程中，有任何疑问，欢迎致电黄金钱包客服电话：4000-339-993。</div>
            </div>
            </div>
            <p class="bottom"></p>
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
    var time;
    clientInit.done(function() {
    	GB.utils.callCustomMethod("setTopRightButton", {
    		title: ""
    	});
    });
    var height = $(".rule-fix-wrap").height();
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
  background-image: url("../res/@{file}");
}
.rules-page {
  width: 100%;
  // height: 100%;
  font-family: PingFang-SC-Regular;
  .padding(30,30,30,30);
  background: #044DAE;
  .rule-fix-wrap {
    background: #fff;
    border: 2px solid #450A2D;
    border-radius: 1px;
    width: 100%;
    // height: 100%;
    .px2px(font-size,28);
     color: #000000;
    position: relative;
    .content {
      .px2rem(margin-top,60);
      overflow: auto;
      & > div {
        display: flex;
        .px2rem(width,600);
        margin: 0 auto;
        .px2rem(margin-bottom,30);
        span {
          color: #FA4B2F ;
        }
        & > div {
          p:not(:last-child) {
            .px2rem(margin-bottom,30);
          }
        }
      }
    }
    .bottom {
      // .bg-img("huawen-bottom.png",668,26);
      //  margin: 0 auto;
      // .px2rem(margin-bottom,11);
      position: absolute;
      .px2rem(bottom,11);
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .rules-page{
     padding-bottom: 40px !important;
  }
}
//iphone Xs Max
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
.rules-page {
     padding-bottom: 40px !important;
  }
}
//iphone XR
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
.rules-page {
      padding-bottom: 40px !important;
  }
}
</style>
