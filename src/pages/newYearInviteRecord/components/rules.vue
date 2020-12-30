<template>
    <div class="rules-page">
        <div class='rule-fix-wrap'>
            <div class='rule-fix'>
                <div class='rule-main'>
                    <h2>1.邀请得双倍现金奖励</h2>
                    <p>1）活动期间2019.01.28 00:00-2019.02.19 23:59:59，您通过本活动链接邀请新用户注册，新用户在30日内投资锁定期限≥30天且投资金额≥1000元的产品（包含30天及以上的箱底金，新手黄金，安心智选，智选月月升）即可获得50元红包奖励；每位用户最多可以成功邀请50人；邀请成功后所获奖励直接发放到账户余额；</p>
                    <h2>2.0.4%自由返现</h2>
                    <p style="margin-bottom:0">1）活动时间 2019.01.28 00:00-2019.02.19 23:59:59 ，邀请新人注册后30天内，受邀用户每笔投资，（产品包含30天及以上的箱底金，新手黄金，安心智选，智选月月升）您都可享0.4％的返现，直接发放到您的账户余额。</p>
                    <p style="margin-bottom:0">2）邀请奖励=好友投资额（活动期间发生且锁定期≥30天的产品）*0.4%；</p>
                    <p style='color: #FF704A;'>注：好友买入/转入的箱底金，将按照买入/转入时金价换算为投资金额，计算奖励；</p>
                    <h2 class="marginBottom">3.总奖金为500w元，活动到期或奖金发完即止；</h2>
                    <h2 class="marginBottom">4.本活动奖励仅针对本活动链接邀请的用户，不与其他邀请活动奖励共享；</h2>
                    <h2 class="marginBottom">5.为了保护正常用户的利益，如发现恶意刷奖骗取奖励行为，一经查实，黄金钱包有权取消该笔奖励并进行追责；</h2>
                    <h2 class="marginBottom">6.在法律规定范围内，本次活动最终解释权归黄金钱包所有；</h2>
                    <h2 class="marginBottom">7.黄金钱包客服电话：4000-339-993</h2>
                    <h2>8.祝大家新春快乐，新年万事如意~</h2>
                </div>
            </div>
        </div>
        <div class='footer'></div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    if (GB.utils.getPlatform() == "android") {
      clientInit.done(() => {
        GB.utils.callCustomMethod("setTitle", {
          title: "活动明细"
        });
      });
       GB.utils.callCustomMethod("setTitle", {
          title: "活动明细"
        });
    } else {
      GB.utils.callCustomMethod("setTitle", {
        title: "活动明细"
      });
    }
  },
  beforeMount() {
    window.scrollTo(0, 0);
  },
  activated() {
    GB.utils.callCustomMethod("setTitle", {
      title: "活动明细"
    });
  }
};
</script>
<style lang="less"  scoped>
@import "../../../../statics/less/base/method.less";
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.rules-page {
  width: 100%;
  height: 100%;
  .padding(40,40,0,40);
  background-color: #ff705e;
  .rule-fix-wrap {
    background: #fff;
    .px2rem(border-top-left-radius,20);
    .px2rem(border-top-right-radius,20);
    width: 100%;
    height: 100%;
    .rule-fix {
      width: 100%;
      height: 100%;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      .rule-main {
        .padding(40,40,40,40);
        h2 {
          font-weight: bold;
        }
        .marginBottom {
          .px2rem(margin-bottom,30);
        }
        p {
          .px2px(font-size,24);
          color: #1f002a;
          letter-spacing: 1px;
          .px2rem(line-height,42);
          .px2rem(margin-bottom,30);
        }
      }
    }
  }
}
</style>
