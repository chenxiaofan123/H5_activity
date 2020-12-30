<template>
    <div class='page-wrap'>
        <div class='persons-tab'>
            <span :class="[ 'switch-le',{'active':ifLeft}]" @click='ifLeft=true'>未投资好友</span>
            <span :class="[ 'switch-ri',{'active':!ifLeft}]" @click='ifLeft=false'>已投资好友</span>
        </div>
        <div v-show='isEmpty == 2' class='persons-scroll'>
            <h1><span>好友</span><span>注册时间</span></h1>
            <div class='persons-scroll-box'>
                <ul>
                    <li v-for='(item,index) in personsList' :key="index">
                        <span>{{item.phone}}</span>
                        <span>{{item. regTime}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <!--空状态-->
        <div class='persons-empty' v-show='isEmpty == 1'>
            <img src='../res/empty.png'>
            <p>暂无数据</p>
        </div>
    </div>
</template>
<script>
import {
  getUserInviteInfo,
  actCodeInvite
} from "../../../service/pages/inviteDraw/service.js";

export default {
  data() {
    return {
      showInvet: false,
      ifLeft: true,
      personsList: [],
      investedList: [],
      unInvestList: [],
      telephone: "",
      sessionId: "",
      isEmpty: 0 //1-空  2-非空
    };
  },
  watch: {
    ifLeft: function(newVal, oldVal) {
      if (!newVal) {
        this.personsList = this.investedList;
      } else if (newVal) {
        this.personsList = this.unInvestList;
      }
    },
    personsList: function(curVal, oldVal) {
      if (curVal.length > 0) {
        this.isEmpty = 2;
      } else {
        this.isEmpty = 1;
      }
    }
  },
  created() {},
  mounted() {
    if (GB.utils.getPlatform() == "android") {
      clientInit.done(() => {
        GB.utils.callCustomMethod("setTitle", {
          title: "邀请记录"
        });
      });
       GB.utils.callCustomMethod("setTitle", {
          title: "邀请记录"
        });
    } else {
      GB.utils.callCustomMethod("setTitle", {
        title: "邀请记录"
      });
    }
    var that = this;
    // 在这里需要判断 是否登录  登录之后之后的状态 来展示
    sessionProObj.getUserInfo((telephone, sessionId) => {
      that.telephone = telephone;
      that.sessionId = sessionId;
      if (!telephone) {
        GB.utils.htoast("未登录");
        return;
      } else {
        // 用户登录
        that.getUserInviteInfo();
      }
    });
  },
  methods: {
    getUserInviteInfo() {
      let that = this;
      var param = {
        actCode: actCodeInvite,
        telephone: that.telephone,
        sessionId: that.sessionId
      };
      getUserInviteInfo(param).then(res => {
        let data = res.data;
        if (+data.code == 0) {
          that.personsList = data.data.unInvestList;
          that.investedList = data.data.investedList;
          that.unInvestList = data.data.unInvestList;
        } else {
          if (data.msg) {
            GB.utils.htoast(data.msg);
          }
        }
      });
    }
  },
  activated() {
    GB.utils.callCustomMethod("setTitle", {
      title: "邀请记录"
    });
  },
  beforeMount() {
    window.scrollTo(0, 0);
  }
};
</script>
<style lang="less" scoped>
@import "../../../../statics/less/base/method.less";

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.page-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .persons-tab {
    margin: 0 auto;
    .px2rem(margin-top, 60);
    .px2rem(width, 450);
    .pr();
    .borderradius1(100);
    .px2rem(height, 80);
    span {
      .pa();
      top: 0;
      height: 100%;
      .px2rem(line-height, 80);
      .borderradius1(40);
      .px2rem(font-size, 30);
      color: #c2c2c4;
      .px2rem(width, 270);
      @size: 2/75 * 1rem;
      border: @size solid #e8e8f2;
      &.switch-le {
        left: 0;
        .px2rem(padding-left, 35);
      }
      &.switch-ri {
        right: 0;
        .px2rem(padding-right, 35);
        text-align: right;
      }
      &.active {
        background-image: linear-gradient(-135deg, #ff2e70 0%, #ffa459 100%);
        //  background-image: linear-gradient(90deg, #FFEC9B 0%, #FFC21C 93%);
        color: #fff;
        .px2rem(width, 250);
        border: none;
        z-index: 10;
        text-align: center;
        padding: 0;
      }
    }
  }
  .persons-scroll {
    height: 100%;
    overflow: hidden;
    h1 {
      .px2px(font-size, 24);
      color: #78759d;
      .clearfix();
      .padding(60, 40, 9, 40);
      span:first-child {
        float: left;
      }
      span:last-child {
        float: right;
      }
    }
    .persons-scroll-box {
      height: 82%;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
      ul {
        .px2rem(padding-bottom,100);
        li {
          .px2rem(font-size, 30);
          color: #494666;
          .clearfix();
          .px2rem(line-height, 100);
          .padding(0, 40, 0, 40);
          border-bottom: 1px solid #d2d2e5;
          span:first-child {
            float: left;
          }
          span:last-child {
            float: right;
          }
        }
      }
    }
  }
  .persons-empty {
    .px2rem(margin-top, 327);
    img {
      .px2rem(width, 88);
      display: block;
      margin: 0 auto;
    }
    p {
      .px2px(font-size, 28);
      color: #9b9b9b;
      text-align: center;
      .px2rem(padding-top, 30);
    }
  }
}
</style>
