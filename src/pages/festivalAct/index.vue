<template>
    <div class="record-page">
      <article>
        <p class="body-1"></p>
        <p class="body-2"></p>
        <p class="body-3"></p>
        <p class="body-4"></p>
        <p class="body-5"></p>
      </article>
      <footer v-if="isShare">
        <v-bottomDownload :bottomBg="bottomBg"></v-bottomDownload>
      </footer>
    </div>
</template>
<script>
import wxShare from "../../commonScript/wxShare.js";
export default {
  data() {
    return {
      bottomBg: "rgba(0,0,0,0.4)",
      isLogin: "",
      isShare: "",
      shareCode: "festivalActShareCode"
    };
  },
  methods: {},
  mounted() {
    this.isShare = GB.utils.GetRequest()["isShare"];
    var that = this;
     if (this.isShare) {
      wxShare.getShareInfo("", this.shareCode);
    } else {
      // 在这里需要判断 是否登录  登录之后之后的状态 来展示
    sessionProObj.getUserInfo((telephone, sessionId) => {
      that.telephone = telephone;
      that.sessionId = sessionId;
      if (!telephone) {
        that.isLogin = 2;
      } else {
        // 用户登录
        that.isLogin = 1;
      }
      getShareInfo(sharebasePath, telephone, that.shareCode);
    });   
    }
  },
  beforeMount() {
    window.scrollTo(0, 0);
  },
  activated() {}
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
.record-page {
  article {
    p {
      margin: 0 auto;
    }
    .body-1 {
      .bg-img("body-1.png",750,1280);
    }
    .body-2 {
      .bg-img("body-2.png",750,1105);
    }
    .body-3 {
      .bg-img("body-3.png",750,1145);
    }
    .body-4 {
      .bg-img("body-4.png",750,815);
    }
    .body-5 {
      .bg-img("body-5.png",750,1171);
    }
  }
  footer{
    .px2rem(margin-top,-160);
  }
}
</style>
