<template>
  <transition name="fade" v-if='memberInfo'>
    <div class="modal-bg" v-show="isShow">
      <div class="modal-content" :class="{'bjmodal': cardClass == 'bjmodal','hjmodal':cardClass =='hjmodal' ,'bymodal':cardClass == 'bymodal'}">
        <div class="modal-main">
          <div v-if="memberInfo.upgradeGift == 1" id='getGift' @click="getGift($event)" :class="{'b':isClose}">领取礼包</div>
          <div v-else-if="memberInfo.upgradeGift != 1 || memberInfo.grade == 1" id='closeKnow' @click="closeKnow($event)" :class="{'b':isClose}">知道了</div>
        </div>
        <span class="close" @click="close" v-if='isClose'></span>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    memberInfo: {
      type: Object,
      default: null
    }
  },
  computed:{
    // 显示样式
    cardClass: function() {
      if(this.memberInfo){
        let arr = ["bymodal", "hjmodal", "bjmodal"];
        return arr[this.memberInfo.grade - 2];
      }
    },
    isClose(){
      let flag = false
      if(this.memberInfo.upgradeGift == 1){
        flag = true
      }
      return flag
    }
  },
  methods: {
    closeKnow(e){
      this.trackHeatMap(e);
      this.close();
    },
    close() {
      this.$emit("close", false);
    },
    getGift(e) {
      this.trackHeatMap(e);
      this.$emit("close", false);
      window.location.href = h5GbankerAppBusiness + "/html/pages/equityDetail/?tab=1&version="+GB.utils.GetRequest()['version'];
    },
    /**
     * 埋点
     */
    trackHeatMap(e){
      this.$sa.quick('trackHeatMap', e.currentTarget) 
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../../statics/less/base/method.less";
.setBackground(@url) {
  background-image: url(@url);
  background-size: 100% 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.modal-bg {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  .modal-content {
    position: relative;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .modal-main {
      .px2rem(width, 630);
      .px2rem(height, 724);
      margin: 0 auto;
      .px2rem(margin-bottom, 40);
      .setBackground("../res/modal4.png");
      div {
        .px2rem(width, 280);
        .px2rem(height, 74);
        .px2rem(line-height, 74);
        position: absolute;
        .px2rem(bottom, 60);
        transform: translate(-50%, 0);
        left: 50%;
        background-image: linear-gradient(-67deg, #bfd5da 0%, #f4fcff  100%);
        box-shadow: 1px 1px 4px -5px rgba(0,0,0,0.40), inset 1px 1px 0 0 #FFFFFF;
        .px2rem(border-radius, 38);
        .px2px(font-size, 30);
        color: #3a565e;
        text-align: center;
        font-weight: bold;
      }
    }
    .close {
      .px2rem(width, 80);
      .px2rem(height, 80);
      margin: 0 auto;
      .setBackground("../res/close.png");
      display: none;
    }
    .b{
      .px2rem(bottom, 180)!important;
    }
    // 白银
    &.bymodal {
      .modal-main {
        .setBackground("../res/modal3.png");
        div {
          background-image: linear-gradient(-67deg, #b8c0c9 0%, #f6f7f8 100%);
          color: #42506e;
        }
      }
      .close {
        display: block;
      }
    }
    // 黄金
    &.hjmodal {
      .modal-main {
        .setBackground("../res/modal2.png");
        div {
          background-image: linear-gradient(-67deg,  #f1bf6f 0%, #fff4e6 100%);
          color: #7c5b2a;
        }
      }
      .close {
        display: block;
      }
    }
    // 铂金
    &.bjmodal {
      .modal-main {
        .setBackground("../res/modal1.png");
        div {
          background-image: linear-gradient(-67deg, #e3c1ab 0%, #fff8f0 100%);
          color: #815337;
        }
      }
      .close {
        display: block;
      }
    }
  }
}
</style>
