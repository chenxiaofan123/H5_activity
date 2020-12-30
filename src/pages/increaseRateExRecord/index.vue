<template>
    <div class="container">
      <div class="circle">您已累计获得{{totalIncome}}元</div>
      <div class="record-title"><p><span>时间</span><span>预期收益(元)</span></p></div>
      <div class="record-area">
        <ul class="record-list" v-for="(item,index) in panicBuyList" :key="index">
          <li><span>{{item.investTime}}</span><span>{{item.expectIncome}}</span></li>
        </ul>
      </div>
    </div>
</template>

<script>
import User from "../../service/common/User";
import {
  actCode,
  shareCode,
  queryPanicBuyRecord
} from "../../service/pages/increaseRateEx/service.js";
export default {
  data() {
    return {
      user: new User(),
      telephone: "",
      sessionId: "",
      // telephone: "18515003083",
      // sessionId: "cae93dd6e3744b3ea0ea3b0932f7998c",
      panicBuyList: [],
      totalIncome: ""
    };
  },
  mounted() {
    // this.queryPanicBuyRecord();
    var that = this;
    sessionProObj.getUserInfo((telephone, sessionId) => {
      this.telephone = telephone;
      this.sessionId = sessionId;
      if (this.telephone) {
        that.queryPanicBuyRecord();
      }
    });
  },
  methods: {
    queryPanicBuyRecord() {
      var data = {
        actCode: actCode,
        telephone: this.telephone,
        sessionId: this.sessionId
      };
      queryPanicBuyRecord(data).then(res => {
        var data = res.data;
        if (+data.code == 0) {
          this.panicBuyList = data.data.panicBuyList.panicBuyList;
          this.panicBuyList.forEach(function(item, index) {
            item.expectIncome = (item.expectIncome / 100).toFixed(2);
            item.investTime = item.investTime.slice(0,11);
          });
          this.totalIncome = (data.data.panicBuyList.totalIncome / 100).toFixed(2);
        } else {
          if (data.msg) {
            GB.utils.htoast(data.msg);
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
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
.container {
 background-image: linear-gradient(-180deg, #FEAB3A 0%, #FF5C00 100%);
  height: 100%;
  display: flex;
  flex-direction: column;
  .px2rem(padding-top, 100);
  .circle {
    .px2rem(height, 104);
    .bg-img("circle.png", 434, 104);
    margin: 0 auto;
    .px2rem(font-size, 36);
    .px2rem(line-height, 104);
    color: #ffffff;
    text-shadow: 0 0 8px #fe6458;
    text-align: center;
  }
  .record-title {
    .px2rem(margin-top,80);
    p {
      .px2rem(font-size, 24);
      color: #fff;
      // .padding(0, 80, 0, 80);
      .px2rem(line-height, 50);
      display: flex;
      span{
        display: block;
        width:50%;
        text-align: center;
      }
      span:nth-child(1) {
        float: left;
      }
      span:nth-child(2) {
        float: right;
      }
    }
  }
  .record-area {
    flex: 1;
    overflow-y: scroll;
    .record-list {
      height: auto;
      li {
        .px2rem(height, 100);
        .px2rem(font-size, 28);
        color: #ffffff;
        .px2rem(line-height, 100);
        // .padding(0, 80, 0, 80);
        border-bottom: 1px solid #FEBB7A;
         display: flex;
         span{
           display: block;
           width:50%;
           text-align: center
         }
        // span:nth-child(1) {
        //   float: left;
        // }
        // span:nth-child(2) {
        //   float: right;
        // }
      }
    }
  }
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
 .container{
   height: 724px !important;
 }
}

//iphone Xs Max
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
  footer {
     height: 724px !important;
  }
}

//iphone XR
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
  footer {
     height: 724px !important;
  }
}
</style>