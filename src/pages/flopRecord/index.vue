<template>
    <div class="record-page">
        <div class="fixed">
          <div class="record-content">
            <ul>
              <li v-for="(item,index) in userPrizeInfo.winningRecordList" :key="index">
                <div class="record-left">
                  <p class="winningTime">{{item.winningTime|formateTimes1}}</p>
                  <p class="prizeName">{{item.prizeName}}</p>
                </div>
                <div class="record-right" @click='seeDetail($event,item.winningId)' id='seeDetail'>
                  <span>查看</span>
                </div>
              </li>
            </ul> 
        </div>
        </div>
        <!-- 详情弹框 -->
        <record-detail :show.sync="isShow" :prizeType='prizeType' :prizeName='prizeName' :prizeRedeemCode='prizeRedeemCode' :prizeDesc='prizeDesc'></record-detail>
    </div>
</template>
<script>
import { getUserPrizeListInfo,getUserDrawPrizeDetailInfo } from "../../service/common/prizeDraw/service.js";
import recordDetail from './components/recordDetail.vue'
import moment from 'moment'
export default {
  data() {
    return {
      isRun: false,
      activityCode: 27,
      telephone: "",
      sessionId: "",
      userPrizeInfo: {
        totalMoney: "",
        usedTotal: "",
        winningRecordList: []
      },
      isShow:false,
      prizeType:-1,
      prizeName:'',
      prizeRedeemCode:'',
      prizeDesc:''
    };
  },
  components: {
    recordDetail
  },
  methods: {
    /**
     * 埋点
     */
    trackHeatMap(e){
		  this.$sa.quick('trackHeatMap', e.currentTarget);
    },
    handleTime(timeObj) {
      timeObj.winningRecordList.forEach(element => {
        var winningTime = element.winningTime;
        var winningTimeHandle = new Date(winningTime.replace(/-/g, "/"));
        element.winningTime = winningTimeHandle.format("yyyy年MM月dd日");
      });
      this.userPrizeInfo = timeObj;
    },
    getUserPrizeListInfo() {
      this.isRun = true;
      var data = {
        telephone: this.telephone,
        sessionId: this.sessionId,
        activityCode: this.activityCode
      };
      getUserPrizeListInfo(data).then(res => {
        var data = res.data.data.userPrizeInfo;
        var userPrizeInfo = res.data.data.userPrizeInfo;
        this.handleTime(userPrizeInfo);
      });
    },
    seeDetail(e,winningId){
      this.trackHeatMap(e);
      let that = this;
      let param = {
        activityCode:this.activityCode,
        telephone:this.telephone,
        sessionId:this.sessionId,
        winningId:winningId,
      }
      getUserDrawPrizeDetailInfo(param).then(res=>{
          let resData = res.data;
        if(resData.code=='0000'){
          that.prizeType = resData.data.userDrawPrizeInfo.prizeType;
          that.prizeName = resData.data.userDrawPrizeInfo.prizeName;
          this.prizeRedeemCode = resData.data.userDrawPrizeInfo.prizeRedeemCode||'';
          this.prizeDesc = resData.data.userDrawPrizeInfo.prizeDesc||'';
          that.isShow = true;
        }else{
          GB.utils.htoast(resData.msg);
        }
      })
    }
  },
  mounted() {
    var that = this;
    let height = $(".fixed").height() - $(".record-fix-wrap").height() - 10;
    $(".record-content").css("height", height + "px");
      sessionProObj.getUserInfo((telephone, sessionId) => {
        that.telephone = telephone;
        that.sessionId = sessionId;
        if (!telephone) {
          //用户未登录
          that.isLogin = 0;
        } else {
          // 用户登录
          that.isLogin = 1;
          that.getUserPrizeListInfo();
        }
      });
  },
  beforeMount() {
    window.scrollTo(0, 0);
  },
  activated() {
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
.record-page {
  width: 100%;
  height: 100%;
  .padding(60,25,0,25);
  .fixed {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .record-content {
    .px2rem(width,700);
    .px2rem(padding-top,40);
    .px2rem(padding-right,50);
    .px2rem(padding-left,50);
    height: 100%!important;
    background: #fff;
    border: 2px solid #FFFFFF;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    .px2rem(font-size,28);
    color: #333333;
    position: relative;
    overflow-y: auto;
    ul {
      li{
        .px2rem(height,180);
        .px2rem(padding-top,39);
        .px2rem(padding-bottom,39);
        display: flex;
        .px2rem(font-size,28);
        color: #333333;
        justify-content: space-between;
        align-items: center;
        box-shadow: inset 0 -1px 0 0 #EBEBEB;
        .record-left{
          .prizeName{
            .px2rem(font-size,30);
            .px2rem(margin-top,20);
            font-weight: 700;
          }
        }
        .record-right{
          span{
            display: flex;
            .px2rem(width,160);
            .px2rem(height,66);
             justify-content: center;
            align-items: center;
            border: 1px solid #FFC400;
            border-radius: 19px;
            .px2rem(font-size,26);
            color: #FFC400;
            .px2rem(letter-spacing,1.62);
          }
        }
      }
    }
    .no-record {
      .px2rem(font-size,28);
      color: #07073a;
      text-align: center;
      .px2rem(margin-top,173);
    }
  }
}
</style>
