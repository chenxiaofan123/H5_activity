<template>
    <div class="index-page" v-cloak>
        <header>
        </header>
        <div class="content">
             <article>
                    <div class="contentTab">
                            <div class="testNav">
                            <div class="part"  @click="toTab(1)">
                                <div :class="{'selected':tab === 1,'testTitle':true}">项目说明</div>
                            </div>
                            <div  class="part"    @click="toTab(2)">
                            <div :class="{'selected':tab === 2,'testTitle':true}">项目进展</div> 
                            </div>
                    </div>
                    <div class="container">
                            <div v-if="tab === 1">
                                <div class='description'>
                                  <div class="part">
                                      在我国，有70%的农村儿童，但只有11.1%的儿童读物，这意味着大部分孩子没有适合的书读，甚至无书可读。
                                  </div>
                                  <div class="part">
                                    位于陕西省安康市紫阳县高滩镇的大坝村，现有748户，2776人，其中贫困户325户，1205人，现有留守儿童169人。
                                    村庄中有一座农家书屋，藏书约500册，但却没有适合孩子们阅读的读本。
                                  </div>
                                  <div class="part">
                                    村委会在申请捐助时写道：“为了让孩子们有更多获取知识的途径，我们在2012年就开始向孩子们开放农家书屋，大多孩子都已养成看书的习惯。虽然有阅读的场所，但确非长久之计，现有的书籍已无法满足孩子们的阅读需求，村上也无充足的经费来采购大量的书籍。紫阳县县委在了解到情况后，便让我们填写了捐赠图书申请表，就我村现状需求，特向基金会申请给我村孩子捐赠图书阅览室，
                                    我们将承诺，制定规范借阅程序，安排专人负责管理，为孩子们真正落实求知梦。”
                                  </div>
                                  <div class="partListAll">
                                      <div class="partList clearfix">
                                        <span> 受捐方类别：</span>
                                        <span>社区中心</span>
                                      </div>
                                      <div class="partList clearfix">
                                        <span> 覆盖人数：</span>
                                        <span>169名留守儿童，平均每周有20~30名小学生来</span>
                                      </div>
                                      <div class="partList clearfix">
                                        <span> 覆盖年纪：</span>
                                        <span>一年级~六年级</span>
                                      </div>
                                       <div class="partList clearfix">
                                        <span> 立项日期：</span>
                                        <span>2018年11月1日</span>
                                      </div>
                                       <div class="partList clearfix">
                                        <span> 项目预算：</span>
                                        <span>30,000元</span>
                                      </div>
                                       <div class="partList clearfix">
                                        <span> 慈善机构：</span>
                                        <span>灵山慈善基金会图书馆计划基金</span>
                                      </div>
                                        <div class="partList clearfix">
                                        <span> 机构说明：</span>
                                        <span>图书馆计划基金致力于改善我国贫困地区学生的阅读和写作能力，
                                          提升学生文学素养，并同时为当地教师提供教育资源的公益项目</span>
                                      </div>
                                        <div class="partList clearfix">
                                          <span> 善款接受：</span>
                                          <span>灵山慈善基金会图书馆计划基金</span>
                                      </div>


                                  </div>
                               </div>
                            </div>
                            <div v-else>
                                <div class="progress">
                                  <div class="progressList" v-for="(item,index) in walletDynamic" :key='index'>
                                      <div class="circle"></div>
                                      <div class="month">{{item.time}}</div>
                                      <div v-if='isShowDetail!=index' >{{item.shortDetail}}<span  class="checkDetail" @click='checkDetail(index)'>查看详情>></span></div>
                                      <div v-if='isShowDetail==index' >{{item.detail}}<span class="checkDetail" @click='checkDetail(-1)' >收起>></span></div>
                                      <div class="imageList clearfix" >
                                          <div  v-for="(img,index) in item.imgUrlList" :key='index'><img :src='img.url'/></div>
                                      </div>
                                  </div>
                             
                                </div>
                            </div>
                    </div>
                    </div>
            </article>
        </div>
    </div>
