

<template>
<div class="newerRegister-model">
     <div class="form-wrapper">
        <div class="form-inner-wrapper">
            <form  :action="url"  method="get" target="_self">
                    <p>openid: <input type="text" name="openid" /></p>
                    <p>nickName: <input type="text" name="nickname" /></p>
                    <input type="hidden" name="redirectUrl" v-model="redirectUrl">
                    <input type="submit" value="Submit" />
            </form>
        </div>
    </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      redirectUrl:'',
      channel:'',
    };
  },
   watch:{
    
		},
  methods: { 
     getQuery(name){
        
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.replace(/\&/g,"%26").substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }, 
    check(){
       document.form1.action= this.url
    }
  },
  components: {
    // "intro-detail":introDetail
  },
  mounted() {  
    this.url = basePath+'/enterOpenid'
    this.redirectUrl = this.getQuery("redirectUrl");  //成功失败
    this.channel  =  this.getQuery("channel")

  }
};
</script>

<style lang="less">
@import "../../../statics/less/base/method.less";

body,
html {
  background: #fff;
}
</style>

<style lang="less"  scoped>
@import "../../../statics/less/base/method.less";
  .form-wrapper{
            position: fixed;
            top: 0px;
            left: 0px;
            right: 0px;
            bottom: 0px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .form-inner-wrapper{
            width: 80%;
            text-align: left;
        }
</style>

