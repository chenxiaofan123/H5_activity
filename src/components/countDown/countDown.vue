
<template>
   <div class="video-main" >
          <div class="container">
              <canvas class="canvas" id="canvas" width="60" height="60" ></canvas>
          </div>
          <!-- <input type="button" value="暂停" @click="pause()"/>
          <input type="button" value="开始" @click="start()"/> -->
	</div>
</template>
<script>
import {Countdown} from "./countDown.js";
export default {
  data() {
    return {
       ctd:new Countdown(),
       SurplusSeconds:null,
       pauseCount:false,

    };
  },
  props: {
    startseconds: {
      type: Number,
      default: ''
    },
    alltime:{
      type: Number,
      default: ""
    }
  },
  watch: {
  },
  methods: {
    getTime(e){
      this.SurplusSeconds = e 
      if(this.SurplusSeconds==0 ||this.pauseCount){
        this.$emit('getsconds',this.SurplusSeconds)
      }
    },
    pause(){
      let that = this;
      this.pauseCount = true;
      this.ctd.pauseCountDown(that.getTime);
    },
    start(){
      this.ctd.startCountDown();
    },
    initctd(){
      let that= this;
      that.ctd.init({
        id: "canvas",
        size: 60,
        width:60,
        height:60,
        alltime:that.alltime,
        time: that.startseconds,
        fun:that.getTime
      });
    }
   
  },
  mounted() {
    // let that= this;
    // that.ctd.init({
    //     id: "canvas",
    //     size: 60,
    //     time: that.startseconds,
    //     fun:that.getTime
    // });
  }
};
</script>
<style lang="less"  scoped>
@import "../../../statics/less/base/method.less";
[v-cloak] {
  display: none !important;
}
.container{
 margin:0 auto;
 .px2px(width,120);
 .px2px(height,120);
 .px2px(margin-bottom,44);
 .px2px(margin-top,30);
}

</style>
