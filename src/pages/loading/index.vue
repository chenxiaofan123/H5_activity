<template>
    <div class="index-page" v-cloak>
        <section class="swiper-slide" style="background:#F5FDFF" >
            <div class="first">
                <div class="firstTop">
                   <!-- <progress ></progress> -->
                       <countTo :startVal='startVal' style='font-family: "DIN-Bold"; font-size:30px;color:red'  :endVal='endVal' :duration='3000'></countTo>
                        <NumberGrow :value="9999999"></NumberGrow>
                        <!-- <DigitRoll :rollDigits="endVal" /> -->
                </div>
                   <!-- <vue-progress-bar></vue-progress-bar> -->
                <!-- <div class="progressContainer">
                    <div class="progress" :style="{width:progreessData+'%'}">
                        <b>{{progreessData}}%</b>
                    </div>
                </div> -->
                  <ul id="skill" v-if='isLoading'>
                    <li><span class="bar graphic-design"></span></li>
                </ul>
            </div>
         </section>
    </div>
</template>
<script>
import util from "../../utils/tool.js";
import wxShare from "../../commonScript/wxShare.js";
import progressBar from "./components/progressBar";
import { openApp } from "../../commonScript/download.js";
import countTo from 'vue-count-to';
 import DigitRoll from '@huoyu/vue-digitroll';
 import number from './components/number';
import {
  getCode,
  checkPhoneNum,
  userRegisterByValid,
  getPrice
} from "../../service/common/common.js";
export default {
  data() {
    return { 
      progreessData:100,
      isLoading:true,
      startVal:0,
      endVal:9999999.00,
    };
  },
  watch: {},
  filters: {},
  components: { 
     countTo,
      "NumberGrow":number,
       DigitRoll 
  },
  mounted() {
     this.isLoading=false,
    this.$Progress.finish()
   
  },
  created(){
     this.isLoading=true,
    this.$Progress.start();
  },
  methods: {
    gotoTop() {
      window.scrollTo(0, 0);
    },
    newPackage(){
       location.href = basePath + '/html/pages/noviceBagLandingPage/';
    },
    //下载app
    getReport() {
      openApp();
    }
  },
  beforeMount() {}
};
</script>
<style lang="less" src='./less/index.less' scoped></style>
<style>
/* div.progressContainer{
          height: 20px;
          width: 96%;
          border-radius: 10px;
          background-color: #ddd;
          margin-left: 2%;
}
div.progress{
            background-color: #1C8DE0;
            border-radius: 10px;
            height:20px;
            line-height: 20px;
}
b{
              color:#fff;
              font-weight: 100;
              font-size: 12px;
              position:absolute;
	      left:40%; 
 } */
#skill {
    list-style: none;
    width:62%;
    margin:0 auto;
    position: relative;
}
#skill li {
   background: #DBF0F6;
    height: 12px;
    border-radius: 6px;
}
.bar {
    height: 10px;
    margin: 1px 0;
    position: absolute;
    border-radius: 6px;
    /* -webkit-box-shadow:0 1px 0 #fcfcfc inset, 0 1px 0 #bebbb9;
    box-shadow:0 1px 0 #fcfcfc inset, 0 1px 0 #bebbb9; */
}
.graphic-design {
    width: 100%;
    -webkit-animation: graphic-design 2s ease-in-out;
   background:#FFEB00;
	background:-webkit-linear-gradient(left,#FFEB00,#FFD200);
	background:-o-linear-gradient(right,#FFEB00,#FFD200);
	background:-moz-linear-gradient(right,#FFEB00,#FFD200);
	background:linear-gradient(to right,#FFEB00,#FFD200);
}
@-webkit-keyframes graphic-design {
    0% {width:0;}
    100%{width:100%;}
}
</style>
