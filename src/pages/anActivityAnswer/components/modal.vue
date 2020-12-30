
<template>
    <!-- 弹窗组件 -->
    <transition name="fade">
    <div class="modal-wrap" v-show="inlineshow">
        <div class="mask" @click="closeRule"></div>
        <div class="modal-content">
           <slot></slot>
        </div>      
    </div>
    </transition>
</template>

<script>
export default {
  data() {
    return {
      inlineshow: false,
      scrollTop: 0
    };
  },
  props: {
    isShow: {
      default: false,
      type: Boolean
    },
    positionNum: {
      default: 0
    }
  },
  watch: {
    isShow(value) {
      if (value) {
        //展示弹窗
        this.scrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop;
        document.body.classList.add("modal-open-no-scroll");
        document.body.style.top = -this.scrollTop + "px";
        this.inlineshow = true;
      } else {
        document.body.classList.remove("modal-open-no-scroll");
        document.body.style.top = 0;
        document.body.scrollTop = this.scrollTop;
        document.documentElement.scrollTop = this.scrollTop;
        this.inlineshow = false;
      }
      if (this.positionNum != 0) {
        var positionNum = this.positionNum / 75;
        $(".modal-content").css("top", positionNum + "rem");
        $(".modal-content").css("transform", "translateX(-50%)");
      }
    }
  },
  methods: {
      closeRule(){
          this.$emit("close",false);
      }
  },
  mounted() {
    this.inlineshow = this.isShow
  }

};
</script>

<style lang="less" scoped>
@import "../../../../statics/less/base/method.less";
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.modal-wrap {
  .pf();
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // background: rgba(0, 0, 0, 0.7);
  z-index: 3000;
}
.mask{
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  .pf();
  top: 0;
  left: 0;
  bottom: 0;
}
.modal-content {
  .pf();
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  bottom: 0;
  z-index: 4000;
}
</style>

