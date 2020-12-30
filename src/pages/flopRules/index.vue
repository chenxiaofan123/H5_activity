<template>
    <div class="rules-page">
        <div class='rule-fix-wrap'>
            <div class="content"  id="content">
              <p v-for='(item,index) in rules'>{{item}}</p>
            </div>            
        </div>
    </div>
</template>
<script>
import {getActivityRules} from  "../../service/pages/apollo/service.js";
export default {
  data() {
    return {
      rules:null
    };
  },
  filers:{
    test(val){
      return true
    }
  },
  methods: {
    getActivityRules(){
      let that = this
      getActivityRules().then(res=>{
        let resData = res.data
        if(resData.code=='0000'){
          that.rules = resData.data.shuffleActivity
        }else{
          GB.utils.htoast(resData.msg);
        }
        console.log(res)
      })
    }
  },
  mounted() {
    this.getActivityRules();
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
  .padding(60,25,0,25);
  .rule-fix-wrap {
    margin: 0 auto;
    .px2rem(width,700);
    .px2rem(padding-top,80);
    .px2rem(padding-right,50);
    .px2rem(padding-left,50);
    height: 100%;
    background: #fff;
    border: 2px solid #FFFFFF;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    .px2rem(font-size,28);
    color: #333333;
    position: relative;
    .content {
      overflow: auto;
      & > p {
        display: flex;
        margin: 0 auto;
        .px2rem(margin-bottom,30);
        & > p {
          p:not(:last-child) {
            .px2rem(margin-bottom,30);
          }
        }
      }
    }
  }
}
</style>