</template>
<script>
import User from "../../service/common/User";
import pageVisibility from "../../commonScript/pageVisibility.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { walletCollege ,getPublicDetail} from "../../service/pages/apollo/service.js";
/*PageBack.addCb(function(){
        // console.log('执行app页面回退操作!');
        location.reload();
    })
    pageVisibility.visibilitychange(() => {
        location.reload();
    });*/

export default {
  data() {
    return {
      user: new User(),
      tab:1,
      walletDynamic: [],
      nowList: [],
      pastList: [],
      numStart: 0,
      numEnd: 10,
      initArray: [],
      isShowDetail:null,
    };
  },
  watch: {},
  filters: {
    moneyUnit: function(value) {
      if (!value) return "0.00";
      let result = (value / 100).toFixed(2);
      return result;
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  created() {

  },
  mounted() {
     getPublicDetail().then(res => {
      let data = res.data.data;
     // console.log(res.data)
      this.walletDynamic = data.data_dataText || [];
      //this.order(this.walletDynamic);
     //this.init();
    });
    // var that = this;
    // // 在这里需要判断 是否登录  登录之后之后的状态 来展示
    // sessionProObj.getUserInfo((telephone, sessionId) => {
    //   console.log("111111111111");
    //   that.telephone = telephone;
    //   that.sessionId = sessionId;
    //   if (!telephone) {
    //     /*that.getFirstReward();*/
    //     that.isLogin = 2;
    //   } else {
    //     // 用户登录
    //     that.isLogin = 1;
    //     that.getmyRewardRank();
    //   }
    //   that.getFirstReward();
    //   that.getShareInfo(sharebasePath, telephone, fourYearShareCode);
    // });
  },
  methods: {
      init() {
        this.initArray = this.concatArray(
          this.nowList,
          this.pastList,
          this.numStart,
          this.numEnd
        );
        var that = this;
        window.onscroll = function() {
          //变量scrollTop是滚动条滚动时，距离顶部的距离
          var scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
          //变量windowHeight是可视区的高度
          var windowHeight =
            document.documentElement.clientHeight || document.body.clientHeight;
          //变量scrollHeight是滚动条的总高度
          var scrollHeight =
            document.documentElement.scrollHeight || document.body.scrollHeight;
          //滚动条到底部的条件
          if (scrollTop + windowHeight == scrollHeight) {
            var length = that.concatArray(
              that.nowList,
              that.pastList,
              that.numStart,
              that.numEnd
            ).length;
            if (length >= 10) {
              that.numStart += 10;
              that.numEnd += 10;
              that.initArray = that.initArray.concat(
                that.concatArray(
                  that.nowList,
                  that.pastList,
                  that.numStart,
                  that.numEnd
                )
              );
            }
          }
        };
      },
      beforeMount() {
        window.scrollTo(0, 0);
      },
      checkDetail(index) {
        //点击后进入对应文章详情页面
          console.log(index)
         this.isShowDetail = this.isShowDetail == index ? '' : index;
      },
      getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
      },
      order(param) {
        var nowDate = this.getNowFormatDate();
        for (let i = 0; i < param.length; i++) {
          var evals = param[i];
          var timeSplit = evals.time.substring(0, 10);
          if (timeSplit == nowDate) {
            var times = this.getDateTimeStamp(evals.time);
            var finalTime = this.getDateDiff(times);
            evals.time = finalTime;
            this.nowList.push(evals);
          } else {
            evals.time = timeSplit;
            this.pastList.push(evals);
          }
        }
        this.nowList.sort(function(a, b) {
          var bb = parseInt(b.time.replace("-", "").replace("-", ""));
          var aa = parseInt(a.time.replace("-", "").replace("-", ""));
          return aa - bb;
        });
        this.pastList.sort(function(a, b) {
          var bb = parseInt(b.time.replace("-", "").replace("-", ""));
          var aa = parseInt(a.time.replace("-", "").replace("-", ""));
          return bb - aa;
        });
      },
      getDateDiff(dateTimeStamp) {
        var result = "";
        var minute = 1000 * 60;
        var hour = minute * 60;
        // var day = hour * 24;
        // var halfamonth = day * 15;
        // var month = day * 30;
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
        if (diffValue < 0) {
          //若日期不符则弹出窗口告之
          //alert("结束日期不能小于开始日期！");
        }
        // var monthC = diffValue / month;
        // var weekC = diffValue / (7 * day);
        // var dayC = diffValue / day;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;
        // if (monthC >= 1) {
        //   result = parseInt(monthC) + "个月前";
        // } else if (weekC >= 1) {
        //   result = parseInt(weekC) + "周前";
        // } else if (dayC >= 1) {
        //   result = parseInt(dayC) + "天前";
        // }
        if (hourC >= 1) {
          result = parseInt(hourC) + "个小时前";
        } else if (minC >= 1) {
          result = parseInt(minC) + "分钟前";
        } else result = "刚刚";
        return result;
      },
      getDateTimeStamp(dateStr) {
        return Date.parse(dateStr.replace(/-/gi, "/"));
      },
      concatArray(nowList, pastList, numStart, numEnd) {
        return nowList.concat(pastList).slice(numStart, numEnd);
      },
    toTab(index) {
       this.tab = index;
      if (index == 1) {
          console.log('11111111')
      } else if (index == 2) {
           console.log('2222222')
      }
    },

    //登录
    callAppLogin() {
      this.user.callAppLogin();
    },
   
    //获取我的排名
    getPublicDetail() {
      let that = this;
      var param = {
        actCode: actCodeInvite,
        telephone: this.telephone,
        sessionId: this.sessionId
      };
      getPersionInviteRank(param).then(res => {
        let data = res.data;
        if (+data.code == 0) {
          that.myRewardAmount = data.data.rewardAmount;
          if (data.data.rewardAmount) {
            that.myRank = "NO." + data.data.rank;
          } else {
            that.myRank = "暂未上榜";
          }
        } else {
          if (data.msg) {
            GB.utils.htoast(data.msg);
          }
        }
      });
    },
   
    //分享按钮
    goShare() {
      if (!this.telephone) {
        this.callAppLogin();
        return;
      }
      var params_shared = {
        type: "1", //分享类型 1：新闻类分享  2：截图分享
        code: fourYearShareCode, //活动code，分享统计标示
        needLogin: "1",
        platform: "0", //0:弹出选择平台 1:微信好友 2:微信朋友圈 3：QQ好友 4：QQ空间 5：复制链接
        pushShareMark: "1" //是否需要统计用户分享
      };
      GB.utils.callCustomMethod("share", params_shared);
    },
  },
  activated() {
    /*this.getFirstReward();*/
    window.scrollTo(0, 0);
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
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.left {
  float: left;
}
.right {
  float: right;
}
.yellow {
  color: #ff6e00;
}
.bg-img( @file , @width, @height ) {
  .px2rem(width, @width);
  .px2rem(height, @height);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("./res/@{file}");
}

.border(@size,@color) {
  @bor: @size / 75 * 1rem;
  border: @bor solid @color;
}

[v-cloak] {
  display: none !important;
}

.wallet-dynamic-modal {
  width: 100%;
  box-sizing: border-box;
  ul {
    li {
      display: flex;
      justify-content: center;
      box-sizing: border-box;
      .px2rem(padding-top,30);
      .px2rem(padding-bottom,30);
      .px2rem(padding-left,40);
      .px2rem(padding-right,40);
      border-bottom: 1px solid #e2e2e2;
    }
    li:last-child {
      border-bottom: 0px;
    }
    .left-content {
      flex: 1;
      overflow: hidden;
      box-sizing: border-box;
      .px2rem(padding-right,20);
      span {
        display: block;
        width:100%;
      }
      .title {
        color: #333333;
        .px2rem(font-size,28);
        .px2rem(line-height,40);
      }
      .time {
        color: #bdbdbd;
        .px2rem(font-size,20);
        .px2rem(line-height,28);
        .px2rem(margin-top,10);
      }
      .des {
        color: #bdbdbd;
        .px2rem(font-size,24);
        .px2rem(line-height,33);
        .px2rem(margin-top,12);
        .nobreak();
      }
    }
    .right-img {
      .px2rem(width,230);
      .px2rem(height,172);
      img {
        .px2rem(width,230);
        .px2rem(height,172);
        .px2rem(border-radius,8);
      }
    }
  }
}

.index-page {
  position: relative;
  background: #ffecc6;
  .px2rem(padding-bottom, 100);
  header {
    .bg-img("bannerBg.png", 750, 252);
    .pr();
    width: 100%;
  }
  .content {
    .px2rem(width, 710);
     margin: 0 auto;
     background: #fff;
     .px2rem(border-radius,10);
      .top {
        background: #fff;
        .px2px(font-size,28);
        .px2rem(height,88);
        .px2rem(padding-left,40);
        .px2rem(line-height,88);
        color: #333333;
        span {
          float: left;
        }
        .safe {
          .px2px(margin-top,30);
          .px2px(margin-left,40);
        //   .bg-img("safe",196,40);
          display: block;
        }
      }
      .testNav {
          font-family: "PingFangSC-Regular";
        .px2rem(height,90);
        .px2px(font-size,38);
         background: #FD9C11;
         .px2rem(border-top-right-radius,10);
         .px2rem(border-top-left-radius,10);
         color:#fff;
         font-weight: normal;
         .px2rem(line-height,90);
        .testTitle {
          width: 100%;
          margin: 0 auto;
          text-align: center;
        }
        .part {
          position: relative;
          width: 50%;
          float: left;
          .px2rem(height,90);
        }
        .selected {
          background:#fff;
          color: #404040;
         font-family: "PingFangSC-Semibold";
          .px2px(font-size,40);
          .px2rem(border-top-right-radius,10);
          .px2rem(border-top-left-radius,10);
          position: absolute;
          .px2rem(top,-8);
          .px2rem(left,0);
           z-index: 100;
           .px2rem(line-height,100);
           .px2rem(height,100);
        }
      }
      .container {
         .px2rem(padding-left,32);
          .px2rem(padding-right,32);
        .px2rem(padding-top,60);
        .px2rem(padding-bottom,60);
        font-family: 'PingFangSC-Regular';
        .px2rem(padding-bottom,28);
        color: #5F5F5F;
        .description{
           font-family: 'PingFangSC-Regular';
          .px2px(font-size,28);
          .part{
            .px2rem(margin-bottom,40);
             .px2rem(line-height,40);
          }
           .partListAll{
          .partList{
             .px2rem(margin-bottom,30);
             span{
               float: left;
               display: block;
             }
             span:first-child{
               width:80px;
               font-weight: bold
             }
              span:last-child{
                width: 70%
              }
          }
         }
        }
        .progress{
          .progressList{
            border-left: 1px solid #ECECEC;
            .px2rem(padding-left,27);
            .px2rem(padding-bottom,60);
            font-family:" PingFangSC-Regular";
            font-size:14px;
            position: relative;
             color: #5F5F5F;
             .month{
               .px2rem(font-size,38);
               color: #404040;
               .px2rem(margin-bottom,30);
             }
             .circle{
                .px2rem(width,14);
                .px2rem(height,14);
                background:#FD9C11;
                .px2rem(border-radius,7);
                position: absolute;
                top:0;
                z-index: 100;
                .px2rem(left,-9);

             }
             .checkDetail{
               .px2rem(margin-left,10);
              
                color: #0094FF;
             }
             .imageList {
               .px2rem(margin-top,30);
               img{
                 float: left;
                .px2rem(margin-right,20);
                .px2rem(width,200);
                .px2rem(height,200);
               }
             }
             
            
          }
        }

       
      }
    }
}
//iphoneX、iphoneXs
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .index-page {
   .px2rem(padding-bottom, 150);
  }
}

//iphone Xs Max
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
  .index-page {
   .px2rem(padding-bottom, 150);
  }
}

//iphone XR
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
  footer {
    padding-bottom: 20px !important;
  }

  .index-page {
     .px2rem(padding-bottom, 150);
  }
}
</style>
