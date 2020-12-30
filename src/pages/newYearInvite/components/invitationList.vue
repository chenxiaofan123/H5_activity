<template>
    <div CLASS='page-wrap'>
        <div class="persons-page">
            <p id="header"><span>当前排名</span><span>获得奖励(元)</span></p>
                    <div class='content' id="J_scroll">
                        <ul>
                            <li v-for='(item, index) in invitelList' :key="index">
                                <div><span>NO.{{index+1}}</span><span>{{item.rewardAmount|moneyUnit}}</span></div>
                                <p>{{item.phone}}</p>
                            </li>
                        </ul>
                    </div>
        </div>
    </div>
</template>
<script>
import { getCurrentHundredTopList } from "../../../service/pages/inviteDraw/service.js";
export default {
  data() {
    return {
      invitelList: [],
      actCodeInvite: "opn0003",
      handler: function(e) {
        e.preventDefault();
      }
    };
  },
  filters: {
    moneyUnit: function(value) {
      if (!value) return "0.00";
      let result = (value / 100).toFixed(2);
      return result;
    }
  },
  methods: {
    // setScroll() {
    //   // 设置 局部滚动
    //   var myScroll = new IScroll("#J_scroll");
    //   window.addEventListener("touchmove", this.handler, { passive: false });
    // },
    getHundredTopList() {
      let that = this;
      var param = {
        actCode: this.actCodeInvite,
        num: 100
      };
      getCurrentHundredTopList(param).then(res => {
        let data = res.data;
        if (+data.code == 0) {
          that.invitelList = data.data.topList;
          // that.$nextTick(function() {
          //   that.setScroll();
          // });
        } else {
          if (data.msg) {
            GB.utils.htoast(data.msg);
          }
        }
      });
    }
  },
  mounted() {
    if (GB.utils.getPlatform() == "android") {

      clientInit.done(() => {
        GB.utils.callCustomMethod("setTitle", {
          title: "邀请达人榜"
        });
      });
      GB.utils.callCustomMethod("setTitle", {
          title: "邀请达人榜"
        });
    } else {
      GB.utils.callCustomMethod("setTitle", {
        title: "邀请达人榜"
      });
    }
    var $height = $(".persons-page").height();
    var $headHeight = $("#header").height();
    var height = $height - $headHeight - 24;
    $("#J_scroll").css("height", height + "px");
    this.getHundredTopList();
    // this.setScroll();
  },
  beforeMount() {
    window.scrollTo(0, 0);
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
.bg-img( @file , @width, @height ) {
  .px2rem(width, @width);
  .px2rem(height, @height);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("../res/@{file}");
}
.page-wrap {
  background-color: #ff705e;
  height: 100%;
  .px2rem(padding,30);
  padding-bottom: 0;
  //.pr();
  .persons-page {
    // background: #260259 url("../res/listBanner.png") no-repeat center top;
    //   background-size: 100% auto;
    //   height: 100%;
    //  // overflow: hidden;
    //   .pa();
    //   top: 0;
    //   left: 0;
    //   width: 100%;
    background: #fff;
    width: 100%;
    height: 100%;
    .px2rem(border-top-left-radius,20);
    .px2rem(border-top-right-radius,20);

   > p {
      .px2rem(padding-top,40);
      color: #9b9b9b;
      .px2rem(padding-left,80);
      .px2rem(padding-right,40);
      .px2rem(padding-bottom,8);
      display: flex;
      justify-content: space-between;
      .px2rem(height,70);
    }
    .content {
          overflow: auto;
      ul {
        .px2rem(padding-left,40);
        .px2rem(padding-right,40);
        .px2rem(padding-bottom,120);
        li {
          .px2rem(padding-left,40);
          .px2rem(margin-top,32);
          &:nth-child(1),
          &:nth-child(2),
          &:nth-child(3) {
            .pr();
            div {
              span:first-child {
                color: #ff704a;
              }
            }
            &:before {
              .pa();
              display: block;
              content: "";
              .bg-img("one.png",30,42);
              left: 0;
              .px2rem(top,8);
            }
          }
          &:nth-child(1) {
            .px2rem(margin-top,27);
          }
          &:nth-child(2) {
            &:before {
              background-image: url("../res/two.png");
            }
          }
          &:nth-child(3) {
            &:before {
              background-image: url("../res/three.png");
            }
          }
          div {
            .px2rem(margin-bottom,2);
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            span:last-child {
              .pr();
              color: #ff704a;
              .px2px(font-size,30);
              .px2rem(bottom,-18);
            }
          }
          p {
            .px2px(font-size,24);
            text-align: left;
            .px2rem(line-height,32);
          }
        }
      }
    }
    .invite-list {
      .px2rem(width,690);
      margin: 0 auto;

      .px2rem(line-height,33);
      .px2px(font-size,24);
      background: #fff;
      color: #494666;
      box-shadow: 0 2px 20px 0 rgba(168, 120, 0, 0.5);
      .px2rem(border-top-left-radius,20);
      .px2rem(border-top-right-radius,20);

      height: 98%;
      > div {
        height: 100%;
      }
    }
  }
}
</style>
